# 🚀 Guide Rapide : Uploader sur GitHub et Déployer sur Vercel

## Étape 1 : Uploader sur GitHub

### 1. Ouvrir PowerShell dans le dossier du projet

```powershell
cd C:\Users\sd\Desktop\N2
```

### 2. Initialiser Git (si pas déjà fait)

```powershell
git init
```

### 3. Ajouter tous les fichiers

```powershell
git add .
```

### 4. Créer le premier commit

```powershell
git commit -m "Initial commit: Nuit de l'Info Gamification Tool"
```

### 5. Créer le repository sur GitHub

1. Allez sur https://github.com
2. Connectez-vous avec votre compte **sidahmed306**
3. Cliquez sur **"+"** → **"New repository"**
4. Nom du repository : `nuit-info-gamification` (ou votre choix)
5. Choisissez **Public** ou **Private**
6. **NE COCHEZ PAS** "Initialize with README"
7. Cliquez sur **"Create repository"**

### 6. Connecter et pousser vers GitHub

**Remplacez `VOTRE_REPO` par le nom de votre repository :**

```powershell
git remote add origin https://github.com/sidahmed306/VOTRE_REPO.git
git branch -M main
git push -u origin main
```

**Exemple :**
```powershell
git remote add origin https://github.com/sidahmed306/nuit-info-gamification.git
git branch -M main
git push -u origin main
```

Vous devrez entrer vos identifiants GitHub.

## Étape 2 : Déployer sur Vercel

### Option A : Via l'interface web (Recommandé)

#### 2.1 Déployer le Frontend

1. Allez sur https://vercel.com
2. Créez un compte ou connectez-vous
3. Cliquez sur **"Add New Project"**
4. Importez votre repository GitHub
5. Configuration :
   - **Framework Preset** : Create React App
   - **Root Directory** : `client`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
6. Variables d'environnement :
   - **REACT_APP_API_URL** : `https://votre-backend.vercel.app/api`
   - (Vous ajouterez cette URL après avoir déployé le backend)
7. Cliquez sur **"Deploy"**

#### 2.2 Déployer le Backend

**⚠️ IMPORTANT :** Pour le backend avec SQLite, utilisez **Railway** ou **Render** au lieu de Vercel (voir ci-dessous).

Si vous voulez quand même utiliser Vercel :

1. Créez un **nouveau projet** sur Vercel
2. Importez le même repository
3. Configuration :
   - **Root Directory** : `server`
   - **Framework Preset** : Other
4. Variables d'environnement :
   ```
   PORT=4001
   JWT_SECRET=votre-secret-jwt-changez-moi
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   FRONTEND_URL=https://votre-frontend.vercel.app
   ```
5. Cliquez sur **"Deploy"**

### Option B : Via Vercel CLI

```powershell
# Installer Vercel CLI
npm install -g vercel

# Déployer le frontend
cd client
vercel

# Déployer le backend
cd ../server
vercel
```

## ⚠️ Alternative Recommandée : Railway pour le Backend

Vercel n'est pas idéal pour SQLite. Utilisez Railway :

### 1. Déployer le Backend sur Railway

1. Allez sur https://railway.app
2. Créez un compte (avec GitHub)
3. Cliquez sur **"New Project"** → **"Deploy from GitHub repo"**
4. Sélectionnez votre repository
5. Configuration :
   - **Root Directory** : `server`
6. Variables d'environnement :
   ```
   PORT=4001
   JWT_SECRET=votre-secret-jwt-super-securise
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   FRONTEND_URL=https://votre-frontend.vercel.app
   ```
7. Railway générera une URL (ex: `https://votre-app.railway.app`)
8. Mettez à jour `REACT_APP_API_URL` dans Vercel avec : `https://votre-app.railway.app/api`

## ✅ Vérification

1. Frontend : `https://votre-frontend.vercel.app`
2. Backend : `https://votre-backend.vercel.app/api` ou `https://votre-app.railway.app/api`
3. Test API : Visitez `https://votre-backend.vercel.app/api` → devrait afficher `{"ok": true, "message": "API is running"}`

## 🔄 Mises à jour

Pour mettre à jour votre projet :

```powershell
git add .
git commit -m "Description des changements"
git push origin main
```

Vercel déploiera automatiquement.

## 📝 Résumé des URLs

- **GitHub Repository** : `https://github.com/sidahmed306/VOTRE_REPO`
- **Frontend Vercel** : `https://votre-frontend.vercel.app`
- **Backend Railway** : `https://votre-app.railway.app` (recommandé)
- **Backend Vercel** : `https://votre-backend.vercel.app` (non recommandé pour SQLite)

