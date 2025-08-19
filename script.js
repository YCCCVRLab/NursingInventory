const CONFIG = {
supabase: {
url: process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL',
key: process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
},
userbase: {
appId: process.env.USERBASE_APP_ID || 'YOUR_USERBASE_APP_ID'
}
};