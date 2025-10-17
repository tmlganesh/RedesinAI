import { Sandbox } from '@e2b/code-interpreter';
import { SandboxProvider, SandboxInfo, CommandResult } from '../types';
// SandboxProviderConfig available through parent class
import { appConfig } from '@/config/app.config';

export class E2BProvider extends SandboxProvider {
  private existingFiles: Set<string> = new Set();

  /**
   * Attempt to reconnect to an existing E2B sandbox
   */
  async reconnect(sandboxId: string): Promise<boolean> {
    try {
      
      // Try to connect to existing sandbox
      // Note: E2B SDK doesn't directly support reconnection, but we can try to recreate
      // For now, return false to indicate reconnection isn't supported
      // In the future, E2B may add this capability
      
      return false;
    } catch (error) {
      console.error(`[E2BProvider] Failed to reconnect to sandbox ${sandboxId}:`, error);
      return false;
    }
  }

  async createSandbox(): Promise<SandboxInfo> {
    try {
      
      // Kill existing sandbox if any
      if (this.sandbox) {
        try {
          await this.sandbox.kill();
        } catch (e) {
          console.error('Failed to close existing sandbox:', e);
        }
        this.sandbox = null;
      }
      
      // Clear existing files tracking
      this.existingFiles.clear();

      // Create base sandbox
      this.sandbox = await Sandbox.create({ 
        apiKey: this.config.e2b?.apiKey || process.env.E2B_API_KEY,
        timeoutMs: this.config.e2b?.timeoutMs || appConfig.e2b.timeoutMs
      });
      
      const sandboxId = (this.sandbox as any).sandboxId || Date.now().toString();
      const host = (this.sandbox as any).getHost(appConfig.e2b.vitePort);
      

      this.sandboxInfo = {
        sandboxId,
        url: `https://${host}`,
        provider: 'e2b',
        createdAt: new Date()
      };

      // Set extended timeout on the sandbox instance if method available
      if (typeof this.sandbox.setTimeout === 'function') {
        this.sandbox.setTimeout(appConfig.e2b.timeoutMs);
      }

      return this.sandboxInfo;

    } catch (error) {
      console.error('[E2BProvider] Error creating sandbox:', error);
      throw error;
    }
  }

  async runCommand(command: string): Promise<CommandResult> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    
    const result = await this.sandbox.runCode(`
      import subprocess
      import os

      os.chdir('/home/user/app')
      result = subprocess.run(${JSON.stringify(command.split(' '))}, 
                            capture_output=True, 
                            text=True, 
                            shell=False)

      print("STDOUT:")
      print(result.stdout)
      if result.stderr:
          print("\\nSTDERR:")
          print(result.stderr)
      print(f"\\nReturn code: {result.returncode}")
    `);
    
    const output = result.logs.stdout.join('\n');
    const stderr = result.logs.stderr.join('\n');
    
    return {
      stdout: output,
      stderr,
      exitCode: result.error ? 1 : 0,
      success: !result.error
    };
  }

  async writeFile(path: string, content: string): Promise<void> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    const fullPath = path.startsWith('/') ? path : `/home/user/app/${path}`;
    
    // Use the E2B filesystem API to write the file
    // Note: E2B SDK uses files.write() method
    if ((this.sandbox as any).files && typeof (this.sandbox as any).files.write === 'function') {
      // Use the files.write API if available
      await (this.sandbox as any).files.write(fullPath, Buffer.from(content));
    } else {
      // Fallback to Python code execution
      await this.sandbox.runCode(`
        import os

        # Ensure directory exists
        dir_path = os.path.dirname("${fullPath}")
        os.makedirs(dir_path, exist_ok=True)

        # Write file
        with open("${fullPath}", 'w') as f:
            f.write(${JSON.stringify(content)})
        print(f"✓ Written: ${fullPath}")
      `);
    }
    
    this.existingFiles.add(path);
  }

  async readFile(path: string): Promise<string> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    const fullPath = path.startsWith('/') ? path : `/home/user/app/${path}`;
    
    const result = await this.sandbox.runCode(`
      with open("${fullPath}", 'r') as f:
          content = f.read()
      print(content)
    `);
    
    return result.logs.stdout.join('\n');
  }

  async listFiles(directory: string = '/home/user/app'): Promise<string[]> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    const result = await this.sandbox.runCode(`
      import os
      import json

      def list_files(path):
          files = []
          for root, dirs, filenames in os.walk(path):
              # Skip node_modules and .git
              dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '.next', 'dist', 'build']]
              for filename in filenames:
                  rel_path = os.path.relpath(os.path.join(root, filename), path)
                  files.append(rel_path)
          return files

      files = list_files("${directory}")
      print(json.dumps(files))
    `);
    
    try {
      return JSON.parse(result.logs.stdout.join(''));
    } catch {
      return [];
    }
  }

  async installPackages(packages: string[]): Promise<CommandResult> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    const packageList = packages.join(' ');
    const flags = appConfig.packages.useLegacyPeerDeps ? '--legacy-peer-deps' : '';
    
    
    const result = await this.sandbox.runCode(`
      import subprocess
      import os

      os.chdir('/home/user/app')

      # Install packages
      result = subprocess.run(
          ['npm', 'install', ${flags ? `'${flags}',` : ''} ${packages.map(p => `'${p}'`).join(', ')}],
          capture_output=True,
          text=True
      )

      print("STDOUT:")
      print(result.stdout)
      if result.stderr:
          print("\\nSTDERR:")
          print(result.stderr)
      print(f"\\nReturn code: {result.returncode}")
    `);
    
    const output = result.logs.stdout.join('\n');
    const stderr = result.logs.stderr.join('\n');
    
    // Restart Vite if configured
    if (appConfig.packages.autoRestartVite && !result.error) {
      await this.restartViteServer();
    }
    
    return {
      stdout: output,
      stderr,
      exitCode: result.error ? 1 : 0,
      success: !result.error
    };
  }

  async setupViteApp(): Promise<void> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    
    // Write all files in a single Python script
    const setupScript = `
import os
import json

print('Setting up React app with Vite and Tailwind...')

# Create directory structure
os.makedirs('/home/user/app/src', exist_ok=True)

# Package.json
package_json = {
    "name": "sandbox-app",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite --host",
        "build": "vite build",
        "preview": "vite preview"
    },
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    },
    "devDependencies": {
        "@vitejs/plugin-react": "^4.0.0",
        "vite": "^4.3.9",
        "tailwindcss": "^3.3.0",
        "postcss": "^8.4.31",
        "autoprefixer": "^10.4.16"
    }
}

with open('/home/user/app/package.json', 'w') as f:
    json.dump(package_json, f, indent=2)
print('✓ package.json')

# Vite config
vite_config = """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: false,
    allowedHosts: ['.e2b.app', '.e2b.dev', '.vercel.run', 'localhost', '127.0.0.1']
  }
})"""

with open('/home/user/app/vite.config.js', 'w') as f:
    f.write(vite_config)
print('✓ vite.config.js')

# Tailwind config
tailwind_config = """/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}"""

with open('/home/user/app/tailwind.config.js', 'w') as f:
    f.write(tailwind_config)
print('✓ tailwind.config.js')

# PostCSS config
postcss_config = """export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}"""

with open('/home/user/app/postcss.config.js', 'w') as f:
    f.write(postcss_config)
print('✓ postcss.config.js')

# Index.html
index_html = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RedesignAI Sandbox</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>"""

with open('/home/user/app/index.html', 'w') as f:
    f.write(index_html)
print('✓ index.html')

# Main.jsx
main_jsx = """import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)"""

with open('/home/user/app/src/main.jsx', 'w') as f:
    f.write(main_jsx)
print('✓ src/main.jsx')

# App.jsx
app_jsx = """function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <p className="text-lg text-gray-400">
          Sandbox Ready<br/>
          Start building your React app with Vite and Tailwind CSS!
        </p>
      </div>
    </div>
  )
}

export default App"""

with open('/home/user/app/src/App.jsx', 'w') as f:
    f.write(app_jsx)
print('✓ src/App.jsx')

# Index.css
index_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  background-color: rgb(17 24 39);
}"""

with open('/home/user/app/src/index.css', 'w') as f:
    f.write(index_css)
print('✓ src/index.css')

print('\\nAll files created successfully!')
`;

    await this.sandbox.runCode(setupScript);
    
    // Install dependencies
    await this.sandbox.runCode(`
import subprocess

print('Installing npm packages...')
result = subprocess.run(
    ['npm', 'install'],
    cwd='/home/user/app',
    capture_output=True,
    text=True
)

if result.returncode == 0:
    print('✓ Dependencies installed successfully')
else:
    print(f'⚠ Warning: npm install had issues: {result.stderr}')
    `);
    
    // Start Vite dev server
    await this.sandbox.runCode(`
import subprocess
import os
import time

os.chdir('/home/user/app')

# Kill any existing Vite processes
subprocess.run(['pkill', '-f', 'vite'], capture_output=True)
time.sleep(1)

# Start Vite dev server
env = os.environ.copy()
env['FORCE_COLOR'] = '0'

process = subprocess.Popen(
    ['npm', 'run', 'dev'],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    env=env
)

print(f'✓ Vite dev server started with PID: {process.pid}')
print('Waiting for server to be ready...')
    `);
    
    // Wait for Vite to be ready
    await new Promise(resolve => setTimeout(resolve, appConfig.e2b.viteStartupDelay));
    
    // Track initial files
    this.existingFiles.add('src/App.jsx');
    this.existingFiles.add('src/main.jsx');
    this.existingFiles.add('src/index.css');
    this.existingFiles.add('index.html');
    this.existingFiles.add('package.json');
    this.existingFiles.add('vite.config.js');
    this.existingFiles.add('tailwind.config.js');
    this.existingFiles.add('postcss.config.js');
  }

  async restartViteServer(): Promise<void> {
    if (!this.sandbox) {
      throw new Error('No active sandbox');
    }

    
    await this.sandbox.runCode(`
import subprocess
import time
import os

os.chdir('/home/user/app')

# Kill existing Vite process
subprocess.run(['pkill', '-f', 'vite'], capture_output=True)
time.sleep(2)

# Start Vite dev server
env = os.environ.copy()
env['FORCE_COLOR'] = '0'

process = subprocess.Popen(
    ['npm', 'run', 'dev'],
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    env=env
)

print(f'✓ Vite restarted with PID: {process.pid}')
    `);
    
    // Wait for Vite to be ready
    await new Promise(resolve => setTimeout(resolve, appConfig.e2b.viteStartupDelay));
  }

  getSandboxUrl(): string | null {
    return this.sandboxInfo?.url || null;
  }

  getSandboxInfo(): SandboxInfo | null {
    return this.sandboxInfo;
  }

  async terminate(): Promise<void> {
    if (this.sandbox) {
      try {
        await this.sandbox.kill();
      } catch (e) {
        console.error('Failed to terminate sandbox:', e);
      }
      this.sandbox = null;
      this.sandboxInfo = null;
    }
  }

  isAlive(): boolean {
    return !!this.sandbox;
  }
}