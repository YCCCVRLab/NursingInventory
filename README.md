# Nursing Lab Inventory Management System

A secure, user-friendly inventory management system designed specifically for nursing labs and healthcare facilities.

## 🚀 Features

- **Secure Authentication**: User-based access control with Userbase
- **Real-time Database**: Powered by Supabase for reliable data storage
- **User Isolation**: Each user can only access their own inventory data
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Advanced Search & Filtering**: Find items quickly with multiple filter options
- **Stock Level Tracking**: Visual indicators for low, medium, and high stock levels

## 🔧 Setup Instructions

### 1. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your actual credentials:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   USERBASE_APP_ID=your_userbase_app_id_here
   ```

### 2. Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Navigate to Settings > API
3. Copy your Project URL and anon/public key
4. The application will automatically create the required database table on first use

### 3. Userbase Setup

1. Go to [Userbase](https://userbase.com) and create an account
2. Create a new app in your dashboard
3. Copy your App ID from the app settings

### 4. Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔒 Security Features

- **Environment Variables**: All sensitive credentials are stored in `.env` files
- **User Authentication**: Secure login/signup with Userbase
- **Row Level Security**: Database policies ensure users only access their own data
- **No Hardcoded Secrets**: All configuration is externalized

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

## 📄 License

This project is released into the public domain under the Unlicense. See LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check that your `.env` file is properly configured
2. Verify your Supabase and Userbase credentials
3. Check the browser console for error messages
4. Ensure you have an active internet connection

## 🔄 Updates

The application automatically handles database schema creation and updates. No manual database setup is required.