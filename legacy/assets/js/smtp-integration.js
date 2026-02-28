// SMTP Email Integration for Elvora Consulting
// ============================================

class SMTPIntegration {
  constructor() {
    this.smtpConfig = {
      // Hostinger SMTP settings
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'info@elvoraconsulting.co.uk', // Your email
        pass: 'YOUR_EMAIL_PASSWORD' // Your email password
      }
    };
  }

  async sendConsultationRequest(userDetails, consultationType) {
    try {
      // Create email content
      const emailData = {
        to: 'info@elvoraconsulting.co.uk',
        from: 'info@elvoraconsulting.co.uk',
        subject: `New Consultation Request - ${userDetails.name}`,
        html: this.generateConsultationEmail(userDetails, consultationType),
        text: this.generateTextEmail(userDetails, consultationType)
      };

      // Send email via SMTP
      const result = await this.sendEmail(emailData);
      
      return {
        success: true,
        messageId: result.messageId,
        message: 'Consultation request sent successfully'
      };

    } catch (error) {
      console.error('SMTP Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async sendEmail(emailData) {
    // This would typically use a server-side SMTP library
    // For now, we'll use a simple fetch to a server endpoint
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...emailData,
          smtpConfig: this.smtpConfig
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Fallback to simple form submission
      return await this.fallbackEmailSend(emailData);
    }
  }

  async fallbackEmailSend(emailData) {
    // Create a hidden form and submit it
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'mailto:info@elvoraconsulting.co.uk';
    form.enctype = 'text/plain';
    form.style.display = 'none';

    // Add form fields
    const subjectField = document.createElement('input');
    subjectField.name = 'subject';
    subjectField.value = emailData.subject;
    form.appendChild(subjectField);

    const bodyField = document.createElement('textarea');
    bodyField.name = 'body';
    bodyField.value = emailData.text;
    form.appendChild(bodyField);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    return { messageId: 'fallback-' + Date.now() };
  }

  generateConsultationEmail(userDetails, consultationType) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Consultation Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #20B2AA; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .details { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #20B2AA; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Consultation Request</h1>
            <p>Elvora Consulting Limited</p>
          </div>
          
          <div class="content">
            <h2>Client Details</h2>
            <div class="details">
              <p><strong>Name:</strong> ${userDetails.name}</p>
              <p><strong>Email:</strong> ${userDetails.email}</p>
              <p><strong>Phone:</strong> ${userDetails.phone || 'Not provided'}</p>
              <p><strong>Consultation Type:</strong> ${consultationType}</p>
              <p><strong>Preferred Time:</strong> ${userDetails.preferredTime || 'Flexible'}</p>
            </div>

            <h2>Next Steps</h2>
            <p>Please contact this client within 2 hours to:</p>
            <ul>
              <li>Confirm consultation details</li>
              <li>Schedule preferred time</li>
              <li>Discuss specific requirements</li>
              <li>Provide initial guidance</li>
            </ul>

            <div class="details">
              <h3>Quick Response Template</h3>
              <p>Hi ${userDetails.name},</p>
              <p>Thank you for your consultation request. I'd be happy to help you with ${consultationType}.</p>
              <p>I'll call you within the next 2 hours to discuss your specific needs and arrange a convenient time for your consultation.</p>
              <p>Best regards,<br>Melissa Meakin<br>Elvora Consulting Limited</p>
            </div>
          </div>
          
          <div class="footer">
            <p>This email was sent automatically from the Elvora Consulting website.</p>
            <p>© 2025 Elvora Consulting Limited | Expert Care Quality Consultancy</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateTextEmail(userDetails, consultationType) {
    return `
New Consultation Request - Elvora Consulting

Client Details:
- Name: ${userDetails.name}
- Email: ${userDetails.email}
- Phone: ${userDetails.phone || 'Not provided'}
- Consultation Type: ${consultationType}
- Preferred Time: ${userDetails.preferredTime || 'Flexible'}

Next Steps:
Please contact this client within 2 hours to confirm consultation details and schedule a convenient time.

Quick Response Template:
Hi ${userDetails.name},

Thank you for your consultation request. I'd be happy to help you with ${consultationType}.

I'll call you within the next 2 hours to discuss your specific needs and arrange a convenient time for your consultation.

Best regards,
Melissa Meakin
Elvora Consulting Limited

---
This email was sent automatically from the Elvora Consulting website.
© 2025 Elvora Consulting Limited | Expert Care Quality Consultancy
    `;
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SMTPIntegration;
} else {
  window.SMTPIntegration = SMTPIntegration;
}
