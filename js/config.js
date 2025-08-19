// Configuration management with environment variables
class Config {
    constructor() {
        this.config = {
            supabase: {
                url: this.getEnvVar('SUPABASE_URL'),
                key: this.getEnvVar('SUPABASE_ANON_KEY')
            },
            userbase: {
                appId: this.getEnvVar('USERBASE_APP_ID')
            }
        };
        
        this.validateConfig();
    }
    
    getEnvVar(name) {
        // In a browser environment, we'll need to inject these at build time
        // or use a build tool like Vite to handle environment variables
        if (typeof process !== 'undefined' && process.env) {
            return process.env[name];
        }
        
        // Fallback for browser - these should be injected by your build process
        const envVars = window.__ENV__ || {};
        return envVars[name];
    }
    
    validateConfig() {
        const required = [
            'supabase.url',
            'supabase.key', 
            'userbase.appId'
        ];
        
        const missing = required.filter(path => {
            const value = this.getNestedValue(this.config, path);
            return !value || value.includes('your_') || value.includes('YOUR_');
        });
        
        if (missing.length > 0) {
            console.warn('Missing or placeholder configuration values:', missing);
            this.showConfigurationHelp();
        }
    }
    
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    
    showConfigurationHelp() {
        const helpMessage = `
🔧 Configuration Setup Required

Please set up your environment variables:

1. Supabase Setup:
   - Go to https://supabase.com
   - Create a new project or use existing one
   - Go to Settings > API
   - Copy your Project URL and anon/public key

2. Userbase Setup:
   - Go to https://userbase.com
   - Create an account and new app
   - Copy your App ID

3. Update your .env file with the actual values

Need help? Check the README or contact support.
        `;
        
        console.log(helpMessage);
        
        // Show user-friendly message in UI
        if (document.getElementById('configHelp')) {
            document.getElementById('configHelp').style.display = 'block';
        }
    }
    
    get() {
        return this.config;
    }
    
    isConfigured() {
        return !this.config.supabase.url?.includes('your_') && 
               !this.config.supabase.key?.includes('your_') &&
               !this.config.userbase.appId?.includes('your_');
    }
}

// Export for use in other scripts
window.AppConfig = new Config();