# Elvora Consulting Website

Professional website for Elvora Consulting - CQC Care Quality Excellence specialists.

## Project Structure

```
Elvora-Consulting-Website/
├── index.html                 # Main website page
├── privacy-policy.html        # GDPR privacy policy
├── terms-conditions.html      # Terms & conditions
├── package.json              # Node.js dependencies
├── rss-service.js            # RSS news aggregator service
├── README.md                 # This file
└── assets/
    ├── css/
    │   └── styles.css        # Main stylesheet
    ├── js/
    │   └── care-news.js      # News integration script
    └── images/              # Image assets (add team-background.jpeg here)
```

## Features

- **Professional Design**: Clean, modern layout with purple branding
- **CQC Expertise**: Specialized content for care quality compliance
- **Dynamic News**: Self-updating CQC news feed
- **GDPR Compliant**: Privacy policy and terms & conditions
- **Responsive**: Mobile-friendly design
- **SEO Optimized**: Structured data and meta tags

## Setup Instructions

1. **Add Team Background Image**:
   - Download your team image from Adobe Stock
   - Save as `team-background.jpeg` in `assets/images/` folder
   - The hero section will automatically display it as a subtle background

2. **Run the Website**:
   ```bash
   # Start local server
   python3 -m http.server 8000
   
   # Visit: http://localhost:8000
   ```

3. **Run News Service** (Optional):
   ```bash
   # Install dependencies
   npm install
   
   # Start RSS service
   node rss-service.js
   ```

## Key Sections

- **Hero**: Main landing with team background
- **About**: Melissa's expertise and credentials
- **Services**: 8 core CQC consultancy services
- **Testimonials**: Client feedback
- **FAQ**: Common questions
- **News**: Latest CQC updates
- **Contact**: Professional contact information

## Branding

- **Primary Color**: Purple (#6D276A)
- **Secondary Color**: Light Purple (#8B4A9C)
- **Typography**: Professional, readable fonts
- **Logo**: EC monogram with full company name

## Contact

- **Consultation**: Professional consultation available
- **Email**: info@elvoraconsulting.co.uk
- **Website**: Professional CQC consultancy services

---

*Built for Elvora Consulting - Transforming Care through Expert CQC Compliance*
