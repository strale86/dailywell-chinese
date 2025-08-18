# OAuth Setup Instructions

## Overview
This application supports OAuth authentication with Google, Apple, WeChat, and Alipay. Follow these instructions to set up each provider.

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret

# Apple OAuth
REACT_APP_APPLE_CLIENT_ID=your_apple_client_id
REACT_APP_APPLE_CLIENT_SECRET=your_apple_client_secret

# WeChat OAuth
REACT_APP_WECHAT_APP_ID=your_wechat_app_id
REACT_APP_WECHAT_APP_SECRET=your_wechat_app_secret

# Alipay OAuth
REACT_APP_ALIPAY_APP_ID=your_alipay_app_id
REACT_APP_ALIPAY_PRIVATE_KEY=your_alipay_private_key
```

## Google OAuth Setup

### 1. Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google OAuth2 API

### 2. Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for development)
   - `https://yourdomain.com/auth/callback` (for production)
5. Copy Client ID and Client Secret

### 3. Update Environment Variables
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Apple OAuth Setup

### 1. Apple Developer Account
1. Go to [Apple Developer](https://developer.apple.com/)
2. Sign in with your Apple ID
3. Go to "Certificates, Identifiers & Profiles"

### 2. Create App ID
1. Go to "Identifiers" > "App IDs"
2. Click "+" to create new App ID
3. Choose "App" and fill in details
4. Enable "Sign In with Apple" capability
5. Save and note the Bundle ID

### 3. Create Service ID
1. Go to "Identifiers" > "Services IDs"
2. Click "+" to create new Service ID
3. Choose "Services" and fill in details
4. Enable "Sign In with Apple" capability
5. Configure domains and redirect URLs

### 4. Update Environment Variables
```env
REACT_APP_APPLE_CLIENT_ID=your_service_id
REACT_APP_APPLE_CLIENT_SECRET=your_private_key
```

## WeChat OAuth Setup

### 1. WeChat Open Platform
1. Go to [WeChat Open Platform](https://open.weixin.qq.com/)
2. Register as a developer
3. Create a new application

### 2. Configure App Settings
1. Go to "开发" > "接口权限"
2. Enable "网页授权"
3. Add authorized domains
4. Note the AppID and AppSecret

### 3. Update Environment Variables
```env
REACT_APP_WECHAT_APP_ID=your_wechat_app_id
REACT_APP_WECHAT_APP_SECRET=your_wechat_app_secret
```

## Alipay OAuth Setup

### 1. Alipay Open Platform
1. Go to [Alipay Open Platform](https://open.alipay.com/)
2. Register as a developer
3. Create a new application

### 2. Configure App Settings
1. Go to "应用管理" > "应用详情"
2. Enable "网页授权"
3. Add authorized redirect URIs
4. Generate RSA key pair
5. Note the AppID and Private Key

### 3. Update Environment Variables
```env
REACT_APP_ALIPAY_APP_ID=your_alipay_app_id
REACT_APP_ALIPAY_PRIVATE_KEY=your_rsa_private_key
```

## Testing OAuth

### Development
1. Start the development server: `npm run dev`
2. Navigate to login/signup page
3. Click on any OAuth button
4. Complete the OAuth flow

### Production
1. Deploy to your hosting platform
2. Update redirect URIs in all OAuth providers
3. Set environment variables in your hosting platform
4. Test OAuth flows

## Security Notes

1. **Never commit `.env` files** to version control
2. **Use HTTPS** in production for all OAuth flows
3. **Validate tokens** on your backend
4. **Implement proper error handling**
5. **Use state parameters** to prevent CSRF attacks

## Troubleshooting

### Common Issues

1. **Redirect URI mismatch**
   - Ensure redirect URIs match exactly in OAuth provider settings
   - Check for trailing slashes and protocol (http vs https)

2. **CORS errors**
   - Add your domain to authorized origins in OAuth provider settings
   - Ensure proper CORS headers on your backend

3. **Invalid client ID/secret**
   - Double-check environment variables
   - Ensure you're using the correct credentials for each environment

4. **Popup blocked**
   - Ensure popup blockers are disabled
   - Use user gesture to trigger OAuth popup

### Debug Mode
Enable debug logging by setting:
```env
REACT_APP_DEBUG_OAUTH=true
```

This will log OAuth flow details to the console.

## Backend Integration

For production use, you should implement a backend to:
1. Exchange authorization codes for access tokens
2. Validate tokens
3. Store user data securely
4. Handle token refresh

The current implementation includes fallback mock data for demonstration purposes.






