# Nursing Lab Inventory Management System

A secure, user-friendly inventory management system designed specifically for nursing labs and healthcare facilities.

## 🌐 Live Demo

**Deployed at:** [https://yccvrlab.github.io/NursingInventory/](https://yccvrlab.github.io/NursingInventory/)

*Note: You'll need to set up your own Supabase and Userbase accounts to use the application.*

## 🚀 Features

- **Secure Authentication**: User-based access control with Userbase
- **Real-time Database**: Powered by Supabase for reliable data storage
- **User Isolation**: Each user can only access their own inventory data
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Advanced Search & Filtering**: Find items quickly with multiple filter options
- **Stock Level Tracking**: Visual indicators for low, medium, and high stock levels

## 🔧 Setup Instructions

### Method 1: GitHub Repository Secrets (Recommended for Deployment)

1. **Add Repository Secrets:**
   - Go to `Settings` → `Secrets and variables` → `Actions`
   - Add these secrets:
     - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
     - `VITE_SUPABASE_ANON_KEY` = `your_supabase_anon_key`
     - `VITE_USERBASE_APP_ID` = `your_userbase_app_id`

2. **Enable GitHub Pages:**
   - Go to `Settings` → `Pages`
   - Set Source to "GitHub Actions"
   - The app will automatically deploy to `https://yourusername.github.io/NursingInventory/`

### Method 2: Local Development

1. **Environment Configuration:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file with your actual credentials:**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_USERBASE_APP_ID=your_userbase_app_id_here
   ```

3. **Running the Application:**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev

   # Build for production
   npm run build
   ```

## 🔑 Service Setup

### Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key
4. The application will automatically create the required database table on first use

### Userbase Setup

1. Go to [Userbase](https://userbase.com) and create an account
2. Create a new app in your dashboard
3. Copy your App ID from the app settings

## 🔒 Security Features

- **Environment Variables**: All sensitive credentials are stored securely
- **User Authentication**: Secure login/signup with Userbase
- **Row Level Security**: Database policies ensure users only access their own data
- **No Hardcoded Secrets**: All configuration is externalized
- **GitHub Secrets**: Production deployment uses encrypted repository secrets

## 📱 Usage

1. **First Time Setup**: Create an account or sign in
2. **Add Items**: Use the form to add inventory items with details
3. **Search & Filter**: Use the search bar and filters to find specific items
4. **Edit/Delete**: Click on items to edit or remove them
5. **Stock Monitoring**: Visual indicators show stock levels at a glance

## 🛠️ Development

The application uses:
- **Frontend**: Vanilla JavaScript with Tailwind CSS and DaisyUI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Userbase
- **Build Tool**: Vite
- **Deployment**: GitHub Actions + GitHub Pages

## 🚀 Deployment

This project is set up for automatic deployment:

- **Push to main branch** → Automatically builds and deploys
- **Uses GitHub repository secrets** for secure credential management
- **Deploys to GitHub Pages** for free hosting
- **No manual deployment needed** once secrets are configured

## 📄 License

This project is released into the public domain under the Unlicense. See LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check that your repository secrets are properly configured
2. Verify your Supabase and Userbase credentials
3. Check the GitHub Actions logs for deployment issues
4. Check the browser console for error messages
5. Ensure you have an active internet connection

## 🔄 Updates

The application automatically handles database schema creation and updates. No manual database setup is required.