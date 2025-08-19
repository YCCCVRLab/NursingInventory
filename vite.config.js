import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Make environment variables available to the client
    define: {
      'window.__ENV__': {
        SUPABASE_URL: JSON.stringify(env.SUPABASE_URL || ''),
        SUPABASE_ANON_KEY: JSON.stringify(env.SUPABASE_ANON_KEY || ''),
        USERBASE_APP_ID: JSON.stringify(env.USERBASE_APP_ID || '')
      },
      // Also define them as import.meta.env for better Vite compatibility
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.SUPABASE_ANON_KEY || ''),
      'import.meta.env.VITE_USERBASE_APP_ID': JSON.stringify(env.USERBASE_APP_ID || '')
    },
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets'
    }
  }
})