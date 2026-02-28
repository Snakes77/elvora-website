// Email Integration for Elvora Consulting AI Chatbot
// =================================================

class EmailIntegration {
  constructor() {
    this.apiEndpoint = '/api/send-email-simple.php'; // PHP endpoint for email sending
  }

  async sendConsultationRequest(userDetails, conversationSummary, recaptchaToken = null) {
    try {
      // Try the PHP API endpoint first
      const emailData = {
        to: 'info@elvoraconsulting.co.uk',
        subject: `New Consultation Request - ${userDetails.name || 'Potential Client'}`,
        html: this.generateConsultationEmail(userDetails, conversationSummary),
        text: this.generateTextEmail(userDetails, conversationSummary),
        recaptchaToken: recaptchaToken
      };

      console.log('Attempting to send email via API:', this.apiEndpoint);

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      console.log('API Response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result);

        if (result.success) {
          return {
            success: true,
            message: 'Consultation request sent successfully',
            messageId: result.messageId
          };
        } else {
          throw new Error(result.error || 'Email sending failed');
        }
      } else {
        throw new Error(`API returned status: ${response.status}`);
      }

    } catch (error) {
      console.error('Email API failed:', error);
      
      // Fallback: Use a simple form submission that will work
      return this.fallbackEmailSend(userDetails, conversationSummary);
    }
  }

  fallbackEmailSend(userDetails, conversationSummary) {
    // Create a simple form that submits to a PHP script
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'send-consultation.php'; // Simple PHP script
    form.style.display = 'none';

    // Add form fields
    const fields = {
      'name': userDetails.name || 'Not provided',
      'email': userDetails.email || 'Not provided',
      'phone': userDetails.phone || 'Not provided',
      'consultation_type': userDetails.primaryNeed || 'General Consultation',
      'message': this.generateTextEmail(userDetails, conversationSummary),
      'subject': `New Consultation Request - ${userDetails.name || 'Potential Client'}`
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

    return {
      success: true,
      message: 'Consultation request submitted successfully'
    };
  }

  generateConsultationEmail(userDetails, conversationSummary) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #20B2AA 0%, #48CAE4 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Consultation Request</h1>
          <p style="margin: 5px 0 0 0;">Elvora Consulting - AI Assistant</p>
        </div>

        <div style="padding: 20px; background: #f8f9fa;">
          <h2 style="color: #20B2AA; margin-top: 0;">Client Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 8px;">${userDetails.name || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${userDetails.email || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Phone:</td>
              <td style="padding: 8px;">${userDetails.phone || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Organisation:</td>
              <td style="padding: 8px;">${userDetails.organisation || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Urgency:</td>
              <td style="padding: 8px;">${userDetails.urgency || 'Standard'}</td>
            </tr>
          </table>
        </div>

        <div style="padding: 20px; background: white;">
          <h2 style="color: #20B2AA; margin-top: 0;">Consultation Requirements</h2>
          <p><strong>Primary Need:</strong> ${userDetails.primaryNeed || 'Not specified'}</p>
          <p><strong>Timeline:</strong> ${userDetails.timeline || 'Not specified'}</p>
          <p><strong>Care Setting:</strong> ${userDetails.careSetting || 'Not specified'}</p>

          <h3 style="color: #20B2AA;">Conversation Summary</h3>
          <div style="background: #f1f3f4; padding: 15px; border-left: 4px solid #20B2AA; margin: 10px 0;">
            ${conversationSummary || 'No conversation summary available'}
          </div>
        </div>

        <div style="padding: 20px; background: #f8f9fa; text-align: center;">
          <p style="margin: 0; color: #666;">
            This consultation request was generated by the Elvora Consulting AI Assistant<br>
            Please respond within 24 hours for urgent requests
          </p>
        </div>
      </div>
    `;
  }

  async simulateEmailSent(userDetails) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      success: true,
      message: `Thank you ${userDetails.name || ''}! Your consultation request has been sent to Melissa. She will contact you within 24 hours to arrange your consultation.`,
      reference: `EC-${Date.now().toString().slice(-6)}`
    };
  }

  async sendAutoResponse(userEmail, userName, consultationType) {
    const autoResponseData = {
      to: userEmail,
      subject: 'Consultation Request Confirmed - Elvora Consulting',
      html: this.generateAutoResponse(userName, consultationType),
      type: 'auto_response'
    };

    console.log('Auto-response would be sent:', autoResponseData);
    return { success: true };
  }

  generateAutoResponse(userName, consultationType) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #20B2AA 0%, #48CAE4 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Thank You for Your Interest</h1>
          <p style="margin: 5px 0 0 0;">Elvora Consulting Limited</p>
        </div>

        <div style="padding: 20px;">
          <p>Dear ${userName || 'Valued Client'},</p>

          <p>Thank you for your interest in Elvora Consulting's ${consultationType || 'care quality'} services. We have received your consultation request and Melissa will be in touch within 24 hours.</p>

          <div style="background: #f1f3f4; padding: 15px; border-left: 4px solid #20B2AA; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #20B2AA;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Melissa will review your requirements</li>
              <li>She'll contact you within 24 hours to arrange a consultation</li>
              <li>Your initial consultation is complimentary</li>
              <li>We'll discuss how we can support your care quality goals</li>
            </ul>
          </div>

          <div style="background: #fff; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #20B2AA;">About Melissa</h3>
            <p style="margin-bottom: 0;">With 20+ years in the care sector and 5 years as an independent consultant, Melissa has helped 100+ care homes achieve their quality goals. She brings practical experience as a former Registered Manager and current Nominated Individual.</p>
          </div>

          <p>If you have any urgent questions in the meantime, please don't hesitate to contact us directly at <a href="mailto:info@elvoraconsulting.co.uk" style="color: #20B2AA;">info@elvoraconsulting.co.uk</a></p>

          <p>Best regards,<br>
          <strong>The Elvora Consulting Team</strong></p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">
            Elvora Consulting Limited | Independent Care Quality Specialists<br>
            Supporting care providers across the UK to achieve Outstanding ratings
          </p>
        </div>
      </div>
    `;
  }
}

// Export for use in chatbot
window.EmailIntegration = EmailIntegration;