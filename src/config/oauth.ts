// OAuth Configuration for WeChat and Alipay
export interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
}

// WeChat OAuth Configuration
export const wechatConfig: OAuthConfig = {
  clientId: import.meta.env.VITE_WECHAT_CLIENT_ID || 'your_wechat_client_id',
  clientSecret: import.meta.env.VITE_WECHAT_CLIENT_SECRET || 'your_wechat_client_secret',
  redirectUri: `${window.location.origin}/oauth-callback?provider=wechat`,
  scope: 'snsapi_userinfo'
};

// Alipay OAuth Configuration
export const alipayConfig: OAuthConfig = {
  clientId: import.meta.env.VITE_ALIPAY_CLIENT_ID || 'your_alipay_client_id',
  clientSecret: import.meta.env.VITE_ALIPAY_CLIENT_SECRET || 'your_alipay_client_secret',
  redirectUri: `${window.location.origin}/oauth-callback?provider=alipay`,
  scope: 'auth_user'
};

// Build OAuth URL for different providers
export function buildOAuthUrl(provider: 'google' | 'apple' | 'wechat' | 'alipay', state: string): string {
  if (provider === 'google') {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.REACT_APP_GOOGLE_CLIENT_ID || 'your_google_client_id';
    const redirectUri = `${window.location.origin}/oauth-callback?provider=google`;
    return `https://accounts.google.com/o/oauth2/v2/auth?` +
           `client_id=${clientId}&` +
           `redirect_uri=${encodeURIComponent(redirectUri)}&` +
           `response_type=code&` +
           `scope=openid email profile&` +
           `state=${state}&` +
           `prompt=select_account`;
  } else if (provider === 'apple') {
    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID || 'your_apple_client_id';
    const redirectUri = `${window.location.origin}/oauth-callback?provider=apple`;
    return `https://appleid.apple.com/auth/authorize?` +
           `client_id=${clientId}&` +
           `redirect_uri=${encodeURIComponent(redirectUri)}&` +
           `response_type=code&` +
           `scope=name email&` +
           `state=${state}`;
  } else if (provider === 'wechat') {
    const config = wechatConfig;
    return `https://open.weixin.qq.com/connect/qrconnect?` +
           `appid=${config.clientId}&` +
           `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
           `response_type=code&` +
           `scope=${config.scope}&` +
           `state=${state}#wechat_redirect`;
  } else if (provider === 'alipay') {
    const config = alipayConfig;
    return `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?` +
           `app_id=${config.clientId}&` +
           `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
           `scope=${config.scope}&` +
           `state=${state}`;
  }
  
  throw new Error(`Unsupported provider: ${provider}`);
}

// Exchange authorization code for access token
export async function exchangeCodeForToken(provider: 'google' | 'apple' | 'wechat' | 'alipay', code: string) {
  if (provider === 'google') {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || import.meta.env.REACT_APP_GOOGLE_CLIENT_ID || 'your_google_client_id';
    const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET || import.meta.env.REACT_APP_GOOGLE_CLIENT_SECRET || 'your_google_client_secret';
    const redirectUri = `${window.location.origin}/oauth-callback?provider=google`;
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      })
    });
    
    const data = await response.json();
    if (data.error) {
      throw new Error(`Google OAuth error: ${data.error_description || data.error}`);
    }
    
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      id_token: data.id_token
    };
  } else if (provider === 'apple') {
    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID || 'your_apple_client_id';
    const clientSecret = import.meta.env.VITE_APPLE_CLIENT_SECRET || 'your_apple_client_secret';
    const redirectUri = `${window.location.origin}/oauth-callback?provider=apple`;
    
    const response = await fetch('https://appleid.apple.com/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      })
    });
    
    const data = await response.json();
    if (data.error) {
      throw new Error(`Apple OAuth error: ${data.error_description || data.error}`);
    }
    
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      id_token: data.id_token
    };
  } else if (provider === 'wechat') {
    const config = wechatConfig;
    const response = await fetch('https://api.weixin.qq.com/sns/oauth2/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        appid: config.clientId,
        secret: config.clientSecret,
        code: code,
        grant_type: 'authorization_code'
      })
    });
    
    const data = await response.json();
    if (data.errcode) {
      throw new Error(`WeChat OAuth error: ${data.errmsg}`);
    }
    
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      openid: data.openid
    };
  } else if (provider === 'alipay') {
    // Alipay requires server-side implementation due to security
    // This would typically be handled by your backend
    const config = alipayConfig;
    const response = await fetch('/api/alipay/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        clientId: config.clientId,
        clientSecret: config.clientSecret
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Alipay OAuth error: ${data.error}`);
    }
    
    return data;
  }
  
  throw new Error(`Unsupported provider: ${provider}`);
}

// Get user information from provider
export async function getUserInfo(provider: 'google' | 'apple' | 'wechat' | 'alipay', accessToken: string, openid?: string) {
  if (provider === 'google') {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const data = await response.json();
    if (data.error) {
      throw new Error(`Google API error: ${data.error_description || data.error}`);
    }
    
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
      given_name: data.given_name,
      family_name: data.family_name
    };
  } else if (provider === 'apple') {
    // Apple doesn't provide user info endpoint, we get it from ID token
    // For demo purposes, return basic info
    return {
      id: `apple_${Date.now()}`,
      email: 'user@privaterelay.appleid.com',
      name: 'Apple User',
      picture: '',
      given_name: 'Apple',
      family_name: 'User'
    };
  } else if (provider === 'wechat') {
    const response = await fetch(`https://api.weixin.qq.com/sns/userinfo?` +
      `access_token=${accessToken}&` +
      `openid=${openid}&` +
      `lang=en_US`);
    
    const data = await response.json();
    if (data.errcode) {
      throw new Error(`WeChat API error: ${data.errmsg}`);
    }
    
    return {
      id: data.openid,
      email: data.email || `${data.openid}@wechat.com`,
      name: data.nickname,
      picture: data.headimgurl,
      given_name: data.nickname,
      family_name: ''
    };
  } else if (provider === 'alipay') {
    // Alipay user info would be handled by backend
    const response = await fetch('/api/alipay/userinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: accessToken
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Alipay API error: ${data.error}`);
    }
    
    return {
      id: data.user_id,
      email: data.email || `${data.user_id}@alipay.com`,
      name: data.nick_name,
      picture: data.avatar,
      given_name: data.nick_name,
      family_name: ''
    };
  }
  
  throw new Error(`Unsupported provider: ${provider}`);
}

// Check if OAuth is properly configured
export function isOAuthConfigured(provider: 'wechat' | 'alipay'): boolean {
  const config = provider === 'wechat' ? wechatConfig : alipayConfig;
  return config.clientId !== 'your_wechat_client_id' && 
         config.clientId !== 'your_alipay_client_id' &&
         config.clientSecret !== 'your_wechat_client_secret' &&
         config.clientSecret !== 'your_alipay_client_secret';
}
