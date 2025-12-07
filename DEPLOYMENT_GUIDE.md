# Guide de Déploiement Complet - GitHub et Vercel

Ce guide vous explique comment uploader votre projet sur GitHub et le déployer sur Vercel.

## 📋 Prérequis

1. Un compte [GitHub](https://github.com) (compte: `sidahmed306`)
2. Un compte [Vercel](https://vercel.com)
3. Git installé sur votre machine
4. Node.js installé

## 🚀 Étape 1 : Préparer le projet pour GitHub

### 1.1 Vérifier que Git est initialisé

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
git status
```

Si Git n'est pas initialisé, exécutez :

```bash
git init
```

### 1.2 Ajouter tous les fichiers au repository

```bash
git add .
```

### 1.3 Créer un commit initial

```bash
git commit -m "Initial commit: Nuit de l'Info Gamification Tool"
```

## 📤 Étape 2 : Uploader sur GitHub

### 2.1 Créer un nouveau repository sur GitHub

1. Allez sur [GitHub](https://github.com)
2. Connectez-vous avec votre compte `sidahmed306`
3. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
4. Donnez un nom à votre repository (ex: `nuit-info-gamification`)
5. Choisissez **Public** ou **Private**
6. **NE COCHEZ PAS** "Initialize this repository with a README" (vous avez déjà un README)
7. Cliquez sur **"Create repository"**

### 2.2 Connecter votre projet local à GitHub

GitHub vous donnera des commandes. Exécutez-les dans votre terminal :

```bash
# Remplacez VOTRE_USERNAME et VOTRE_REPO par vos valeurs
git remote add origin https://github.com/sidahmed306/VOTRE_REPO.git
git branch -M main
git push -u origin main
```

**Exemple concret :**
```bash
git remote add origin https://github.com/sidahmed306/nuit-info-gamification.git
git branch -M main
git push -u origin main
```

## 🚀 Étape 3 : Déployer sur Vercel

### 3.1 Installer Vercel CLI (optionnel mais recommandé)

```bash
npm install -g vercel
```

### 3.2 Méthode 1 : Déploiement via l'interface Vercel (Recommandé)

#### 3.2.1 Déployer le Frontend

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Cliquez sur **"Add New Project"**
3. Importez votre repository GitHub (`sidahmed306/nuit-info-gamification`)
4. Configuration du Frontend :
   - **Framework Preset** : Create React App
   - **Root Directory** : `client`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
   - **Install Command** : `npm install`
5. Variables d'environnement à ajouter :
   - **REACT_APP_API_URL** : `https://votre-backend.vercel.app/api`
   - (Vous ajouterez cette URL après avoir déployé le backend)
6. Cliquez sur **"Deploy"**

#### 3.2.2 Déployer le Backend

**⚠️ IMPORTANT :** Vercel est principalement conçu pour le frontend. Pour le backend avec SQLite, il est **fortement recommandé** d'utiliser Railway ou Render à la place. Cependant, si vous voulez utiliser Vercel :

1. Créez un **nouveau projet** sur Vercel
2. Importez le même repository
3. Configuration du Backend :
   - **Root Directory** : `server`
   - **Framework Preset** : Other
   - **Build Command** : `npm install`
   - **Output Directory** : (laisser vide)
4. Variables d'environnement :
   ```
   PORT=4001
   JWT_SECRET=votre-secret-jwt-super-securise-changez-moi
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   FRONTEND_URL=https://votre-frontend.vercel.app
   ```
5. Cliquez sur **"Deploy"**

**⚠️ Note sur SQLite et Vercel :** Vercel utilise des fonctions serverless qui ne conservent pas les données entre les appels. SQLite ne fonctionnera pas correctement sur Vercel. Pour une solution de production, utilisez Railway ou Render pour le backend.

### 3.3 Méthode 2 : Déploiement via Vercel CLI

#### 3.3.1 Déployer le Frontend

```bash
cd client
vercel
```

Suivez les instructions :
- Link to existing project? **No**
- Project name: `nuit-info-frontend` (ou votre choix)
- Directory: `./`
- Override settings? **No**

Après le déploiement, configurez les variables d'environnement :

```bash
vercel env add REACT_APP_API_URL
# Entrez l'URL de votre backend
```

#### 3.3.2 Déployer le Backend

```bash
cd server
vercel
```

Suivez les instructions et configurez les variables d'environnement.

## 🔧 Étape 4 : Configuration des URLs

### 4.1 Après le déploiement du Backend

1. Notez l'URL de votre backend (ex: `https://nuit-info-backend.vercel.app`)
2. Mettez à jour la variable `REACT_APP_API_URL` dans le frontend avec : `https://votre-backend.vercel.app/api`

### 4.2 Mettre à jour CORS dans le Backend

Dans Vercel, ajoutez la variable d'environnement `FRONTEND_URL` avec l'URL de votre frontend.

## 📝 Étape 5 : Alternative Recommandée - Railway pour le Backend

Comme mentionné, Vercel n'est pas idéal pour le backend avec SQLite. Voici comment déployer sur Railway :

### 5.1 Déployer le Backend sur Railway

1. Allez sur [Railway](https://railway.app)
2. Créez un compte et connectez votre GitHub
3. Cliquez sur **"New Project"** → **"Deploy from GitHub repo"**
4. Sélectionnez votre repository
5. Configuration :
   - **Root Directory** : `server`
   - Railway détectera automatiquement Node.js
6. Variables d'environnement :
   ```
   PORT=4001
   JWT_SECRET=votre-secret-jwt-super-securise
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   FRONTEND_URL=https://votre-frontend.vercel.app
   ```
7. Railway générera une URL (ex: `https://votre-app.railway.app`)
8. Mettez à jour `REACT_APP_API_URL` dans Vercel avec cette URL

## ✅ Vérification

1. Votre frontend devrait être accessible sur `https://votre-frontend.vercel.app`
2. Votre backend devrait être accessible sur `https://votre-backend.vercel.app/api` ou `https://votre-app.railway.app/api`
3. Testez l'API : `https://votre-backend.vercel.app/api` devrait retourner `{"ok": true, "message": "API is running"}`

## 🔄 Mises à jour futures

Pour mettre à jour votre projet :

```bash
git add .
git commit -m "Description de vos changements"
git push origin main
```

Vercel déploiera automatiquement les nouvelles versions.

## 🆘 Dépannage

### Le backend ne fonctionne pas sur Vercel

- Utilisez Railway ou Render pour le backend (recommandé)
- Vérifiez les variables d'environnement
- Consultez les logs dans le dashboard Vercel

### Erreurs CORS

- Vérifiez que `FRONTEND_URL` est correctement configuré dans le backend
- Assurez-vous que l'URL du frontend est dans la liste des origines autorisées

### Erreurs de build

- Vérifiez que toutes les dépendances sont dans `package.json`
- Consultez les logs de build dans Vercel

## 📞 Support

Pour plus d'aide, consultez :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Railway](https://docs.railway.app)

