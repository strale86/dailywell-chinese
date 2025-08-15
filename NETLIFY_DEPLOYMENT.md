# 🚀 Netlify Deployment Vodič

## 📋 Koraci za deployment:

### 1. **GitHub Repository**
1. Otvorite [GitHub](https://github.com)
2. Kreirajte novi repository: `dailywell-app`
3. Upload-ujte sve fajlove iz projekta

### 2. **Netlify Deployment**
1. Otvorite [Netlify](https://netlify.com)
2. Kliknite "New site from Git"
3. Izaberite GitHub
4. Izaberite vaš `dailywell-app` repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Kliknite "Deploy site"

### 3. **Custom Domain (opciono)**
1. U Netlify dashboard-u, idite na "Domain settings"
2. Kliknite "Add custom domain"
3. Kupite domain (npr. `dailywell.app`)
4. Ili koristite besplatni Netlify subdomain

---

## ✅ Šta je spremno:

- ✅ **PWA manifest** - `public/manifest.json`
- ✅ **Service Worker** - `public/sw.js`
- ✅ **Netlify config** - `netlify.toml`
- ✅ **SVG ikona** - `public/icon.svg`
- ✅ **Build optimizovan** - Vite build

---

## 📱 PWA funkcionalnosti:

### **Na telefonu:**
1. Otvorite vašu Netlify URL
2. Pojaviće se "Add to Home Screen"
3. Kliknite "Install"
4. Aplikacija se instalira kao native app

### **Funkcionalnosti:**
- ✅ Offline rad
- ✅ Push notifikacije
- ✅ Native app izgled
- ✅ Home screen ikona

---

## 🔧 Troubleshooting:

### **Ako build ne radi:**
```bash
# Proverite da li sve zavisnosti su instalirane
npm install

# Testirajte build lokalno
npm run build
```

### **Ako PWA ne radi:**
1. Proverite da li je HTTPS aktivan
2. Proverite browser console za greške
3. Proverite da li su svi fajlovi u `public/` folderu

---

## 🌐 Vaša aplikacija će biti dostupna na:
- **Netlify URL:** `https://your-app-name.netlify.app`
- **Custom domain:** `https://yourdomain.com` (ako kupite)

---

## 🎯 Sledeći koraci:
1. Deploy na Netlify
2. Testirajte na telefonu
3. Share-ujte link sa prijateljima
4. Razmislite o custom domain-u
