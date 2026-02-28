// AI-Powered Care Quality Chatbot for Elvora Consulting
// ===================================================

class ElvoraAIChatbot {
  constructor() {
    console.log('ElvoraAIChatbot constructor called');
    this.apiKey = null;
    this.isOpen = false;
    this.messages = [];
    this.recaptchaSiteKey = '6LfYourSiteKeyHere'; // Replace with your actual site key
    
    try {
      this.emailIntegration = new EmailIntegration();
      console.log('EmailIntegration created successfully');
    } catch (error) {
      console.error('Error creating EmailIntegration:', error);
      this.emailIntegration = null;
    }
    
    // Calendar integration disabled for now - using email-only booking
    this.calendarIntegration = null;
    console.log('Using email-only booking system');
    
    this.conversationContext = {
      hasDiscussedConsultation: false,
      hasShownCalendar: false,
      userDetails: {},
      conversationSummary: '',
      availableSlots: []
    };
    
    try {
      this.init();
    } catch (error) {
      console.error('Error in init():', error);
    }
  }

  async init() {
    console.log('init() method called');
    try {
      // Load API key from environment (this would typically be done server-side)
      // For demo purposes, we'll use a placeholder
      this.createChatWidget();
      this.setupEventListeners();
      this.addInitialMessage();
      
      // Make chatbot globally accessible
      window.elvoraChatbot = this;
      
      console.log('init() completed successfully');
    } catch (error) {
      console.error('Error in init() method:', error);
    }
  }

  // Verify reCAPTCHA token
  async verifyRecaptcha() {
    return new Promise((resolve, reject) => {
      if (typeof grecaptcha === 'undefined') {
        console.warn('reCAPTCHA not loaded, skipping verification');
        resolve(true); // Allow submission if reCAPTCHA not available
        return;
      }
      
      grecaptcha.ready(() => {
        grecaptcha.execute(this.recaptchaSiteKey, { action: 'consultation_request' })
          .then((token) => {
            console.log('reCAPTCHA token generated:', token);
            resolve(token);
          })
          .catch((error) => {
            console.error('reCAPTCHA verification failed:', error);
            reject(error);
          });
      });
    });
  }

  // Handle booking request
  async handleBookingRequest() {
    const userDetails = this.conversationContext.userDetails;
    const consultationType = this.getPrimaryNeedDescription(userDetails.primaryNeed);
    
    // Show sending message
    this.addMessageToChat({
      type: 'bot',
      content: `📧 <strong>Sending consultation request...</strong><br><br>Please wait while I verify and send your request to Melissa.`,
      timestamp: new Date()
    });
    
    try {
      // Verify reCAPTCHA first
      const recaptchaToken = await this.verifyRecaptcha();
      
      if (!recaptchaToken) {
        throw new Error('reCAPTCHA verification failed');
      }
      
      // Use the email integration
      if (this.emailIntegration) {
        const result = await this.emailIntegration.sendConsultationRequest(userDetails, consultationType, recaptchaToken);
        
        if (result.success) {
          this.addMessageToChat({
            type: 'bot',
            content: `✅ <strong>Consultation Request Sent Successfully!</strong><br><br>Your request has been verified and sent directly to Melissa at info@elvoraconsulting.co.uk<br><br><strong>What happens next:</strong><br>• Melissa will contact you within 2 hours<br>• She'll confirm your consultation details<br>• You'll receive a professional consultation<br><br>Thank you for choosing Elvora Consulting!`,
            timestamp: new Date()
          });
        } else {
          throw new Error(result.error);
        }
      } else {
        throw new Error('Email integration not available');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Show error message
      this.addMessageToChat({
        type: 'bot',
        content: `❌ <strong>Request Failed</strong><br><br>I apologize, but I'm having trouble sending your request. Please try again or contact us directly at <a href="mailto:info@elvoraconsulting.co.uk">info@elvoraconsulting.co.uk</a>.<br><br>Error: ${error.message}`,
        timestamp: new Date()
      });
    }
    
    // Remove the booking widget
    const widget = document.querySelector('.booking-fallback-widget');
    if (widget) {
      widget.remove();
    }
  }

  // Fallback form submission
  sendConsultationForm(userDetails, consultationType) {
    // Create hidden form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'mailto:info@elvoraconsulting.co.uk';
    form.enctype = 'text/plain';
    form.style.display = 'none';

    // Add form fields
    const fields = {
      'subject': `Consultation Request - ${userDetails.name}`,
      'body': `Name: ${userDetails.name}\nEmail: ${userDetails.email}\nConsultation Type: ${consultationType}\nPreferred Time: Flexible\n\nPlease contact me to arrange a consultation.\n\nBest regards,\n${userDetails.name}`
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Show fallback message
    this.addMessageToChat({
      type: 'bot',
      content: `📧 <strong>Consultation Request Ready!</strong><br><br>Your email client should open with a pre-filled consultation request.<br><br><strong>What happens next:</strong><br>• Send the email that opened<br>• Melissa will contact you within 2 hours<br>• She'll confirm your consultation details<br><br>If your email didn't open, please contact us directly at <a href="mailto:info@elvoraconsulting.co.uk">info@elvoraconsulting.co.uk</a>`,
      timestamp: new Date()
    });
  }

  createChatWidget() {
    console.log('Creating chat widget HTML...');
    // Create chat widget HTML
    const chatHTML = `
      <div id="ai-chatbot" class="ai-chatbot">
        <div class="chat-header" id="chat-header">
          <div class="chat-title">
            <div class="chat-avatar">EC</div>
            <div class="chat-info">
              <h4>Elvora AI Assistant</h4>
              <span class="chat-status">Care Quality Expert • Online</span>
            </div>
          </div>
          <button class="chat-close" id="chat-close">×</button>
        </div>

        <div class="chat-messages" id="chat-messages">
          <!-- Messages will be added here -->
        </div>

        <div class="chat-input-container">
          <div class="quick-actions" id="quick-actions">
            <button class="quick-btn" data-message="I need help with care inspection preparation">Care Inspection</button>
            <button class="quick-btn" data-message="How can I achieve Outstanding ratings?">Outstanding Ratings</button>
            <button class="quick-btn" data-message="I need crisis management support">Crisis Support</button>
          </div>
          <div class="chat-input-wrapper">
            <input type="text" id="chat-input" placeholder="Ask about care quality, Outstanding ratings..." />
            <button id="chat-send" class="chat-send-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
              </svg>
            </button>
          </div>
          <div class="chat-disclaimer">
            <p>⚠️ AI can make mistakes. Check important information. <a href="privacy-policy.html">See Cookie Preferences</a></p>
          </div>
        </div>
      </div>

      <div class="chat-toggle" id="chat-toggle">
        <div class="chat-toggle-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <div class="chat-notification" id="chat-notification">New</div>
      </div>
    `;

    // Add to page
    console.log('Inserting chat widget into page...');
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    console.log('Chat widget inserted successfully!');
  }

  setupEventListeners() {
    const toggle = document.getElementById('chat-toggle');
    const close = document.getElementById('chat-close');
    const input = document.getElementById('chat-input');
    const send = document.getElementById('chat-send');
    const quickBtns = document.querySelectorAll('.quick-btn');

    toggle.addEventListener('click', () => this.toggleChat());
    close.addEventListener('click', () => this.closeChat());
    send.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const message = btn.getAttribute('data-message');
        this.sendMessage(message);
      });
    });
  }

  toggleChat() {
    const chatbot = document.getElementById('ai-chatbot');
    const notification = document.getElementById('chat-notification');

    this.isOpen = !this.isOpen;
    chatbot.classList.toggle('open', this.isOpen);

    if (this.isOpen) {
      notification.style.display = 'none';
      document.getElementById('chat-input').focus();
    }
  }

  closeChat() {
    this.isOpen = false;
    document.getElementById('ai-chatbot').classList.remove('open');
  }

  addInitialMessage() {
    const welcomeMessage = {
      type: 'bot',
      content: `👋 Hello! I'm Elvora's AI assistant, specialising in care quality excellence and regulatory compliance.

I can help you with:
• Care inspection preparation
• Outstanding rating requirements
• Care quality standards
• Policy development
• Crisis management support

How can I assist you today?`,
      timestamp: new Date()
    };

    this.addMessageToChat(welcomeMessage);
  }

  async sendMessage(text = null) {
    const input = document.getElementById('chat-input');
    const message = text || input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessageToChat({
      type: 'user',
      content: message,
      timestamp: new Date()
    });

    // Clear input
    if (!text) input.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Get AI response
      const response = await this.getAIResponse(message);

      // Remove typing indicator
      this.hideTypingIndicator();

      // Add AI response
      this.addMessageToChat({
        type: 'bot',
        content: response,
        timestamp: new Date()
      });

      // Check if response suggests consultation and show form
      if (this.shouldShowConsultationForm(response)) {
        setTimeout(() => this.showConsultationForm(), 1000);
      }
    } catch (error) {
      console.error('AI Response Error:', error);
      this.hideTypingIndicator();
      this.addMessageToChat({
        type: 'bot',
        content: 'I apologise, but I\'m having trouble connecting right now. Please try again in a moment, or contact us directly at info@elvoraconsulting.co.uk for immediate assistance.',
        timestamp: new Date()
      });
    }
  }

  async getAIResponse(message) {
    // Using GPT-4 Mini for cost-effective AI responses
    try {
      const response = await this.callOpenAIAPI(message);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Fallback to predefined responses if API fails
      return this.getFallbackResponse(message);
    }
  }

  async callOpenAIAPI(message) {
    // GPT-4 Mini configuration for cost-effective service
    const apiKey = this.getAPIKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize OpenAI config for cost optimization
    const openaiConfig = new OpenAIConfig();
    const config = openaiConfig.getCostOptimizedConfig();

    // Estimate tokens for cost tracking
    const estimatedTokens = this.estimateTokens(message);
    if (!openaiConfig.trackUsage(estimatedTokens)) {
      throw new Error('Daily usage limit exceeded');
    }

    const response = await fetch(openaiConfig.config.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        ...config,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt()
          },
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Track actual usage
    const actualTokens = data.usage?.total_tokens || estimatedTokens;
    openaiConfig.trackUsage(actualTokens);
    
    return data.choices[0].message.content;
  }

  estimateTokens(text) {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  getAPIKey() {
    // In production, this should be securely stored server-side
    // For now, return null to use fallback responses
    return null; // Replace with actual API key when ready
  }

  getSystemPrompt() {
    return `You are Elvora AI Assistant, a specialized care quality consultant chatbot for Elvora Consulting Limited. 

Your role:
- Provide expert guidance on CQC compliance and care quality
- Help care homes understand regulatory requirements
- Offer practical advice on inspection preparation
- Qualify leads for professional consultation with Melissa Meakin

Key information:
- Melissa Meakin: 20+ years care experience, former Registered Manager, current Nominated Individual
- Elvora Consulting: Independent consultancy (not affiliated with CQC)
- Services: Inspection prep, quality audits, training, policy development
- Contact: info@elvoraconsulting.co.uk

Guidelines:
- Be professional, knowledgeable, and helpful
- Focus on practical, actionable advice
- Always clarify that Elvora is independent from CQC
- Qualify leads before suggesting consultation
- Keep responses concise but comprehensive
- Use UK care terminology and regulations

Always end qualified conversations with consultation offer and contact details.`;
  }

  getFallbackResponse(message) {
    // Fallback responses when API is unavailable

    const careResponses = {
      'cqc': `Care quality inspection preparation is crucial for maintaining high standards. Here's what I recommend:

<strong>Key Areas to Focus On:</strong>
• Safe - Risk assessments, safeguarding procedures
• Effective - Evidence-based care, staff competency
• Caring - Person-centred approach, dignity & respect
• Responsive - Individual needs, complaints handling
• Well-led - Leadership, governance, continuous improvement

<strong>Next Steps:</strong>
Would you like me to connect you with Melissa for a detailed inspection readiness assessment?`,

      'outstanding': `Achieving Outstanding ratings requires excellence across all five care quality domains:

<strong>Outstanding Criteria:</strong>
• Innovative care approaches
• Exceptional outcomes for people
• Strong leadership and governance
• Continuous quality improvement
• Positive culture and staff engagement

<strong>Elvora's Approach:</strong>
✓ Comprehensive gap analysis
✓ Action plan development
✓ Staff training and support
✓ Ongoing mentorship

Would you like to book a consultation to discuss your Outstanding rating journey?`,

      'crisis': `Crisis management in care settings requires immediate, structured response:

<strong>Our Crisis Support:</strong>
• Rapid assessment and stabilisation
• Regulatory compliance restoration
• Staff support and retraining
• Communication with regulators and commissioners
• Long-term improvement planning

<strong>Available Support:</strong>
Melissa provides emergency crisis consultancy with 20+ years' experience in turning around failing services.

Shall I arrange an urgent consultation call?`
    };

    // Simple keyword matching for demo
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('cqc') || lowerMessage.includes('inspection')) {
      return careResponses.cqc;
    } else if (lowerMessage.includes('outstanding') || lowerMessage.includes('rating')) {
      return careResponses.outstanding;
    } else if (lowerMessage.includes('crisis') || lowerMessage.includes('emergency')) {
      return careResponses.crisis;
    } else {
      return `Thank you for your question about "${message}".

As a care quality compliance specialist, I can help with:
• Care quality standards
• Inspection preparation
• Outstanding rating support
• Policy development
• Crisis management

For detailed guidance tailored to your specific situation, would you like me to arrange a consultation with Melissa?

<strong>Contact Options:</strong>
📧 info@elvoraconsulting.co.uk
📞 Book via our contact form
💬 Continue chatting here`;
    }
  }

  addMessageToChat(message) {
    this.messages.push(message);
    const messagesContainer = document.getElementById('chat-messages');

    const messageHTML = `
      <div class="chat-message ${message.type}">
        <div class="message-content">
          ${message.content.replace(/\n/g, '<br>')}
        </div>
        <div class="message-time">
          ${message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingHTML = `
      <div class="chat-message bot typing-indicator" id="typing-indicator">
        <div class="message-content">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  shouldShowConsultationForm(response) {
    const consultationKeywords = [
      'consultation', 'book', 'arrange', 'schedule', 'connect you with Melissa',
      'would you like me to arrange', 'shall I arrange'
    ];
    return consultationKeywords.some(keyword =>
      response.toLowerCase().includes(keyword.toLowerCase())
    ) && !this.conversationContext.hasDiscussedConsultation;
  }

  showConsultationForm() {
    const quickActions = document.getElementById('quick-actions');
    const consultationFormHTML = `
      <div class="consultation-form-widget" id="consultation-form-widget">
        <div class="form-header">
          <h4>Book Your Free Consultation</h4>
          <p>Let's discuss your care quality needs</p>
        </div>
        <form id="chat-consultation-form">
          <div class="form-row">
            <input type="text" id="chat-name" placeholder="Your Name *" required>
            <input type="email" id="chat-email" placeholder="Email Address *" required>
          </div>
          <div class="form-row">
            <input type="text" id="chat-phone" placeholder="Phone Number">
            <input type="text" id="chat-organisation" placeholder="Organisation">
          </div>
          <div class="form-row">
            <select id="chat-primary-need" required>
              <option value="">Primary Need *</option>
              <option value="inspection-preparation">Care Inspection Preparation</option>
              <option value="outstanding-ratings">Outstanding Rating Support</option>
              <option value="crisis-management">Crisis Management</option>
              <option value="policy-development">Policy Development</option>
              <option value="staff-training">Staff Training</option>
              <option value="ongoing-support">Ongoing Consultancy</option>
            </select>
            <select id="chat-urgency">
              <option value="standard">Standard Timeline</option>
              <option value="urgent">Urgent (Within 48 hours)</option>
              <option value="emergency">Emergency Support</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" onclick="this.closest('.consultation-form-widget').remove()">Cancel</button>
            <button type="submit" class="btn-primary">Continue to Calendar</button>
          </div>
        </form>
      </div>
    `;

    quickActions.insertAdjacentHTML('afterend', consultationFormHTML);

    const form = document.getElementById('chat-consultation-form');
    form.addEventListener('submit', (e) => this.handleConsultationSubmission(e));

    this.conversationContext.hasDiscussedConsultation = true;
  }

  async handleConsultationSubmission(e) {
    e.preventDefault();

    const userDetails = {
      name: document.getElementById('chat-name').value,
      email: document.getElementById('chat-email').value,
      phone: document.getElementById('chat-phone').value,
      organisation: document.getElementById('chat-organisation').value,
      primaryNeed: document.getElementById('chat-primary-need').value,
      urgency: document.getElementById('chat-urgency').value,
      timeline: document.getElementById('chat-urgency').value,
      careSetting: 'Discussed via AI Chat'
    };

    this.conversationContext.userDetails = userDetails;
    document.getElementById('consultation-form-widget').remove();

    // Show calendar booking interface
    await this.showCalendarBooking();
  }

  generateConversationSummary() {
    const userMessages = this.messages.filter(msg => msg.type === 'user');
    const recentMessages = userMessages.slice(-5); // Last 5 user messages

    if (recentMessages.length === 0) {
      return 'User initiated consultation request via AI chatbot.';
    }

    return `User Discussion Summary:\n${recentMessages.map((msg, index) =>
      `${index + 1}. ${msg.content}`
    ).join('\n')}\n\nConversation initiated through Elvora Consulting AI Assistant.`;
  }

  getPrimaryNeedDescription(primaryNeed) {
    const descriptions = {
      'inspection-preparation': 'Care Inspection Preparation',
      'outstanding-ratings': 'Outstanding Rating Support',
      'crisis-management': 'Crisis Management Support',
      'policy-development': 'Policy Development',
      'staff-training': 'Staff Training and Development',
      'ongoing-support': 'Ongoing Consultancy Support'
    };
    return descriptions[primaryNeed] || 'Care Quality Consultation';
  }

  async showCalendarBooking() {
    this.showTypingIndicator();

    this.addMessageToChat({
      type: 'bot',
      content: `Perfect ${this.conversationContext.userDetails.name}! Let me check Melissa's calendar availability for your consultation...`,
      timestamp: new Date()
    });

    try {
      // Get available time slots
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 14); // Next 2 weeks

      const availableSlots = await this.calendarIntegration.getAvailableTimeSlots(startDate, endDate);
      this.conversationContext.availableSlots = availableSlots;

      this.hideTypingIndicator();

      if (availableSlots.length > 0) {
        this.addMessageToChat({
          type: 'bot',
          content: `Great! I found several available time slots for your consultation. Please select your preferred time:`,
          timestamp: new Date()
        });

        this.showCalendarSlots(availableSlots.slice(0, 8)); // Show first 8 slots
      } else {
        this.addMessageToChat({
          type: 'bot',
          content: `I'm unable to access the calendar at the moment, but I can send your booking request to Melissa. She'll contact you within 2 hours to arrange a suitable time.<br><br>Would you like me to send the booking request now?`,
          timestamp: new Date()
        });
        this.showBookingFallback();
      }
    } catch (error) {
      console.error('Calendar booking error:', error);
      this.hideTypingIndicator();
      this.addMessageToChat({
        type: 'bot',
        content: `I'll send your consultation request to Melissa, and she'll contact you within 2 hours to schedule your appointment. Is that alright?`,
        timestamp: new Date()
      });
      this.showBookingFallback();
    }
  }

  showCalendarSlots(slots) {
    const quickActions = document.getElementById('quick-actions');
    const slotsHTML = `
      <div class="calendar-slots-widget" id="calendar-slots-widget">
        <div class="form-header">
          <h4>📅 Available Consultation Times</h4>
          <p>Select your preferred time slot</p>
        </div>
        <div class="time-slots">
          ${slots.map((slot, index) => `
            <button class="time-slot-btn" data-slot-index="${index}">
              <div class="slot-date">${slot.formatted.split(',')[0]}</div>
              <div class="slot-time">${slot.formatted.split(' - ')[1]}</div>
            </button>
          `).join('')}
        </div>
        <div class="form-actions">
          <button type="button" class="btn-secondary" onclick="this.closest('.calendar-slots-widget').remove()">Cancel</button>
          <button type="button" class="btn-link" onclick="this.parentElement.parentElement.querySelector('.show-more-slots').click()">Show More Times</button>
        </div>
      </div>
    `;

    quickActions.insertAdjacentHTML('afterend', slotsHTML);

    // Add event listeners for slot selection
    document.querySelectorAll('.time-slot-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleSlotSelection(e));
    });

    this.conversationContext.hasShownCalendar = true;
  }

  async handleSlotSelection(e) {
    const slotIndex = parseInt(e.currentTarget.getAttribute('data-slot-index'));
    const selectedSlot = this.conversationContext.availableSlots[slotIndex];
    const userDetails = this.conversationContext.userDetails;
    const consultationType = this.getPrimaryNeedDescription(userDetails.primaryNeed);

    document.getElementById('calendar-slots-widget').remove();

    this.showTypingIndicator();

    this.addMessageToChat({
      type: 'bot',
      content: `Excellent choice! I'm booking your consultation for ${selectedSlot.formatted}. This will just take a moment...`,
      timestamp: new Date()
    });

    try {
      const result = await this.calendarIntegration.bookConsultation(
        userDetails,
        selectedSlot,
        consultationType
      );

      this.hideTypingIndicator();

      if (result.success) {
        this.addMessageToChat({
          type: 'bot',
          content: `<strong>🎉 Consultation Booked Successfully!</strong><br><br>${result.message}<br><br><strong>Reference:</strong> ${result.reference}<br><br>${result.meetingUrl ? `<strong>Meeting Link:</strong> <a href="${result.meetingUrl}" target="_blank">Join Video Call</a><br><br>` : ''}You should receive a calendar invitation shortly. Is there anything else I can help you prepare for your consultation?`,
          timestamp: new Date()
        });

        // Send confirmation emails
        await this.sendBookingConfirmationEmails(userDetails, selectedSlot, consultationType);
      }
    } catch (error) {
      console.error('Booking failed:', error);
      this.hideTypingIndicator();
      this.addMessageToChat({
        type: 'bot',
        content: `I apologise, but there was an issue completing the booking. Let me send your request to Melissa instead, and she'll confirm the appointment personally.`,
        timestamp: new Date()
      });
      await this.showBookingFallback();
    }
  }

  showBookingFallback() {
    const quickActions = document.getElementById('quick-actions');
    const fallbackHTML = `
      <div class="booking-fallback-widget" id="booking-fallback-widget">
        <div class="form-header">
          <h4>📧 Send Booking Request</h4>
          <p>Melissa will contact you within 2 hours</p>
        </div>
        <div class="booking-summary">
          <p><strong>Your Details:</strong><br>
          ${this.conversationContext.userDetails.name}<br>
          ${this.conversationContext.userDetails.email}</p>
          <p><strong>Consultation Type:</strong><br>
          ${this.getPrimaryNeedDescription(this.conversationContext.userDetails.primaryNeed)}</p>
        </div>
        <div class="form-actions">
          <button type="button" class="btn-secondary" onclick="this.closest('.booking-fallback-widget').remove()">Cancel</button>
          <button type="button" class="btn-primary" onclick="window.elvoraChatbot.handleBookingRequest()">Send Request</button>
        </div>
      </div>
    `;

    quickActions.insertAdjacentHTML('afterend', fallbackHTML);

    document.getElementById('booking-fallback-widget').addEventListener('send-booking-request', () => {
      this.handleFallbackBooking();
    });
  }

  async handleFallbackBooking() {
    document.getElementById('booking-fallback-widget').remove();

    this.showTypingIndicator();

    try {
      const userDetails = this.conversationContext.userDetails;
      const conversationSummary = this.generateConversationSummary();

      const result = await this.emailIntegration.sendConsultationRequest(
        userDetails,
        conversationSummary
      );

      this.hideTypingIndicator();

      if (result.success) {
        this.addMessageToChat({
          type: 'bot',
          content: `<strong>Request Sent! 📧</strong><br><br>${result.message}<br><br><strong>Reference:</strong> ${result.reference}<br><br>Melissa will review your requirements and contact you within 2 hours to schedule your consultation.`,
          timestamp: new Date()
        });

        // Send auto-response email
        if (userDetails.email) {
          await this.emailIntegration.sendAutoResponse(
            userDetails.email,
            userDetails.name,
            this.getPrimaryNeedDescription(userDetails.primaryNeed)
          );
        }
      }
    } catch (error) {
      console.error('Fallback booking failed:', error);
      this.hideTypingIndicator();
      this.addMessageToChat({
        type: 'bot',
        content: 'I apologise, but I\'m having trouble sending your request. Please contact us directly at <a href="mailto:info@elvoraconsulting.co.uk">info@elvoraconsulting.co.uk</a> to arrange your consultation.',
        timestamp: new Date()
      });
    }
  }

  async sendBookingConfirmationEmails(userDetails, selectedSlot, consultationType) {
    try {
      // Send consultation summary to Melissa
      await this.emailIntegration.sendConsultationRequest(
        userDetails,
        `Calendar Booking Confirmed: ${selectedSlot.formatted}\n\n${this.generateConversationSummary()}`
      );

      // Send confirmation to client
      await this.emailIntegration.sendAutoResponse(
        userDetails.email,
        userDetails.name,
        consultationType
      );
    } catch (error) {
      console.error('Failed to send confirmation emails:', error);
    }
  }

}

// Initialize AI Chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing Elvora AI Assistant...');
  // Initialize chatbot with email integration
  setTimeout(() => {
    try {
      console.log('Creating ElvoraAIChatbot instance...');
      window.elvoraChatbot = new ElvoraAIChatbot();
      console.log('Elvora AI Assistant initialized successfully!');
    } catch (error) {
      console.error('Error initializing Elvora AI Assistant:', error);
    }
  }, 1000);
});

// Global functions for HTML onclick handlers (if needed)
function toggleChat() {
  if (window.elvoraChatbot) {
    window.elvoraChatbot.toggleChat();
  }
}

function closeChat() {
  if (window.elvoraChatbot) {
    window.elvoraChatbot.closeChat();
  }
}

function sendMessage() {
  if (window.elvoraChatbot) {
    window.elvoraChatbot.sendMessage();
  }
}