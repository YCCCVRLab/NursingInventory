import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    // Set base path for GitHub Pages deployment
    base: '/NursingInventory/',
    
    // Make environment variables available to the client
    define: {
      'window.__ENV__': {
        SUPABASE_URL: JSON.stringify(env.VITE_SUPABASE_URL || env.SUPABASE_URL || ''),
        SUPABASE_ANON_KEY: JSON.stringify(env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''),
        USERBASE_APP_ID: JSON.stringify(env.VITE_USERBASE_APP_ID || env.USERBASE_APP_ID || '')
      }
    },
    
    server: {
      port: 3000,
      open: true
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Ensure proper asset handling for GitHub Pages
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  }
})