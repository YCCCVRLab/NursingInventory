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
        // Try multiple sources for environment variables
        
        // 1. Vite injected variables (prefixed with VITE_)
        if (typeof import.meta !== 'undefined' && import.meta.env) {
            const viteVar = import.meta.env[`VITE_${name}`] || import.meta.env[name];
            if (viteVar && viteVar !== 'undefined') {
                return viteVar;
            }
        }
        
        // 2. Build-time injected variables
        const envVars = window.__ENV__ || {};
        if (envVars[name] && envVars[name] !== 'undefined') {
            return envVars[name];
        }
        
        // 3. Process env (Node.js environments)
        if (typeof process !== 'undefined' && process.env && process.env[name]) {
            return process.env[name];
        }
        
        return undefined;
    }
    
    validateConfig() {
        const required = [
            'supabase.url',
            'supabase.key', 
            'userbase.appId'
        ];
        
        const missing = required.filter(path => {
            const value = this.getNestedValue(this.config, path);
            return !value || value.includes('your_') || value.includes('YOUR_') || value === 'undefined';
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
        const supabaseUrl = this.config.supabase.url;
        const supabaseKey = this.config.supabase.key;
        const userbaseAppId = this.config.userbase.appId;
        
        return supabaseUrl && 
               supabaseKey && 
               userbaseAppId &&
               typeof supabaseUrl === 'string' &&
               typeof supabaseKey === 'string' &&
               typeof userbaseAppId === 'string' &&
               supabaseUrl !== 'undefined' &&
               supabaseKey !== 'undefined' &&
               userbaseAppId !== 'undefined' &&
               !supabaseUrl.includes('your_') && 
               !supabaseKey.includes('your_') &&
               !userbaseAppId.includes('your_');
    }
}

// Export for use in other scripts
window.AppConfig = new Config();