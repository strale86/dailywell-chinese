// Market Configuration for different regions
export interface MarketConfig {
  language: string;
  currency: string;
  paymentMethods: string[];
  appName: string;
  domain: string;
  storeLinks: {
    googlePlay?: string;
    appStore?: string;
    xiaomi?: string;
    huawei?: string;
  };
}

export const marketConfigs: Record<string, MarketConfig> = {
  // English/Global Market
  en: {
    language: 'en',
    currency: 'USD',
    paymentMethods: ['stripe', 'paypal', 'apple-pay', 'google-pay'],
    appName: 'DailyWell',
    domain: 'dailywell.com',
    storeLinks: {
      googlePlay: 'https://play.google.com/store/apps/details?id=com.dailywell.app',
      appStore: 'https://apps.apple.com/app/dailywell/id123456789'
    }
  },

  // Serbian Market
  sr: {
    language: 'sr',
    currency: 'RSD',
    paymentMethods: ['stripe', 'paypal', 'bank-transfer'],
    appName: 'DailyWell Srbija',
    domain: 'dailywell.rs',
    storeLinks: {
      googlePlay: 'https://play.google.com/store/apps/details?id=com.dailywell.sr',
      appStore: 'https://apps.apple.com/app/dailywell-srbija/id987654321'
    }
  },

  // Chinese Market
  zh: {
    language: 'zh',
    currency: 'CNY',
    paymentMethods: ['wechat-pay', 'alipay', 'unionpay'],
    appName: '每日健康',
    domain: 'dailywell.cn',
    storeLinks: {
      xiaomi: 'https://app.mi.com/details?id=com.dailywell.zh',
      huawei: 'https://appgallery.huawei.com/app/C123456789'
    }
  }
};

// Get current market based on environment or URL
export const getCurrentMarket = (): MarketConfig => {
  // First check environment variables
  const envLanguage = import.meta.env.VITE_APP_LANGUAGE;
  if (envLanguage && marketConfigs[envLanguage]) {
    return marketConfigs[envLanguage];
  }
  
  // For development, default to Chinese
  if (import.meta.env.DEV) {
    return marketConfigs.zh;
  }
  
  // Fallback to URL detection
  const hostname = window.location.hostname;
  
  if (hostname.includes('.cn') || hostname.includes('zh')) {
    return marketConfigs.zh;
  }
  
  if (hostname.includes('.rs') || hostname.includes('sr')) {
    return marketConfigs.sr;
  }
  
  // Default to English
  return marketConfigs.en;
};

// Get market by language code
export const getMarketByLanguage = (lang: string): MarketConfig => {
  return marketConfigs[lang] || marketConfigs.en;
};
