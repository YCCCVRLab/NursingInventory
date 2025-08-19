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
        
        // 1. Vite injected variables (prefixed with VITE_) - PRIORITY
        if (typeof import.meta !== 'undefined' && import.meta.env) {
            const viteVar = import.meta.env[`VITE_${name}`];
            if (viteVar && viteVar !== 'undefined' && viteVar !== '') {
                console.log(`Found VITE_${name}:`, viteVar.substring(0, 10) + '...');
                return viteVar;
            }
            
            // Also try without VITE_ prefix
            const regularVar = import.meta.env[name];
            if (regularVar && regularVar !== 'undefined' && regularVar !== '') {
                console.log(`Found ${name}:`, regularVar.substring(0, 10) + '...');
                return regularVar;
            }
        }
        
        // 2. Build-time injected variables (for GitHub Actions)
        const envVars = window.__ENV__ || {};
        if (envVars[`VITE_${name}`] && envVars[`VITE_${name}`] !== 'undefined') {
            return envVars[`VITE_${name}`];
        }
        if (envVars[name] && envVars[name] !== 'undefined') {
            return envVars[name];
        }
        
        // 3. Process env (Node.js environments)
        if (typeof process !== 'undefined' && process.env) {
            if (process.env[`VITE_${name}`]) {
                return process.env[`VITE_${name}`];
            }
            if (process.env[name]) {
                return process.env[name];
            }
        }
        
        // 4. For development/testing - you can temporarily hardcode values here
        // REMOVE THESE BEFORE PRODUCTION!
        const developmentDefaults = {
            // Uncomment and add your values for local development:
            // 'SUPABASE_URL': 'https://your-project.supabase.co',
            // 'SUPABASE_ANON_KEY': 'your_key_here',
            // 'USERBASE_APP_ID': 'your_app_id_here'
        };
        
        if (developmentDefaults[name]) {
            console.log(`Using development default for ${name}`);
            return developmentDefaults[name];
        }
        
        console.warn(`Environment variable ${name} not found. Tried: VITE_${name}, ${name}`);
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
            return !value || 
                   value.includes('your_') || 
                   value.includes('YOUR_') || 
                   value === 'undefined' ||
                   value.includes('your-project.supabase.co') ||
                   value.includes('your_supabase_') ||
                   value.includes('your_userbase_');
        });
        
        if (missing.length > 0) {
            console.warn('Missing or placeholder configuration values:', missing);
            this.showConfigurationHelp();
        } else {
            console.log('✅ Configuration loaded successfully');
        }
    }
    
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    
    showConfigurationHelp() {
        const helpMessage = `
🔧 Configuration Setup Required

Please set up your environment variables using one of these methods:

METHOD 1: GitHub Repository Secrets (Recommended for deployment)
1. Go to your GitHub repository settings
2. Navigate to Secrets and variables → Actions
3. Add these repository secrets:
   - VITE_SUPABASE_URL = https://your-project.supabase.co
   - VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
   - VITE_USERBASE_APP_ID = your_userbase_app_id

METHOD 2: Local .env file (For local development)
1. Update your .env file with actual values:
   VITE_SUPABASE_URL=https://your-actual-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_actual_anon_key
   VITE_USERBASE_APP_ID=your_actual_app_id

METHOD 3: Development defaults (Temporary)
1. Edit js/config.js and uncomment the developmentDefaults values

Setup Instructions:
• Supabase: https://supabase.com → Settings → API
• Userbase: https://userbase.com → Create app → Copy App ID

Need help? Check the README or contact support.
        `;
        
        console.log(helpMessage);
        
        // Show user-friendly message in UI
        if (document.getElementById('configHelp')) {
            document.getElementById('configHelp').style.display = 'block';
            const helpElement = document.getElementById('configHelp');
            if (helpElement) {
                helpElement.innerHTML = `
                    <div>
                        <i class="fas fa-exclamation-triangle"></i>
                        <div>
                            <h3 class="font-bold">Configuration Required</h3>
                            <div class="text-xs mt-2">
                                <p><strong>Quick Fix:</strong> Add secrets in GitHub repository settings</p>
                                <ul class="list-disc list-inside mt-1">
                                    <li>Go to Settings → Secrets and variables → Actions</li>
                                    <li>Add: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_USERBASE_APP_ID</li>
                                    <li>Get credentials from <a href="https://supabase.com" target="_blank" class="link">Supabase</a> and <a href="https://userbase.com" target="_blank" class="link">Userbase</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }
    
    get() {
        return this.config;
    }
    
    isConfigured() {
        const supabaseUrl = this.config.supabase.url;
        const supabaseKey = this.config.supabase.key;
        const userbaseAppId = this.config.userbase.appId;
        
        const isValid = supabaseUrl && 
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
               !userbaseAppId.includes('your_') &&
               !supabaseUrl.includes('your-project.supabase.co') &&
               !supabaseKey.includes('your_supabase_') &&
               !userbaseAppId.includes('your_userbase_');
               
        console.log('Configuration status:', isValid ? '✅ Valid' : '❌ Invalid');
        return isValid;
    }
    
    // Helper method to get configuration status
    getConfigurationStatus() {
        const status = {
            supabase: {
                url: !!this.config.supabase.url && !this.config.supabase.url.includes('your_'),
                key: !!this.config.supabase.key && !this.config.supabase.key.includes('your_')
            },
            userbase: {
                appId: !!this.config.userbase.appId && !this.config.userbase.appId.includes('your_')
            }
        };
        
        console.log('Detailed configuration status:', status);
        return status;
    }
}

// Export for use in other scripts
window.AppConfig = new Config();