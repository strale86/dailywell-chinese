# 📚 GitHub Setup Vodič

## 🛠️ Opcija 1: GitHub Desktop (NAJLAKŠE)

### Koraci:
1. **Preuzmite GitHub Desktop:**
   - Otvorite [desktop.github.com](https://desktop.github.com)
   - Kliknite "Download for Windows"
   - Instalirajte aplikaciju

2. **Sign in:**
   - Otvorite GitHub Desktop
   - Kliknite "Sign in to GitHub.com"
   - Unesite vaše GitHub kredencijale

3. **Kreirajte repository:**
   - Kliknite "File" → "New Repository"
   - Popunite:
     - **Name:** `dailywell-app`
     - **Description:** `DailyWell - Wellness & Planning App`
     - **Local path:** `C:\Users\strah\Desktop\project`
     - **Public repository** (✓)
   - Kliknite "Create Repository"

4. **Upload fajlove:**
   - Svi fajlovi će se automatski pojaviti
   - Kliknite "Commit to main"
   - Unesite commit message: `Initial commit - DailyWell app`
   - Kliknite "Commit to main"

5. **Push na GitHub:**
   - Kliknite "Push origin"
   - Vaš kod je sada na GitHub-u!

---

## 💻 Opcija 2: Komandna linija (Git)

### Koraci:
```bash
# 1. Inicijalizujte Git repository
git init

# 2. Dodajte sve fajlove
git add .

# 3. Napravite prvi commit
git commit -m "Initial commit - DailyWell app"

# 4. Povežite sa GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/dailywell-app.git

# 5. Push na GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 Kreiranje GitHub Repository

### Koraci:
1. **Otvorite GitHub.com**
2. **Kliknite "+" → "New repository"**
3. **Popunite:**
   - Repository name: `dailywell-app`
   - Description: `DailyWell - Wellness & Planning App`
   - Public (✓)
   - Don't initialize with README (✗)
4. **Kliknite "Create repository"**

---

## ✅ Šta treba da upload-ujete:

Vaš projekat sadrži sve potrebne fajlove:
- ✅ `src/` - React komponente
- ✅ `public/` - PWA fajlovi
- ✅ `package.json` - zavisnosti
- ✅ `netlify.toml` - Netlify config
- ✅ `README.md` - dokumentacija

---

## 🎯 Sledeći koraci:

1. **Upload na GitHub** (koristite GitHub Desktop)
2. **Deploy na Netlify** (iz GitHub repository)
3. **Testirajte PWA** na telefonu
4. **Share-ujte link** sa prijateljima

---

## 🔗 Korisni linkovi:

- **GitHub Desktop:** [desktop.github.com](https://desktop.github.com)
- **Git Download:** [git-scm.com](https://git-scm.com)
- **GitHub:** [github.com](https://github.com)
