# 📱 DailyWell - Multi-Market Deployment

## 🌍 **3 Verzije aplikacije za 3 tržišta**

### **Engleska verzija (Globalno)**
- **URL:** `dailywell-en.netlify.app`
- **Jezik:** Engleski
- **Valuta:** USD ($)
- **Plaćanja:** Stripe, PayPal, Apple Pay, Google Pay
- **Store:** Google Play, App Store

### **Srpska verzija**
- **URL:** `dailywell-sr.netlify.app`
- **Jezik:** Srpski
- **Valuta:** RSD (dinari)
- **Plaćanja:** Stripe, PayPal, Bank Transfer
- **Store:** Google Play, App Store

### **Kineska verzija**
- **URL:** `dailywell-zh.netlify.app`
- **Jezik:** Kineski
- **Valuta:** CNY (juan)
- **Plaćanja:** WeChat Pay, Alipay, UnionPay
- **Store:** Xiaomi Store, Huawei App Gallery

## 🚀 **Kako deploy-ovati:**

### **1. Engleska verzija**
```bash
# Build
npm run build:en

# Deploy na Netlify
# - Idite na netlify.com
# - "New site from Git"
# - Build command: npm run build:en
# - Publish directory: dist
```

### **2. Srpska verzija**
```bash
# Build
npm run build:sr

# Deploy na Netlify
# - "New site from Git"
# - Build command: npm run build:sr
# - Publish directory: dist
```

### **3. Kineska verzija**
```bash
# Build
npm run build:zh

# Deploy na Netlify
# - "New site from Git"
# - Build command: npm run build:zh
# - Publish directory: dist
```

## 📋 **Fajlovi:**

### **Environment fajlovi:**
- `env.en` - engleska konfiguracija
- `env.sr` - srpska konfiguracija
- `env.zh` - kineska konfiguracija

### **Netlify konfiguracije:**
- `netlify-en.toml` - engleska verzija
- `netlify-sr.toml` - srpska verzija
- `netlify-zh.toml` - kineska verzija

### **Prevodi:**
- `public/locales/en/translation.json`
- `public/locales/sr/translation.json`
- `public/locales/zh/translation.json`

## ✅ **Sve je spremno za deployment!**
