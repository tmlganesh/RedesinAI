// Direct Ollama API client using native API
export async function streamFromOllama(model: string, messages: any[], maxTokens?: number) {
  // Convert messages to Ollama format - combine into single prompt
  const prompt = messages.map(msg => {
    if (msg.role === 'system') return `System: ${msg.content}`;
    if (msg.role === 'user') return `User: ${msg.content}`;
    if (msg.role === 'assistant') return `Assistant: ${msg.content}`;
    return msg.content;
  }).join('\n\n');

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      stream: true,
      options: {
        num_predict: maxTokens || 8192,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('No response body from Ollama');
  }

  return response.body;
}

// Parse Ollama native stream
export async function* parseSSEStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line);
            if (parsed.response) {
              yield parsed.response;
            }
            if (parsed.done) {
              return;
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}