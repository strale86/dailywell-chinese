// OAuth Configuration
export const oauthConfig = {
  google: {
    clientId: '422122756546-5f1e19u72jdimb8n1nftcd5qj2s7uesu.apps.googleusercontent.com',
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET',
    redirectUri: 'https://astonishing-eclair-127d8d.netlify.app/',
    scope: 'openid email profile',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
  },
  
  apple: {
    clientId: import.meta.env.VITE_APPLE_CLIENT_ID || 'YOUR_APPLE_CLIENT_ID',
    clientSecret: import.meta.env.VITE_APPLE_CLIENT_SECRET || 'YOUR_APPLE_CLIENT_SECRET',
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: 'name email',
    authUrl: 'https://appleid.apple.com/auth/authorize',
    tokenUrl: 'https://appleid.apple.com/auth/token',
    responseMode: 'form_post'
  },
  
  wechat: {
    appId: import.meta.env.VITE_WECHAT_APP_ID || 'YOUR_WECHAT_APP_ID',
    appSecret: import.meta.env.VITE_WECHAT_APP_SECRET || 'YOUR_WECHAT_APP_SECRET',
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: 'snsapi_login',
    authUrl: 'https://open.weixin.qq.com/connect/qrconnect',
    tokenUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token',
    userInfoUrl: 'https://api.weixin.qq.com/sns/userinfo'
  }
};

// OAuth URL Builder
export const buildOAuthUrl = (provider: keyof typeof oauthConfig, state?: string) => {
  const config = oauthConfig[provider];
  
  switch (provider) {
    case 'google':
      return `${config.authUrl}?` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(config.scope)}&` +
        `access_type=offline&` +
        `prompt=consent&` +
        `state=${state || 'google_login'}`;
        
    case 'apple':
      return `${config.authUrl}?` +
        `client_id=${config.clientId}&` +
        `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(config.scope)}&` +
        `response_mode=${config.responseMode}&` +
        `state=${state || 'apple_login'}`;
        
    case 'wechat':
      return `${config.authUrl}?` +
        `appid=${config.appId}&` +
        `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
        `response_type=code&` +
        `scope=${config.scope}&` +
        `state=${state || 'wechat_login'}#wechat_redirect`;
        
    default:
      throw new Error(`Unsupported OAuth provider: ${provider}`);
  }
};

// OAuth Token Exchange
export const exchangeCodeForToken = async (provider: keyof typeof oauthConfig, code: string) => {
  const config = oauthConfig[provider];
  
  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      client_secret: config.clientSecret || config.appSecret || '',
    })
  });
  
  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.statusText}`);
  }
  
  return response.json();
};

// Get User Info
export const getUserInfo = async (provider: keyof typeof oauthConfig, accessToken: string) => {
  const config = oauthConfig[provider];
  
  const response = await fetch(config.userInfoUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get user info: ${response.statusText}`);
  }
  
  return response.json();
};
