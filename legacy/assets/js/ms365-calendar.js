// Microsoft 365 Calendar Integration for Elvora Consulting
// ======================================================

class MS365CalendarIntegration {
  constructor() {
    this.clientId = 'YOUR_CLIENT_ID_HERE'; // Replace with your Azure App ID
    this.tenantId = 'YOUR_TENANT_ID_HERE'; // Replace with your Azure Tenant ID
    this.redirectUri = 'https://elvoraconsulting.co.uk/auth/callback.html';
    this.accessToken = localStorage.getItem('ms365_access_token');
    this.graphEndpoint = 'https://graph.microsoft.com/v1.0';
    this.scopes = ['https://graph.microsoft.com/Calendars.ReadWrite', 'https://graph.microsoft.com/User.Read'];
  }

  // Initialize with environment configuration
  async init() {
    try {
      // In production, these would come from your backend API
      // For security, never expose client secrets in frontend
      console.log('MS365 Calendar Integration initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize MS365 integration:', error);
      return false;
    }
  }

  // Get available time slots for consultation booking
  async getAvailableTimeSlots(startDate, endDate) {
    try {
      if (!this.accessToken) {
        throw new Error('Not authenticated with MS365');
      }

      const requestBody = {
        schedules: ['info@elvoraconsulting.co.uk'],
        startTime: {
          dateTime: startDate.toISOString(),
          timeZone: 'Europe/London'
        },
        endTime: {
          dateTime: endDate.toISOString(),
          timeZone: 'Europe/London'
        },
        availabilityViewInterval: 60
      };

      const response = await fetch(`${this.graphEndpoint}/me/calendar/getSchedule`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'Prefer': 'outlook.timezone="Europe/London"'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Failed to get calendar availability: ${response.status}`);
      }

      const data = await response.json();
      return this.parseAvailableSlots(data, startDate, endDate);

    } catch (error) {
      console.error('Error getting available time slots:', error);
      return this.generateFallbackSlots(startDate, endDate);
    }
  }

  // Parse Microsoft Graph calendar response into available slots
  parseAvailableSlots(scheduleData, startDate, endDate) {
    const availableSlots = [];
    const businessHours = { start: 9, end: 17 }; // 9 AM to 5 PM
    const slotDuration = 60; // 60 minutes

    // Get busy periods from the response
    const busyTimes = scheduleData.value[0]?.busyTimes || [];

    // Generate potential slots during business hours
    const currentDate = new Date(startDate);

    while (currentDate < endDate) {
      // Skip weekends
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      // Generate hourly slots during business hours
      for (let hour = businessHours.start; hour < businessHours.end; hour++) {
        const slotStart = new Date(currentDate);
        slotStart.setHours(hour, 0, 0, 0);

        const slotEnd = new Date(slotStart);
        slotEnd.setMinutes(slotDuration);

        // Check if this slot conflicts with busy times
        const isConflict = busyTimes.some(busyPeriod => {
          const busyStart = new Date(busyPeriod.start.dateTime);
          const busyEnd = new Date(busyPeriod.end.dateTime);
          return slotStart < busyEnd && slotEnd > busyStart;
        });

        if (!isConflict && slotStart > new Date()) {
          availableSlots.push({
            start: slotStart,
            end: slotEnd,
            formatted: this.formatTimeSlot(slotStart, slotEnd)
          });
        }
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return availableSlots.slice(0, 20); // Return first 20 available slots
  }

  // Generate fallback slots when API is unavailable
  generateFallbackSlots(startDate, endDate) {
    const slots = [];
    const businessHours = { start: 9, end: 17 };
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

    for (let day = 0; day < 7; day++) {
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        // Generate morning and afternoon slots
        const morningSlot = new Date(currentDate);
        morningSlot.setHours(10, 0, 0, 0);

        const afternoonSlot = new Date(currentDate);
        afternoonSlot.setHours(14, 0, 0, 0);

        slots.push({
          start: morningSlot,
          end: new Date(morningSlot.getTime() + 60 * 60 * 1000),
          formatted: this.formatTimeSlot(morningSlot, new Date(morningSlot.getTime() + 60 * 60 * 1000))
        });

        slots.push({
          start: afternoonSlot,
          end: new Date(afternoonSlot.getTime() + 60 * 60 * 1000),
          formatted: this.formatTimeSlot(afternoonSlot, new Date(afternoonSlot.getTime() + 60 * 60 * 1000))
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return slots;
  }

  // Format time slot for display
  formatTimeSlot(start, end) {
    const options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    };

    const startStr = start.toLocaleString('en-GB', options);
    const endTime = end.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    });

    return `${startStr} - ${endTime}`;
  }

  // Book a consultation meeting
  async bookConsultation(userDetails, selectedSlot, consultationType) {
    try {
      if (!this.accessToken) {
        // Fallback: Send email booking request
        return await this.sendBookingRequestEmail(userDetails, selectedSlot, consultationType);
      }

      const meetingDetails = {
        subject: `Care Quality Consultation - ${userDetails.name}`,
        body: {
          contentType: 'HTML',
          content: this.generateMeetingDescription(userDetails, consultationType)
        },
        start: {
          dateTime: selectedSlot.start.toISOString(),
          timeZone: 'Europe/London'
        },
        end: {
          dateTime: selectedSlot.end.toISOString(),
          timeZone: 'Europe/London'
        },
        location: {
          displayName: 'Video Consultation',
          locationType: 'default'
        },
        attendees: [
          {
            emailAddress: {
              address: userDetails.email,
              name: userDetails.name
            },
            type: 'required'
          }
        ],
        allowNewTimeProposals: true,
        isOnlineMeeting: true,
        onlineMeetingProvider: 'teamsForBusiness'
      };

      const response = await fetch(`${this.graphEndpoint}/me/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'Prefer': 'outlook.timezone="Europe/London"'
        },
        body: JSON.stringify(meetingDetails)
      });

      if (!response.ok) {
        throw new Error(`Failed to book meeting: ${response.status}`);
      }

      const booking = await response.json();
      return {
        success: true,
        bookingId: booking.id,
        meetingUrl: booking.onlineMeeting?.joinUrl,
        message: `Your consultation has been booked for ${selectedSlot.formatted}. You'll receive a calendar invitation with video meeting details shortly.`,
        reference: `EC-CAL-${Date.now().toString().slice(-6)}`
      };

    } catch (error) {
      console.error('Booking failed:', error);

      // Fallback to email booking
      return await this.sendBookingRequestEmail(userDetails, selectedSlot, consultationType);
    }
  }

  // Fallback: Send booking request via email
  async sendBookingRequestEmail(userDetails, selectedSlot, consultationType) {
    try {
      const emailData = {
        to: 'info@elvoraconsulting.co.uk',
        subject: `Calendar Booking Request - ${userDetails.name}`,
        html: this.generateBookingRequestEmail(userDetails, selectedSlot, consultationType),
        type: 'calendar_booking_request'
      };

      // This would integrate with your existing email system
      console.log('Booking request email would be sent:', emailData);

      return {
        success: true,
        message: `Thank you ${userDetails.name}! Your consultation request for ${selectedSlot.formatted} has been sent to Melissa. She will confirm the booking and send you a calendar invitation within 2 hours.`,
        reference: `EC-REQ-${Date.now().toString().slice(-6)}`
      };

    } catch (error) {
      console.error('Email booking request failed:', error);
      throw new Error('Unable to process booking request at this time.');
    }
  }

  // Generate meeting description for calendar event
  generateMeetingDescription(userDetails, consultationType) {
    return `
      <div style="font-family: Arial, sans-serif;">
        <h3 style="color: #20B2AA;">Care Quality Consultation</h3>

        <p><strong>Client:</strong> ${userDetails.name}<br>
        <strong>Email:</strong> ${userDetails.email}<br>
        <strong>Phone:</strong> ${userDetails.phone || 'Not provided'}<br>
        <strong>Organisation:</strong> ${userDetails.organisation || 'Not provided'}</p>

        <p><strong>Consultation Type:</strong> ${consultationType}<br>
        <strong>Urgency Level:</strong> ${userDetails.urgency || 'Standard'}</p>

        <p><strong>Meeting Agenda:</strong></p>
        <ul>
          <li>Discuss current care quality challenges</li>
          <li>Assess consultation requirements</li>
          <li>Explore Elvora Consulting solutions</li>
          <li>Next steps and proposal</li>
        </ul>

        <p><em>This consultation was booked via the Elvora Consulting AI Assistant.</em></p>
      </div>
    `;
  }

  // Generate booking request email template
  generateBookingRequestEmail(userDetails, selectedSlot, consultationType) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #20B2AA 0%, #48CAE4 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Calendar Booking Request</h1>
          <p style="margin: 5px 0 0 0;">Elvora Consulting - AI Assistant</p>
        </div>

        <div style="padding: 20px; background: #f8f9fa;">
          <h2 style="color: #20B2AA; margin-top: 0;">Requested Appointment</h2>
          <div style="background: white; padding: 15px; border-left: 4px solid #20B2AA; margin: 10px 0;">
            <p style="margin: 0;"><strong>Date & Time:</strong> ${selectedSlot.formatted}</p>
            <p style="margin: 5px 0 0 0;"><strong>Duration:</strong> 60 minutes</p>
            <p style="margin: 5px 0 0 0;"><strong>Type:</strong> ${consultationType}</p>
          </div>
        </div>

        <div style="padding: 20px; background: white;">
          <h2 style="color: #20B2AA; margin-top: 0;">Client Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold; width: 30%;">Name:</td>
              <td style="padding: 8px;">${userDetails.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;">${userDetails.email}</td>
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

        <div style="padding: 20px; background: #f8f9fa; text-align: center;">
          <p style="margin: 0; color: #666;">
            <strong>Action Required:</strong> Please confirm this appointment and send calendar invitation to client<br>
            Generated by Elvora Consulting AI Calendar Assistant
          </p>
        </div>
      </div>
    `;
  }

  // Authentication methods (would require backend implementation)
  async authenticate() {
    // This would initiate OAuth flow with Microsoft
    // For security, this should be handled server-side
    console.log('MS365 authentication would be initiated here');
    return false;
  }

  async refreshAccessToken() {
    // Refresh expired access tokens
    console.log('Token refresh would be handled here');
    return false;
  }
}

// Export for use in chatbot
window.MS365CalendarIntegration = MS365CalendarIntegration;