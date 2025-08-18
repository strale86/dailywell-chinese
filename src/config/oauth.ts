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
export function buildOAuthUrl(provider: 'wechat' | 'alipay', state: string): string {
  const config = provider === 'wechat' ? wechatConfig : alipayConfig;
  
  if (provider === 'wechat') {
    return `https://open.weixin.qq.com/connect/qrconnect?` +
           `appid=${config.clientId}&` +
           `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
           `response_type=code&` +
           `scope=${config.scope}&` +
           `state=${state}#wechat_redirect`;
  } else if (provider === 'alipay') {
    return `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?` +
           `app_id=${config.clientId}&` +
           `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
           `scope=${config.scope}&` +
           `state=${state}`;
  }
  
  throw new Error(`Unsupported provider: ${provider}`);
}

// Exchange authorization code for access token
export async function exchangeCodeForToken(provider: 'wechat' | 'alipay', code: string) {
  const config = provider === 'wechat' ? wechatConfig : alipayConfig;
  
  if (provider === 'wechat') {
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
export async function getUserInfo(provider: 'wechat' | 'alipay', accessToken: string, openid?: string) {
  if (provider === 'wechat') {
    const response = await fetch(`https://api.weixin.qq.com/sns/userinfo?` +
      `access_token=${accessToken}&` +
      `openid=${openid}&` +
      `lang=zh_CN`);
    
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
