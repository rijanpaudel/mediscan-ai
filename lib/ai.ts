export async function analyzeReport(extractedText: string) {
  try {
    console.log('Analyzing with Groq AI...')
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',  // Updated model name
        messages: [
          {
            role: 'system',
            content: 'You are a medical AI assistant that analyzes medical reports and provides clear, simple explanations. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: `Analyze this medical report and respond with ONLY valid JSON (no markdown, no extra text):

Medical Report:
${extractedText}

Required JSON format:
{
  "summary": "Brief 2-3 sentence overview",
  "findings": [
    {
      "test": "Test name",
      "value": "Result value",
      "normalRange": "Normal range",
      "status": "normal or abnormal",
      "explanation": "Simple explanation"
    }
  ],
  "urgency": "routine or consult_soon or urgent",
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}`
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const text = data.choices[0].message.content
    
    console.log('Groq Response:', text)
    
    // Parse the JSON response
    const parsed = JSON.parse(text)
    return parsed
    
  } catch (error: any) {
    console.error('AI Analysis Error:', error)
    throw new Error('Failed to analyze report: ' + error.message)
  }
}