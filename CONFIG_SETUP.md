# Configuration Setup Guide for Elvora Consulting Website

This guide explains how to configure the website using the centralized configuration system.

## 📁 Configuration Files

### `config.env` - Main Configuration File
This file contains all environment variables and settings for the website.

```env
# reCAPTCHA Configuration
RECAPTCHA_SITE_KEY=6LfIUNErAAAAAOxuzcW052oB0aYmR54zUu8-QZLR
RECAPTCHA_SECRET_KEY=6LfIUNErAAAAAHnCpkiel5AN-Y2r7--YegMRw48X

# Email Configuration (MS365/GoDaddy)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=Melissa@elvoraconsulting.co.uk
SMTP_PASS=#Perfume2024
SMTP_FROM=info@elvoraconsulting.co.uk
SMTP_FROM_NAME=Elvora Consulting

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Website Configuration
SITE_URL=https://elvoraconsulting.co.uk
SITE_NAME=Elvora Consulting
SITE_EMAIL=info@elvoraconsulting.co.uk

# Security
ENABLE_RECAPTCHA=true
RECAPTCHA_SCORE_THRESHOLD=0.5
```

## 🔧 How It Works

### Frontend (JavaScript)
- **`assets/js/config.js`** - Loads configuration from `config.env`
- **Dynamic loading** - Configuration is loaded when the page loads
- **Fallback values** - If config.env can't be loaded, defaults are used

### Backend (PHP)
- **`api/send-email-simple.php`** - Reads configuration from `config.env`
- **Server-side validation** - Uses config values for reCAPTCHA verification
- **Email headers** - Uses config values for email settings

## 🔑 Key Configuration Values

### reCAPTCHA Settings
- **`RECAPTCHA_SITE_KEY`** - Public key for frontend forms
- **`RECAPTCHA_SECRET_KEY`** - Private key for server verification
- **`RECAPTCHA_SCORE_THRESHOLD`** - Minimum score (0.0-1.0) to accept submissions

### Email Settings
- **`SMTP_HOST`** - Email server hostname
- **`SMTP_PORT`** - Email server port (usually 587 for TLS)
- **`SMTP_USER`** - Email authentication username
- **`SMTP_PASS`** - Email authentication password
- **`SMTP_FROM`** - From email address
- **`SMTP_FROM_NAME`** - From name for emails

### Website Settings
- **`SITE_URL`** - Full website URL
- **`SITE_NAME`** - Website name
- **`SITE_EMAIL`** - Contact email address

## 🚀 Usage Examples

### JavaScript (Frontend)
```javascript
// Get reCAPTCHA site key
const siteKey = window.ElvoraConfig.getRecaptchaSiteKey();

// Check if reCAPTCHA is enabled
if (window.ElvoraConfig.isRecaptchaEnabled()) {
    // Load reCAPTCHA
}

// Get site email
const email = window.ElvoraConfig.getSiteEmail();
```

### PHP (Backend)
```php
// Load configuration
$config = loadConfig();

// Get reCAPTCHA secret key
$secretKey = $config['RECAPTCHA_SECRET_KEY'] ?? 'default_key';

// Get email settings
$fromEmail = $config['SMTP_FROM'] ?? 'default@email.com';
```

## 🔒 Security Notes

1. **Never commit sensitive data** - Keep `config.env` out of version control
2. **Use environment variables** - On production servers, use actual environment variables
3. **Rotate keys regularly** - Change reCAPTCHA keys periodically
4. **Secure file permissions** - Ensure `config.env` has restricted access

## 📝 Updating Configuration

### To change reCAPTCHA keys:
1. Update `RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` in `config.env`
2. Restart the web server
3. Clear browser cache

### To change email settings:
1. Update SMTP settings in `config.env`
2. Test email functionality
3. Update any hardcoded references

### To add new settings:
1. Add to `config.env`
2. Update `config.js` to include the new setting
3. Update PHP files to use the new setting

## 🧪 Testing Configuration

### Test reCAPTCHA:
1. Open browser console
2. Check for reCAPTCHA loading messages
3. Submit a form and verify token generation

### Test email:
1. Use the contact form
2. Check server logs for email attempts
3. Verify emails are received

### Test configuration loading:
1. Open browser console
2. Type `window.ElvoraConfig.config` to see loaded values
3. Check for any loading errors

## 🚨 Troubleshooting

### Configuration not loading:
- Check file permissions on `config.env`
- Verify file path is correct
- Check browser console for errors

### reCAPTCHA not working:
- Verify keys are correct
- Check domain settings in Google Console
- Ensure score threshold is appropriate

### Email not sending:
- Verify SMTP credentials
- Check server email configuration
- Test with simple email client first

---

**Note:** This configuration system provides centralized management of all website settings while maintaining security and flexibility.

