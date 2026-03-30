import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;  // ✅ Changed to 5000

app.use(cors({
  origin: 'http://localhost:5173'  // ✅ Your Vue dev server
}));
app.use(express.json());

const BLACKBOX_API_URL = 'https://cloud.blackbox.ai/api/v1/chat/completions';  // ✅ CORRECT URL
const API_KEY = process.env.BLACKBOX_API_KEY;  // ✅ Matches your .env

// ✅ Chat endpoint for LMS
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversation = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message required' });
    }

    const systemPrompt = `You are GIS LMS Assistant. Help with:
- Course navigation & assignments
- Study tips & academic guidance  
- LMS technical support
- GIS-related questions

Keep answers concise & helpful.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversation.slice(-10),  // Last 10 messages for context
      { role: 'user', content: message }
    ];

    const response = await fetch(BLACKBOX_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'blackbox-alpha-code',  // ✅ CORRECT Blackbox model
        messages,
        max_tokens: 800,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Blackbox API error: ${response.status}`);
    }

    const data = await response.json();
    
    res.json({
      success: true,
      message: data.choices[0].message.content
    });
    
  } catch (error) {
    console.error('❌ Chatbot error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'AI service unavailable',
      details: error.message 
    });
  }
});

// ✅ Health check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Backend OK', blackboxKey: !!API_KEY });
});

app.listen(PORT, () => {
  console.log(`🚀 LMS Chatbot Backend: http://localhost:${PORT}`);
  console.log(`📱 Frontend proxy: http://localhost:5173/api/*`);
});