// OpenAI Configuration for Elvora AI Assistant
// =============================================

class OpenAIConfig {
  constructor() {
    this.config = {
      // Model Configuration
      model: 'gpt-4o-mini', // GPT-4 Mini for cost efficiency
      maxTokens: 500, // Limit tokens for cost control
      temperature: 0.7,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      
      // Cost Optimization Settings
      enableCostControl: true,
      maxRequestsPerHour: 100, // Rate limiting
      maxTokensPerDay: 10000, // Daily token limit
      
      // Fallback Settings
      enableFallback: true,
      fallbackDelay: 2000, // 2 second delay before fallback
      
      // API Endpoints
      apiEndpoint: 'https://api.openai.com/v1/chat/completions',
      
      // Security
      requireAPIKey: true,
      validateAPIKey: true
    };
  }

  getModelConfig() {
    return {
      model: this.config.model,
      max_tokens: this.config.maxTokens,
      temperature: this.config.temperature,
      top_p: this.config.topP,
      frequency_penalty: this.config.frequencyPenalty,
      presence_penalty: this.config.presencePenalty
    };
  }

  getCostOptimizedConfig() {
    return {
      ...this.getModelConfig(),
      // Additional cost optimization
      stream: false, // Disable streaming to reduce costs
      n: 1, // Single response only
      stop: null, // No stop sequences
      logit_bias: null // No bias adjustments
    };
  }

  // Cost estimation (approximate)
  estimateCost(tokens) {
    // GPT-4 Mini pricing (as of 2024)
    const inputCostPer1K = 0.00015; // $0.15 per 1K input tokens
    const outputCostPer1K = 0.0006; // $0.60 per 1K output tokens
    
    const inputTokens = Math.floor(tokens * 0.7); // Estimate 70% input
    const outputTokens = Math.floor(tokens * 0.3); // Estimate 30% output
    
    const inputCost = (inputTokens / 1000) * inputCostPer1K;
    const outputCost = (outputTokens / 1000) * outputCostPer1K;
    
    return {
      totalCost: inputCost + outputCost,
      inputCost: inputCost,
      outputCost: outputCost,
      tokens: tokens,
      inputTokens: inputTokens,
      outputTokens: outputTokens
    };
  }

  // Usage tracking
  trackUsage(tokens) {
    if (!this.config.enableCostControl) return;
    
    const today = new Date().toDateString();
    const usage = this.getUsageData();
    
    if (!usage[today]) {
      usage[today] = { tokens: 0, requests: 0 };
    }
    
    usage[today].tokens += tokens;
    usage[today].requests += 1;
    
    this.saveUsageData(usage);
    
    // Check limits
    if (usage[today].tokens > this.config.maxTokensPerDay) {
      console.warn('Daily token limit exceeded');
      return false;
    }
    
    return true;
  }

  getUsageData() {
    try {
      const data = localStorage.getItem('elvora_openai_usage');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading usage data:', error);
      return {};
    }
  }

  saveUsageData(usage) {
    try {
      localStorage.setItem('elvora_openai_usage', JSON.stringify(usage));
    } catch (error) {
      console.error('Error saving usage data:', error);
    }
  }

  // API Key management (for production)
  getAPIKey() {
    // In production, this should be securely stored server-side
    // For demo purposes, return null to use fallback responses
    return null;
    
    // Production example:
    // return process.env.OPENAI_API_KEY;
  }

  validateAPIKey(apiKey) {
    if (!apiKey) return false;
    return apiKey.startsWith('sk-') && apiKey.length > 20;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OpenAIConfig;
} else {
  window.OpenAIConfig = OpenAIConfig;
}
