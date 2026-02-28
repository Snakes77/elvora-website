# reCAPTCHA Setup Guide for Elvora Consulting

This guide will help you set up Google reCAPTCHA v3 to protect your consultation form from spam and bot attacks.

## 🚀 Why reCAPTCHA is Important

- **Prevents spam** - Bots can't submit fake consultation requests
- **Protects your time** - No need to filter through spam emails
- **Professional appearance** - Shows you take security seriously
- **Required for business** - Industry standard for contact forms

## 📋 Step 1: Get reCAPTCHA Keys

1. **Go to Google reCAPTCHA:** Visit [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. **Sign in** with your Google account
3. **Click "+" to create a new site**
4. **Fill in the details:**
   - **Label:** Elvora Consulting Website
   - **reCAPTCHA type:** reCAPTCHA v3
   - **Domains:** 
     - `elvoraconsulting.co.uk`
     - `localhost` (for testing)
     - `127.0.0.1` (for testing)
5. **Accept the Terms of Service**
6. **Click Submit**

## 🔑 Step 2: Get Your Keys

After creating the site, you'll get:
- **Site Key** (public) - starts with `6Lf...`
- **Secret Key** (private) - starts with `6Lf...`

## 🔧 Step 3: Update Your Website

### Update HTML (index.html)
Replace `6LfYourSiteKeyHere` with your actual Site Key:

```html
<!-- Google reCAPTCHA v3 -->
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_ACTUAL_SITE_KEY"></script>
```

### Update JavaScript (ai-chatbot.js)
Replace `6LfYourSiteKeyHere` with your actual Site Key:

```javascript
this.recaptchaSiteKey = 'YOUR_ACTUAL_SITE_KEY';
```

### Update PHP (api/send-email-simple.php)
Replace `6LfYourSecretKeyHere` with your actual Secret Key:

```php
$recaptchaSecret = 'YOUR_ACTUAL_SECRET_KEY';
```

## 🧪 Step 4: Test reCAPTCHA

1. **Upload your files** to Hostinger
2. **Visit your website** at `https://elvoraconsulting.co.uk`
3. **Open the chatbot** and try to submit a consultation request
4. **Check the browser console** for reCAPTCHA messages
5. **Verify emails are sent** to info@elvoraconsulting.co.uk

## 🔍 Step 5: Monitor reCAPTCHA

1. **Go to reCAPTCHA Admin Console**
2. **Click on your site**
3. **Check the "Analytics" tab** to see:
   - Number of requests
   - Success rate
   - Score distribution

## ⚙️ reCAPTCHA v3 Settings

- **Score Threshold:** 0.5 (adjustable)
  - 1.0 = Very likely human
  - 0.0 = Very likely bot
  - 0.5 = Balanced (recommended)

## 🚨 Troubleshooting

### reCAPTCHA not loading
- Check if Site Key is correct
- Verify domain is added to reCAPTCHA console
- Check browser console for errors

### Verification failing
- Check if Secret Key is correct
- Verify score threshold (try lowering to 0.3)
- Check PHP error logs

### Emails not sending
- Verify SMTP credentials are correct
- Check if reCAPTCHA verification is passing
- Test without reCAPTCHA first

## 📞 Support

If you need help:
1. Check Google reCAPTCHA documentation
2. Verify your keys are correct
3. Test with different score thresholds
4. Contact support if issues persist

---

**Important:** Never share your Secret Key publicly. Keep it secure and only use it server-side.
