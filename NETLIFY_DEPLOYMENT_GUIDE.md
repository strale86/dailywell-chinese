# 🚀 Netlify Deployment Guide - 3 Verzije

## 📱 **3 Različita linka za 3 tržišta:**

### **1. Engleska verzija**
- **Build komanda:** `npm run build:en`
- **URL:** `dailywell-en.netlify.app`
- **Jezik:** Engleski
- **Valuta:** USD

### **2. Srpska verzija**
- **Build komanda:** `npm run build:sr`
- **URL:** `dailywell-sr.netlify.app`
- **Jezik:** Srpski
- **Valuta:** RSD

### **3. Kineska verzija**
- **Build komanda:** `npm run build:zh`
- **URL:** `dailywell-zh.netlify.app`
- **Jezik:** Kineski
- **Valuta:** CNY

## 🎯 **Korak po korak deployment:**

### **Korak 1: Testiranje build-ova**
```bash
npm run build:en  # Engleska verzija
npm run build:sr  # Srpska verzija
npm run build:zh  # Kineska verzija
```

### **Korak 2: Netlify deployment**
1. Idite na [netlify.com](https://netlify.com)
2. Kliknite "New site from Git"
3. Izaberite GitHub repository
4. Podesite build komande za svaku verziju

### **Korak 3: 3 različita sajta**
- **dailywell-en** → `npm run build:en`
- **dailywell-sr** → `npm run build:sr`
- **dailywell-zh** → `npm run build:zh`

## 📋 **Fajlovi koji su kreirani:**

### **Environment fajlovi:**
- `env.en` - engleska verzija
- `env.sr` - srpska verzija
- `env.zh` - kineska verzija

### **Netlify konfiguracije:**
- `netlify-en.toml` - engleska verzija
- `netlify-sr.toml` - srpska verzija
- `netlify-zh.toml` - kineska verzija

### **Build skripte:**
- `npm run build:en` - engleska verzija
- `npm run build:sr` - srpska verzija
- `npm run build:zh` - kineska verzija

## ✅ **Status:**
- ✅ Build skripte kreirane
- ✅ Environment fajlovi kreirani
- ✅ Netlify konfiguracije kreirane
- ✅ Test build-ovi uspešni

**Spremno za deployment!** 🚀
