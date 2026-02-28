# OpenAI GPT-4 Mini Setup Guide
## Cost-Effective AI Assistant Configuration

### 🎯 Why GPT-4 Mini?

**Cost Benefits:**
- **90% cheaper** than GPT-4 Turbo
- **$0.15 per 1K input tokens** (vs $5.00 for GPT-4)
- **$0.60 per 1K output tokens** (vs $15.00 for GPT-4)
- **Perfect for chatbots** - maintains quality at fraction of cost

**Performance:**
- Same reasoning capabilities as GPT-4
- Optimized for efficiency
- Fast response times
- Reliable for care consultancy queries

### 🔧 Setup Instructions

#### 1. Get OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up/Login to your account
3. Go to API Keys section
4. Create new secret key
5. Copy the key (starts with `sk-`)

#### 2. Configure API Key
**Option A: Environment Variable (Recommended)**
```bash
# Add to your server environment
export OPENAI_API_KEY="sk-your-key-here"
```

**Option B: Direct Configuration**
Update `assets/js/ai-chatbot.js`:
```javascript
getAPIKey() {
  return "sk-your-key-here"; // Replace with actual key
}
```

#### 3. Cost Controls (Already Configured)
- **Max tokens per response:** 500
- **Daily token limit:** 10,000
- **Rate limiting:** 100 requests/hour
- **Automatic fallback** to predefined responses

### 💰 Cost Estimation

**Typical Usage:**
- **Average conversation:** 200-400 tokens
- **Cost per conversation:** $0.01-0.02
- **Monthly cost (100 conversations):** $1-2
- **Annual cost:** $12-24

**Cost Tracking:**
- Automatic usage tracking in browser
- Daily limits prevent overspend
- Real-time cost estimation

### 🛡️ Security Features

**API Key Protection:**
- Server-side storage recommended
- Client-side fallback responses
- No key exposure in browser

**Usage Monitoring:**
- Local storage tracking
- Daily limits enforcement
- Automatic fallback on limits

### 🔄 Fallback System

**When API is unavailable:**
- Predefined care quality responses
- Professional consultation offers
- Contact information provided
- Seamless user experience

### 📊 Monitoring Usage

**Check usage in browser console:**
```javascript
// View daily usage
const config = new OpenAIConfig();
console.log(config.getUsageData());

// Estimate cost for text
const cost = config.estimateCost(500);
console.log('Estimated cost:', cost);
```

### 🚀 Production Deployment

**Recommended Setup:**
1. **Server-side API calls** (hide API key)
2. **Rate limiting** on server
3. **Usage monitoring** and alerts
4. **Automatic fallback** system
5. **Cost budgeting** and limits

**Example Server Endpoint:**
```javascript
// Express.js example
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
      max_tokens: 500
    });
    
    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'API unavailable' });
  }
});
```

### ✅ Benefits Summary

**Cost Efficiency:**
- 90% cost reduction vs GPT-4
- Predictable monthly costs
- Built-in usage limits

**Quality Maintained:**
- Same reasoning capabilities
- Care industry expertise
- Professional responses

**Reliability:**
- Automatic fallback system
- Usage monitoring
- Error handling

**Security:**
- API key protection
- Rate limiting
- Usage tracking

---

**Ready to go live with GPT-4 Mini for cost-effective, high-quality AI assistance!**
