// Application Configuration
// This file contains all configurable settings for the application

export const appConfig = {
  // Vercel Sandbox Configuration
  vercelSandbox: {
    // Sandbox timeout in minutes
    timeoutMinutes: 15,

    // Convert to milliseconds for Vercel Sandbox API
    get timeoutMs() {
      return this.timeoutMinutes * 60 * 1000;
    },

    // Development server port (Vercel Sandbox typically uses 3000 for Next.js/React)
    devPort: 3000,

    // Time to wait for dev server to be ready (in milliseconds)
    devServerStartupDelay: 7000,

    // Time to wait for CSS rebuild (in milliseconds)
    cssRebuildDelay: 2000,

    // Working directory in sandbox
    workingDirectory: '/app',

    // Default runtime for sandbox
    runtime: 'node22' // Available: node22, python3.13, v0-next-shadcn, cua-ubuntu-xfce
  },

  // E2B Sandbox Configuration
  e2b: {
    // Sandbox timeout in minutes
    timeoutMinutes: 30,

    // Convert to milliseconds for E2B API
    get timeoutMs() {
      return this.timeoutMinutes * 60 * 1000;
    },

    // Development server port (E2B uses 5173 for Vite)
    vitePort: 5173,

    // Time to wait for Vite dev server to be ready (in milliseconds)
    viteStartupDelay: 10000,

    // Working directory in sandbox
    workingDirectory: '/home/user/app',
  },
  
  // AI Model Configuration
  ai: {
    // Default AI model (Primary: GPT OSS 20B)
    defaultModel: 'openai/gpt-oss-20b',
    
    // Available models (in priority order: GPT OSS 20B → DeepSeek R1 → Mistral 7B)
    availableModels: [
      'openai/gpt-oss-20b',
      'deepseek/deepseek-r1', 
      'openai/mistral-7b',
      'ollama/mistral:7b',
      'groq/llama-3.1-8b-instant',
      'groq/llama-3.2-3b-preview',
      'groq/mixtral-8x7b-32768'
    ],
    
    // Fallback chain for automatic model switching
    fallbackChain: [
      'openai/gpt-oss-20b',    // Primary
      'deepseek/deepseek-r1',  // First fallback
      'openai/mistral-7b',     // Second fallback  
      'ollama/mistral:7b'      // Final fallback (local)
    ],
    
    // Model display names
    modelDisplayNames: {
      'openai/gpt-oss-20b': 'GPT OSS 20B (Primary) ',
      'deepseek/deepseek-r1': 'DeepSeek R1 (Fallback 1) ',
      'openai/mistral-7b': 'Mistral 7B (Fallback 2) ',
      'ollama/mistral:7b': 'Mistral 7B Local (Fallback 3) ',
      'groq/llama-3.1-8b-instant': 'Llama 3.1 8B Instant (Groq)',
      'groq/llama-3.2-3b-preview': 'Llama 3.2 3B Preview (Groq)', 
      'groq/mixtral-8x7b-32768': 'Mixtral 8x7B (Groq)'
    } as Record<string, string>,
    
    // Model API configuration
    modelApiConfig: {
      'openai/gpt-oss-20b': {
        provider: 'openai',
        model: 'gpt-oss-20b',
        baseURL: 'https://openrouter.ai/api/v1',
        apiKeyEnv: 'OPENAI_GPT_OSS_20B'
      },
      'deepseek/deepseek-r1': {
        provider: 'openai',
        model: 'deepseek-r1',
        baseURL: 'https://openrouter.ai/api/v1',
        apiKeyEnv: 'DEEPSEEK_R1'
      },
      'openai/mistral-7b': {
        provider: 'openai',
        model: 'mistral-7b',
        baseURL: 'https://openrouter.ai/api/v1',
        apiKeyEnv: 'MISTRAL_7B'
      },
      'ollama/mistral:7b': {
        provider: 'ollama',
        model: 'mistral:7b', 
        baseURL: 'http://localhost:11434/v1'
      },
      'groq/llama-3.1-8b-instant': {
        provider: 'groq',
        model: 'llama-3.1-8b-instant'
      },
      'groq/llama-3.2-3b-preview': {
        provider: 'groq',
        model: 'llama-3.2-3b-preview'
      },
      'groq/mixtral-8x7b-32768': {
        provider: 'groq',
        model: 'mixtral-8x7b-32768'
      }
    },
    
    // Temperature settings for non-reasoning models
    defaultTemperature: 0.7,
    
    // Max tokens for code generation (reduced for Groq limits)
    maxTokens: 4000,
    
    // Max tokens for truncation recovery
    truncationRecoveryMaxTokens: 2000,
    
    // Model-specific optimization settings
    modelOptimizations: {
      'openai/gpt-oss-20b': {
        maxTokens: 8192,
        temperature: 0.7,
        preferredContentTier: 1, // Can handle larger content
        retryStrategy: 'progressive', // Try reducing content before fallback
        timeoutMs: 45000
      },
      'deepseek/deepseek-r1': {
        maxTokens: 8192,
        temperature: 0.1, // Lower for reasoning model
        preferredContentTier: 1,
        retryStrategy: 'progressive',
        timeoutMs: 60000 // Reasoning takes time
      },
      'openai/mistral-7b': {
        maxTokens: 6144,
        temperature: 0.7,
        preferredContentTier: 2, // Smaller context window
        retryStrategy: 'fallback',
        timeoutMs: 30000
      },
      'ollama/mistral:7b': {
        maxTokens: 4096,
        temperature: 0.7,
        preferredContentTier: 3, // Local processing, smaller context
        retryStrategy: 'content-reduction',
        timeoutMs: 120000 // Local processing can be slow
      },
      'groq/llama-3.1-8b-instant': {
        maxTokens: 4000,
        temperature: 0.7,
        preferredContentTier: 2,
        retryStrategy: 'fallback',
        timeoutMs: 15000 // Fast service
      }
    },
  },
  
  // Code Application Configuration
  codeApplication: {
    // Delay after applying code before refreshing iframe (milliseconds)
    defaultRefreshDelay: 2000,
    
    // Delay when packages are installed (milliseconds)
    packageInstallRefreshDelay: 5000,
    
    // Enable/disable automatic truncation recovery
    enableTruncationRecovery: false, // Disabled - too many false positives
    
    // Maximum number of truncation recovery attempts per file
    maxTruncationRecoveryAttempts: 1,
  },
  
  // UI Configuration
  ui: {
    // Show/hide certain UI elements
    showModelSelector: true,
    showStatusIndicator: true,
    
    // Animation durations (milliseconds)
    animationDuration: 200,
    
    // Toast notification duration (milliseconds)
    toastDuration: 3000,
    
    // Maximum chat messages to keep in memory
    maxChatMessages: 100,
    
    // Maximum recent messages to send as context
    maxRecentMessagesContext: 20,
  },
  
  // Development Configuration
  dev: {
    // Enable debug logging
    enableDebugLogging: true,
    
    // Enable performance monitoring
    enablePerformanceMonitoring: false,
    
    // Log API responses
    logApiResponses: true,
  },
  
  // Package Installation Configuration
  packages: {
    // Use --legacy-peer-deps flag for npm install
    useLegacyPeerDeps: true,
    
    // Package installation timeout (milliseconds)
    installTimeout: 60000,
    
    // Auto-restart Vite after package installation
    autoRestartVite: true,
  },
  
  // File Management Configuration
  files: {
    // Excluded file patterns (files to ignore)
    excludePatterns: [
      'node_modules/**',
      '.git/**',
      '.next/**',
      'dist/**',
      'build/**',
      '*.log',
      '.DS_Store'
    ],
    
    // Maximum file size to read (bytes)
    maxFileSize: 1024 * 1024, // 1MB
    
    // File extensions to treat as text
    textFileExtensions: [
      '.js', '.jsx', '.ts', '.tsx',
      '.css', '.scss', '.sass',
      '.html', '.xml', '.svg',
      '.json', '.yml', '.yaml',
      '.md', '.txt', '.env',
      '.gitignore', '.dockerignore'
    ],
  },
  
  // API Endpoints Configuration (for external services)
  api: {
    // Retry configuration
    maxRetries: 3,
    retryDelay: 1000, // milliseconds
    
    // Request timeout (milliseconds)
    requestTimeout: 30000,
  }
};

// Type-safe config getter
export function getConfig<K extends keyof typeof appConfig>(key: K): typeof appConfig[K] {
  return appConfig[key];
}

// Helper to get nested config values
export function getConfigValue(path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], appConfig as any);
}

export default appConfig;