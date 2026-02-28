# Microsoft 365 Calendar Integration Setup
## Complete Guide for Elvora Consulting

### 🎯 What's Already Built

**✅ Ready Features:**
- Calendar availability checking
- Automatic booking creation
- Email notifications
- Fallback email system
- Professional consultation scheduling

### 🔧 Setup Requirements

#### 1. Microsoft 365 Developer Account
1. Go to [Microsoft Azure Portal](https://portal.azure.com/)
2. Sign in with your Microsoft 365 account
3. Navigate to "Azure Active Directory" > "App registrations"
4. Click "New registration"

#### 2. App Registration Setup
**Application Details:**
- **Name:** `Elvora Consulting Calendar Integration`
- **Supported account types:** `Accounts in this organizational directory only`
- **Redirect URI:** `https://elvoraconsulting.co.uk/auth/callback`

**API Permissions:**
- `Calendars.ReadWrite` - Read and write calendar events
- `User.Read` - Read user profile
- `Mail.Send` - Send email notifications

#### 3. Configuration Values
After registration, you'll get:
- **Application (client) ID**
- **Directory (tenant) ID**
- **Client Secret** (create under "Certificates & secrets")

### 🚀 Implementation Options

#### Option A: Server-Side Integration (Recommended)
**Benefits:**
- Secure API key storage
- Better error handling
- Rate limiting control
- Professional implementation

**Setup:**
```javascript
// Server endpoint example
app.post('/api/calendar/book', async (req, res) => {
  const { userDetails, selectedSlot } = req.body;
  
  try {
    const calendar = new MS365CalendarIntegration();
    const result = await calendar.createBooking(userDetails, selectedSlot);
    res.json({ success: true, bookingId: result.id });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
});
```

#### Option B: Client-Side Integration (Quick Setup)
**For immediate testing:**
1. Update `assets/js/ms365-calendar.js`
2. Add your configuration values
3. Deploy and test

### 📋 Step-by-Step Setup

#### Step 1: Azure App Registration
1. **Create App Registration:**
   - Name: `Elvora Consulting Calendar`
   - Account type: `Single tenant`
   - Redirect URI: `https://elvoraconsulting.co.uk/auth/callback`

2. **Configure API Permissions:**
   - Add `Microsoft Graph` permissions:
     - `Calendars.ReadWrite`
     - `User.Read`
     - `Mail.Send`
   - Grant admin consent

3. **Create Client Secret:**
   - Go to "Certificates & secrets"
   - Click "New client secret"
   - Copy the secret value immediately

#### Step 2: Update Configuration
**In `assets/js/ms365-calendar.js`:**
```javascript
constructor() {
  this.clientId = 'YOUR_CLIENT_ID';
  this.tenantId = 'YOUR_TENANT_ID';
  this.redirectUri = 'https://elvoraconsulting.co.uk/auth/callback';
  // ... rest of constructor
}
```

#### Step 3: Authentication Flow
**The system will:**
1. Redirect users to Microsoft login
2. Request calendar permissions
3. Store access token securely
4. Enable calendar booking

#### Step 4: Test Integration
**Test Features:**
- Calendar availability checking
- Booking creation
- Email notifications
- Error handling

### 🔐 Security Considerations

**✅ Best Practices:**
- Store secrets server-side only
- Use HTTPS for all communications
- Implement rate limiting
- Validate all inputs
- Log access attempts

**❌ Avoid:**
- Exposing client secrets in frontend
- Storing tokens in localStorage long-term
- Allowing unlimited API calls

### 💡 Alternative: Simple Email Booking

**If MS365 setup is complex, you can use the email fallback:**

**Current Fallback System:**
- Collects user details
- Sends email to `info@elvoraconsulting.co.uk`
- Includes consultation request
- Manual calendar management

**Benefits:**
- No API setup required
- Works immediately
- Simple and reliable
- Professional email templates

### 🎯 Quick Start (Email Fallback)

**The system already works with email fallback:**

1. **User fills consultation form**
2. **AI chatbot collects details**
3. **Email sent to info@elvoraconsulting.co.uk**
4. **You manually schedule consultation**

**Email includes:**
- User contact details
- Consultation preferences
- Conversation summary
- Professional formatting

### 📊 Current Status

**✅ What's Working:**
- Consultation form collection
- AI chatbot integration
- Email notification system
- Professional email templates
- Fallback booking system

**🔧 What Needs Setup:**
- MS365 app registration
- API configuration
- Authentication flow
- Calendar permissions

### 🚀 Recommendation

**For immediate launch:**
1. **Use email fallback system** (already working)
2. **Set up MS365 integration** when ready
3. **Gradual migration** to automated booking

**The website is fully functional with email-based consultation booking!**

---

**Ready to go live with professional consultation booking via email, with MS365 calendar integration available when you're ready to set it up.**
