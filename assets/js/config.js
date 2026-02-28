// Configuration loader for Elvora Consulting Website
// Loads settings from config.env file
// ================================================

class ConfigLoader {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    async loadConfig() {
        try {
            // Try to fetch config from server
            const response = await fetch('/config.env');
            if (response.ok) {
                const text = await response.text();
                this.parseConfig(text);
            }
        } catch (error) {
            console.warn('Could not load config.env, using defaults');
            this.setDefaults();
        }
    }

    parseConfig(text) {
        const lines = text.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, value] = line.split('=', 2);
                if (key && value) {
                    this.config[key.trim()] = value.trim();
                }
            }
        });
    }

    setDefaults() {
        this.config = {
            RECAPTCHA_SITE_KEY: '6LfIUNErAAAAAOxuzcW052oB0aYmR54zUu8-QZLR',
            SITE_EMAIL: 'info@elvoraconsulting.co.uk',
            SITE_NAME: 'Elvora Consulting',
            ENABLE_RECAPTCHA: 'true',
            RECAPTCHA_SCORE_THRESHOLD: '0.5'
        };
    }

    get(key, defaultValue = null) {
        return this.config[key] || defaultValue;
    }

    getRecaptchaSiteKey() {
        return this.get('RECAPTCHA_SITE_KEY', '6LfIUNErAAAAAOxuzcW052oB0aYmR54zUu8-QZLR');
    }

    getSiteEmail() {
        return this.get('SITE_EMAIL', 'info@elvoraconsulting.co.uk');
    }

    getSiteName() {
        return this.get('SITE_NAME', 'Elvora Consulting');
    }

    isRecaptchaEnabled() {
        return this.get('ENABLE_RECAPTCHA', 'true') === 'true';
    }

    getRecaptchaScoreThreshold() {
        return parseFloat(this.get('RECAPTCHA_SCORE_THRESHOLD', '0.5'));
    }
}

// Create global config instance
window.ElvoraConfig = new ConfigLoader();

