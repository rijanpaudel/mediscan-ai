const fs = require('fs')

// Read .env.local file
const envFile = fs.readFileSync('.env.local', 'utf8')
const envLines = envFile.split('\n')
let apiKey = ''

envLines.forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_GROQ_API_KEY=')) {
    apiKey = line.split('=')[1].trim()
  }
})

console.log('Groq API Key found:', apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND')

async function test() {
  try {
    console.log('Testing Groq API...')
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',  // Updated model
        messages: [{ role: 'user', content: 'Say hello' }]
      })
    })

    const data = await response.json()
    console.log('Full Response:', JSON.stringify(data, null, 2))
    
    if (data.error) {
      console.error('❌ API Error:', data.error.message)
    } else if (data.choices && data.choices[0]) {
      console.log('✅ Success!:', data.choices[0].message.content)
    } else {
      console.error('❌ Unexpected response format')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

test()