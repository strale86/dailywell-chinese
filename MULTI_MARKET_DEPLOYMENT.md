# 🌍 Multi-Market Deployment Guide

## 📱 **3 Različita linka za 3 tržišta:**

### **1. Englesko tržište (Globalno)**
- **URL:** `https://dailywell.com`
- **Jezik:** Engleski
- **Valuta:** USD
- **Plaćanja:** Stripe, PayPal, Apple Pay, Google Pay
- **Store:** Google Play, App Store

### **2. Srpsko tržište**
- **URL:** `https://dailywell.rs`
- **Jezik:** Srpski
- **Valuta:** RSD
- **Plaćanja:** Stripe, PayPal, Bank Transfer
- **Store:** Google Play, App Store

### **3. Kinesko tržište**
- **URL:** `https://dailywell.cn`
- **Jezik:** Kineski
- **Valuta:** CNY
- **Plaćanja:** WeChat Pay, Alipay, UnionPay
- **Store:** Xiaomi Store, Huawei App Gallery

## 🚀 **Deployment koraci:**

### **Korak 1: Netlify Deployment**
1. **Deploy na Netlify:**
   ```bash
   npm run build
   # Upload dist folder na Netlify
   ```

2. **Dobijate URL:** `https://your-app-name.netlify.app`

### **Korak 2: Custom Domains**
1. **Kupite domene:**
   - `dailywell.com` (engleski)
   - `dailywell.rs` (srpski)
   - `dailywell.cn` (kineski)

2. **Podesite u Netlify:**
   - Idite na "Domain settings"
   - Dodajte custom domene
   - Podesite DNS records

### **Korak 3: Redirects**
Netlify.toml već sadrži redirects:
- `dailywell.com` → default (engleski)
- `dailywell.rs` → `?lng=sr` (srpski)
- `dailywell.cn` → `?lng=zh` (kineski)

## 📋 **Store Links:**

### **Google Play Store:**
- **Engleski:** `https://play.google.com/store/apps/details?id=com.dailywell.app`
- **Srpski:** `https://play.google.com/store/apps/details?id=com.dailywell.sr`

### **App Store:**
- **Engleski:** `https://apps.apple.com/app/dailywell/id123456789`
- **Srpski:** `https://apps.apple.com/app/dailywell-srbija/id987654321`

### **Kineski Store-ovi:**
- **Xiaomi:** `https://app.mi.com/details?id=com.dailywell.zh`
- **Huawei:** `https://appgallery.huawei.com/app/C123456789`

## 🔧 **Konfiguracija:**

### **Market Config (`src/config/marketConfig.ts`):**
```typescript
export const marketConfigs = {
  en: { language: 'en', currency: 'USD', ... },
  sr: { language: 'sr', currency: 'RSD', ... },
  zh: { language: 'zh', currency: 'CNY', ... }
};
```

### **Prevodi:**
- `public/locales/en/translation.json`
- `public/locales/sr/translation.json`
- `public/locales/zh/translation.json`

## 💰 **Plaćanja po tržištima:**

### **Engleski:**
- Stripe (kartice)
- PayPal
- Apple Pay
- Google Pay

### **Srpski:**
- Stripe (kartice)
- PayPal
- Bank Transfer (domaće banke)

### **Kineski:**
- WeChat Pay
- Alipay
- UnionPay

## 🎯 **Korak po korak:**

1. **Deploy na Netlify** ✅
2. **Kupite domene** (dailywell.com, dailywell.rs, dailywell.cn)
3. **Podesite DNS** u Netlify
4. **Testirajte** sve 3 verzije
5. **Submit na store-ove** sa odgovarajućim linkovima

## 📞 **Support:**

- **Engleski:** support@dailywell.com
- **Srpski:** podrska@dailywell.rs
- **Kineski:** 支持@dailywell.cn
