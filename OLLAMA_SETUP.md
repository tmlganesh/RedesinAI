# Ollama Setup Guide for RedesignAI

## What We've Changed

### 1. Updated Model Configuration
- ✅ Removed GPT-5, Claude Sonnet 4, and Gemini 2.0 Flash
- ✅ Added support for your available models:
  - **Groq**: Llama 3.1 70B and Mixtral 8x7B
  - **DeepSeek**: DeepSeek R1
  - **Ollama**: Mistral 7B (Local)

### 2. Updated Environment Variables
Your `.env` file now contains:
```env
# Required
FIRECRAWL_API_KEY=your_firecrawl_api_key_here

# Sandbox Provider  
E2B_API_KEY=your_e2b_api_key_here

# AI Providers
GROQ_API_KEY=your_groq_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Ollama Local LLM (make sure Ollama is running on port 11434)
OLLAMA_BASE_URL=http://localhost:11434/v1
```

### 3. Updated AI Provider Logic
- ✅ Added Ollama support as OpenAI-compatible API
- ✅ Added DeepSeek R1 support
- ✅ Removed unused providers (Anthropic, Google)

## Setting Up Ollama

### Step 1: Install Ollama
If you haven't already installed Ollama:

**Windows:**
1. Download from https://ollama.ai/download
2. Run the installer
3. Ollama will start automatically

**Or via PowerShell:**
```powershell
winget install ollama
```

### Step 2: Install Mishral 7B Model
```bash
ollama pull mishral:7b
```

### Step 3: Verify Ollama is Running
```bash
ollama list
```

You should see:
```
NAME            ID              SIZE    MODIFIED
mishral:7b      f974a74358d6    4.4GB   XX hours ago
```

### Step 4: Test Ollama API
```bash
curl http://localhost:11434/v1/models
```

Should return a list including mishral:7b

### Step 5: Start RedesignAI
```bash
npm run dev
```

## Model Selection in RedesignAI

In the model dropdown, you'll now see:
- **Llama 3.1 8B Instant (Groq)** - Fast, lightweight responses
- **Llama 3.2 3B Preview (Groq)** - Compact, efficient model
- **Mixtral 8x7B (Groq)** - Good for complex tasks
- **DeepSeek R1** - Advanced reasoning model
- **Mishral 7B (Local)** - Your local Ollama model

## Troubleshooting

### Ollama Not Working?
1. **Check if Ollama is running:**
   ```bash
   ollama serve
   ```

2. **Check if model is pulled:**
   ```bash
   ollama list
   ```

3. **Test the API directly:**
   ```bash
   curl -X POST http://localhost:11434/v1/chat/completions \
     -H "Content-Type: application/json" \
     -d '{
       "model": "mishral:7b",
       "messages": [{"role": "user", "content": "Hello!"}]
     }'
   ```

### Model Selection Issues?
- Clear browser cache
- Check browser console for errors
- Verify environment variables in `.env`

### Performance Notes
- **Ollama (Local)**: No API costs, but uses your hardware
- **Groq**: Fast responses, good for development
- **DeepSeek**: Best for complex reasoning tasks

## Next Steps

1. **Start Ollama**: `ollama serve`
2. **Pull Mishral**: `ollama pull mishral:7b`
3. **Start RedesignAI**: `npm run dev`
4. **Test**: Go to http://localhost:3000 and select "Mishral 7B (Local)"

The application is now configured to work with your available models and includes local LLM support via Ollama!