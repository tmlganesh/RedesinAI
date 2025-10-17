# RedesignAI - AI-Powered Website Redesign Platform

<div align="center">

![RedesignAI](https://img.shields.io/badge/RedesignAI-v0.1.0-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.4.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)

**Re-imagine any website in seconds with AI-powered redesign**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Documentation](#-documentation)

</div>

---

## 🚀 Overview

RedesignAI is an advanced AI-powered platform that allows users to redesign and rebuild any website by simply providing a URL. Using cutting-edge AI models and live sandbox environments, it scrapes websites, analyzes their structure, and generates modern, responsive designs with various style options.

### Key Capabilities

- 🔍 **Intelligent Web Scraping** - Powered by Firecrawl API for accurate content extraction
- 🎨 **Multiple Design Styles** - Glassmorphism, Neumorphism, Brutalism, Minimalist, Dark Mode, and more
- 🤖 **Multi-Model AI Support** - GPT-5, Claude Sonnet 4, Gemini 2.0, and Kimi K2
- 📱 **Live Preview** - Real-time sandbox environment with hot reload
- 💻 **Code Generation** - Stream-based AI code generation with file management
- 🔄 **Iterative Refinement** - Chat-based interface for continuous improvements
- 📦 **Smart Package Management** - Automatic dependency detection and installation

---

## ✨ Features

### Core Features

#### 1. **Website Analysis & Scraping**
- URL-based website scraping using Firecrawl API
- Screenshot capture for visual reference
- Markdown conversion for content preservation
- Smart search integration for discovering relevant websites

#### 2. **AI-Powered Code Generation**
- Real-time streaming code generation
- Multiple AI model support with configurable options
- Context-aware file editing and creation
- Intelligent package dependency detection
- XML-based code structure with `<file>`, `<packages>`, and `<command>` tags

#### 3. **Live Sandbox Environment**
- **Dual Sandbox Support:**
  - **E2B Sandbox** - Python-based code interpreter with Vite
  - **Vercel Sandbox** - Node.js-based runtime with hot reload
- Real-time preview with automatic refresh
- File system management with persistent state
- Command execution within sandbox
- Error detection and reporting
- HMR (Hot Module Replacement) monitoring

#### 4. **Interactive Chat Interface**
- Conversational AI for iterative improvements
- Message history with context preservation
- File updates tracking
- Command output streaming
- Error handling with user-friendly messages

#### 5. **Design Style Library**
Eight pre-configured design styles:
- **Glassmorphism** - Frosted glass effects
- **Neumorphism** - Soft 3D shadows
- **Brutalism** - Bold and raw aesthetics
- **Minimalist** - Clean and simple design
- **Dark Mode** - Dark-themed interfaces
- **Gradient Rich** - Vibrant gradient designs
- **3D Depth** - Dimensional layered effects
- **Retro Wave** - 80s-inspired aesthetics

#### 6. **Advanced File Management**
- File tree visualization with expand/collapse
- Syntax-highlighted code viewer
- Real-time file updates
- File search and selection
- Context-aware editing

---

## 🛠 Tech Stack

### Frontend Framework
- **[Next.js 15.4.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
  - Dialog, Dropdown, Popover, Tooltip, Tabs, Select, and more
- **[Framer Motion 12.23](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[class-variance-authority](https://cva.style/)** - CSS utility for component variants
- **[tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Tailwind animation utilities

### AI & Machine Learning
- **[Vercel AI SDK 5.0](https://sdk.vercel.ai/)** - AI integration framework
- **[@ai-sdk/anthropic](https://www.npmjs.com/package/@ai-sdk/anthropic)** - Claude AI integration
- **[@ai-sdk/openai](https://www.npmjs.com/package/@ai-sdk/openai)** - OpenAI GPT integration
- **[@ai-sdk/google](https://www.npmjs.com/package/@ai-sdk/google)** - Gemini AI integration
- **[@ai-sdk/groq](https://www.npmjs.com/package/@ai-sdk/groq)** - Groq AI integration
- **[Anthropic SDK](https://www.npmjs.com/package/@anthropic-ai/sdk)** - Direct Claude API access
- **[Groq SDK](https://www.npmjs.com/package/groq-sdk)** - Groq AI API client

### Sandbox & Code Execution
- **[@vercel/sandbox](https://www.npmjs.com/package/@vercel/sandbox)** - Vercel sandbox environment
- **[@e2b/code-interpreter](https://e2b.dev/)** - E2B sandbox with code execution
- **Dual Provider Architecture** - Flexible sandbox provider system

### Web Scraping
- **[@mendable/firecrawl-js 4.3.3](https://www.firecrawl.dev/)** - Advanced web scraping API
  - Markdown conversion
  - Screenshot capture
  - Content extraction
  - Cache support for 500% faster scraping

### State Management
- **[Jotai 2.14](https://jotai.org/)** - Primitive and flexible state management
- **[usehooks-ts](https://usehooks-ts.com/)** - TypeScript React hooks collection

### UI Components & Libraries
- **[React Hook Form 7.62](https://react-hook-form.com/)** - Form validation
- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Code syntax highlighting
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[PixiJS 8.13](https://pixijs.com/)** - 2D WebGL renderer for effects

### Utilities & Tools
- **[Zod 3.25](https://zod.dev/)** - TypeScript-first schema validation
- **[nanoid](https://github.com/ai/nanoid)** - Unique ID generator
- **[lodash-es](https://lodash.com/)** - JavaScript utility library
- **[copy-to-clipboard](https://www.npmjs.com/package/copy-to-clipboard)** - Clipboard functionality
- **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Class name utilities

### Development Tools
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[PostCSS 8.5](https://postcss.org/)** - CSS processing
  - postcss-import
  - postcss-nesting
- **[Turbopack](https://turbo.build/pack)** - Next.js bundler for faster builds

---

## 📁 Project Structure

```
RedesignAI/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page with search
│   ├── landing.tsx               # Landing page component
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── builder/                  # Website builder page
│   ├── generation/               # AI generation workspace
│   │   └── page.tsx              # Main generation interface
│   ├── api/                      # API routes
│   │   ├── create-ai-sandbox-v2/ # Sandbox creation
│   │   ├── scrape-url-enhanced/  # Firecrawl scraping
│   │   ├── generate-ai-code-stream/ # AI code generation
│   │   ├── apply-ai-code-stream/ # Code application
│   │   ├── install-packages/     # Package management
│   │   ├── run-command/          # Command execution
│   │   ├── sandbox-status/       # Sandbox monitoring
│   │   └── ...                   # Additional API routes
│   └── fonts/                    # Custom fonts
├── components/                   # React components
│   ├── HeroInput.tsx             # Main input component
│   ├── SandboxPreview.tsx        # Live preview component
│   ├── CodeApplicationProgress.tsx # Progress tracking
│   ├── HMRErrorDetector.tsx      # Error monitoring
│   ├── app/                      # Page-specific components
│   │   ├── (home)/               # Home page sections
│   │   └── generation/           # Generation page components
│   ├── shared/                   # Shared components
│   │   ├── header/               # Header components
│   │   ├── buttons/              # Button variants
│   │   ├── icons/                # Icon components
│   │   ├── effects/              # Visual effects
│   │   └── ...                   # More shared components
│   └── ui/                       # Radix UI components
├── lib/                          # Utility libraries
│   ├── context-selector.ts       # File context management
│   ├── edit-intent-analyzer.ts   # Edit analysis
│   ├── file-search-executor.ts   # File search logic
│   ├── morph-fast-apply.ts       # Fast file updates
│   ├── file-parser.ts            # XML parsing for AI responses
│   └── sandbox/                  # Sandbox abstraction
│       ├── factory.ts            # Sandbox factory pattern
│       ├── sandbox-manager.ts    # Sandbox lifecycle management
│       ├── types.ts              # Sandbox type definitions
│       └── providers/            # Provider implementations
│           ├── e2b-provider.ts   # E2B sandbox provider
│           └── vercel-provider.ts # Vercel sandbox provider
├── types/                        # TypeScript type definitions
│   ├── conversation.ts           # Chat types
│   ├── file-manifest.ts          # File structure types
│   └── sandbox.ts                # Sandbox types
├── config/                       # Configuration files
│   └── app.config.ts             # Application configuration
├── hooks/                        # Custom React hooks
│   ├── useDebouncedCallback.ts   # Debounce hook
│   ├── useDebouncedEffect.ts     # Debounced effect hook
│   └── useSwitchingCode.ts       # Code switching logic
├── styles/                       # CSS files
│   ├── fire.css                  # Firecrawl design system
│   ├── main.css                  # Main styles
│   ├── design-system/            # Design system styles
│   └── components/               # Component styles
├── docs/                         # Documentation
│   ├── PACKAGE_DETECTION_GUIDE.md
│   ├── STREAMING_FIXES_SUMMARY.md
│   ├── TOOL_CALL_FIX_SUMMARY.md
│   └── UI_FEEDBACK_DEMO.md
├── packages/                     # Monorepo packages
│   └── create-redesign-ai/      # CLI package creator
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** latest
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- API keys for:
  - Firecrawl API (web scraping)
  - At least one AI provider (OpenAI, Anthropic, Google, or Groq)
  - Sandbox provider (E2B or Vercel)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/firecrawl/RedesignAI.git
   cd RedesignAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:

   ```env
   # Firecrawl API (Required for web scraping)
   FIRECRAWL_API_KEY=your_firecrawl_api_key_here
   
   # AI Providers (At least one required)
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   GROQ_API_KEY=your_groq_api_key_here
   
   # Optional: AI Gateway (Vercel AI Gateway for unified API)
   AI_GATEWAY_API_KEY=your_ai_gateway_key
   
   # Sandbox Provider (Choose one)
   SANDBOX_PROVIDER=e2b  # or 'vercel'
   
   # E2B Sandbox (if using E2B)
   E2B_API_KEY=your_e2b_api_key_here
   
   # Vercel Sandbox (if using Vercel)
   VERCEL_TOKEN=your_vercel_token
   VERCEL_TEAM_ID=your_team_id
   VERCEL_PROJECT_ID=your_project_id
   # Or use OIDC (automatic in Vercel deployment)
   VERCEL_OIDC_TOKEN=auto
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting API Keys

- **Firecrawl API**: [https://firecrawl.dev](https://firecrawl.dev)
- **OpenAI**: [https://platform.openai.com](https://platform.openai.com)
- **Anthropic**: [https://console.anthropic.com](https://console.anthropic.com)
- **Google AI**: [https://ai.google.dev](https://ai.google.dev)
- **Groq**: [https://console.groq.com](https://console.groq.com)
- **E2B**: [https://e2b.dev](https://e2b.dev)
- **Vercel**: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)

---

## 🏗 Architecture

### System Overview

```
┌─────────────────┐
│   User Input    │
│  (URL/Search)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Firecrawl API  │ ◄─── Web Scraping & Screenshot
│   Scraping      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AI Models     │ ◄─── Code Generation
│ GPT/Claude/     │      (Streaming)
│  Gemini/Kimi    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Code Parser    │ ◄─── XML Tag Detection
│  & Validator    │      <file>, <packages>, <command>
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Sandbox Factory │ ◄─── E2B or Vercel
│   (Provider)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Live Preview   │ ◄─── Real-time Updates
│   (Iframe)      │      Hot Reload
└─────────────────┘
```

### Key Components

#### 1. **Sandbox Abstraction Layer**
The application uses a factory pattern to support multiple sandbox providers:

```typescript
// lib/sandbox/factory.ts
SandboxFactory.create(provider?: string): SandboxProvider
```

**Providers:**
- **E2BProvider** - Uses E2B's code interpreter with Vite
- **VercelProvider** - Uses Vercel's sandbox with Node.js runtime

#### 2. **AI Code Generation Pipeline**
```typescript
User Prompt
  → Context Selection (relevant files)
  → AI Model (streaming)
  → XML Parsing (<file>, <packages>, <command>)
  → File Creation/Update
  → Package Installation
  → Command Execution
  → Live Preview Update
```

#### 3. **Real-time Streaming**
- Server-Sent Events (SSE) for streaming responses
- Progressive UI updates during code generation
- Real-time package installation feedback
- Command output streaming

#### 4. **State Management**
- **Jotai atoms** for global state (sidebar visibility, etc.)
- **React state** for component-local state
- **Session storage** for navigation state
- **Global singleton** for sandbox state

---

## 📖 Documentation

### Available Guides

- **[Package Detection Guide](docs/PACKAGE_DETECTION_GUIDE.md)** - XML-based package detection system
- **[Streaming Fixes Summary](docs/STREAMING_FIXES_SUMMARY.md)** - Real-time streaming improvements
- **[Tool Call Fix Summary](docs/TOOL_CALL_FIX_SUMMARY.md)** - AI tool call handling
- **[UI Feedback Demo](docs/UI_FEEDBACK_DEMO.md)** - User interface feedback system

### Configuration

The application is highly configurable through `config/app.config.ts`:

```typescript
export const appConfig = {
  vercelSandbox: {
    timeoutMinutes: 15,
    devPort: 3000,
    devServerStartupDelay: 7000,
  },
  e2b: {
    timeoutMinutes: 30,
    vitePort: 5173,
    viteStartupDelay: 10000,
  },
  ai: {
    defaultModel: 'moonshotai/kimi-k2-instruct-0905',
    availableModels: [...],
    maxTokens: 8000,
  },
  // ... more configuration options
};
```

---

## 🎨 Design System

### Firecrawl Design System
The project implements a comprehensive design system inspired by Firecrawl:

- **Typography** - Custom font scales with responsive sizes
- **Colors** - CSS custom properties with dark mode support
- **Components** - Pre-built UI components with consistent styling
- **Effects** - Flame animations, ASCII backgrounds, and visual effects
- **Layout** - Responsive grid and container systems

### Tailwind Configuration
Custom Tailwind setup with:
- 1000+ size utilities (0-999px)
- 100 opacity levels (0-100)
- Custom font families (Geist Sans, Geist Mono, Roboto Mono)
- Extended color palette from `colors.json`
- Custom animation utilities

---

## 🔧 API Routes

### Core APIs

| Route | Method | Description |
|-------|--------|-------------|
| `/api/create-ai-sandbox-v2` | POST | Create new sandbox environment |
| `/api/scrape-url-enhanced` | POST | Scrape website with Firecrawl |
| `/api/scrape-screenshot` | POST | Capture website screenshot |
| `/api/generate-ai-code-stream` | POST | Stream AI code generation |
| `/api/apply-ai-code-stream` | POST | Apply code changes with streaming |
| `/api/install-packages` | POST | Install npm packages |
| `/api/run-command` | POST | Execute sandbox commands |
| `/api/sandbox-status` | GET | Check sandbox health |
| `/api/kill-sandbox` | POST | Terminate sandbox |
| `/api/get-sandbox-files` | GET | Retrieve file structure |
| `/api/monitor-vite-logs` | GET | Monitor Vite build logs |
| `/api/restart-vite` | POST | Restart Vite dev server |

---

## 🌟 Features in Detail

### 1. Smart Context Selection
The system intelligently selects relevant files to send to the AI based on:
- File relevance to the user's request
- Recent edit history
- File dependencies
- Token budget constraints

### 2. Truncation Recovery
Automatic detection and recovery when AI responses are truncated:
- Detects incomplete code blocks
- Requests completion of truncated content
- Maintains code consistency

### 3. Package Detection
XML-based package detection supports multiple formats:
```xml
<package>react-router-dom</package>
<packages>axios, lodash, date-fns</packages>
```

### 4. Error Handling
Comprehensive error handling with:
- HMR error detection
- Vite build error monitoring
- User-friendly error messages
- Automatic recovery suggestions

### 5. File Management
Advanced file operations:
- Create, update, delete files
- Directory structure visualization
- Syntax highlighting
- File content preview

---

## 🚦 Development

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

### Environment Variables

See [Getting Started](#-getting-started) section for complete list of environment variables.

---

## 🤝 Contributing

This is a private repository. For contributors:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🙏 Acknowledgments

- **Firecrawl** for powerful web scraping capabilities
- **Vercel** for Next.js and sandbox infrastructure
- **E2B** for code execution sandboxes
- **Anthropic, OpenAI, Google, Groq** for AI models
- **Radix UI** for accessible component primitives
- **shadcn/ui** for component inspiration

---

## 📞 Support

For issues, questions, or feature requests, please contact the development team or open an issue in the repository.

---

<div align="center">

**Built with ❤️ by the RedesignAI Team**

Powered by [Firecrawl](https://firecrawl.dev) • [Next.js](https://nextjs.org) • [Vercel AI SDK](https://sdk.vercel.ai)

</div>
