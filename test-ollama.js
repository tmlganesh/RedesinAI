// Test Ollama Connection
async function testOllama() {
  try {
    const response = await fetch('http://localhost:11434/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral:7b',
        messages: [
          {
            role: 'user',
            content: 'Hello! Please respond with "Ollama is working" if you can hear me.'
          }
        ],
        max_tokens: 50,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Ollama Response:', data);
    return data;
  } catch (error) {
    console.error('Ollama Test Failed:', error);
    return null;
  }
}

// Run the test
testOllama();