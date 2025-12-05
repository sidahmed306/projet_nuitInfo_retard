# Guide de Déploiement sur Vercel

Ce guide explique comment déployer l'application Nuit de l'Info sur Vercel.

## Architecture

- **Frontend (React)** : Déployé sur Vercel
- **Backend (Node.js/Express)** : À déployer séparément (Railway, Render, Heroku, etc.)

## Prérequis

1. Un compte [Vercel](https://vercel.com)
2. Un compte pour héberger le backend (Railway, Render, etc.)
3. Git installé et le projet poussé sur GitHub/GitLab/Bitbucket

## Étape 1 : Déployer le Backend

### Option A : Railway (Recommandé)

1. Allez sur [Railway](https://railway.app)
2. Créez un nouveau projet depuis GitHub
3. Sélectionnez le dossier `server`
4. Configurez les variables d'environnement :
   ```
   PORT=4001
   JWT_SECRET=votre-secret-jwt-super-securise
   JWT_EXPIRES_IN=24h
   NODE_ENV=production
   ```
5. Railway détectera automatiquement Node.js et installera les dépendances
6. Notez l'URL de votre backend (ex: `https://votre-app.railway.app`)

### Option B : Render

1. Allez sur [Render](https://render.com)
2. Créez un nouveau "Web Service"
3. Connectez votre repository GitHub
4. Configuration :
   - **Root Directory** : `server`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Environment** : Node
5. Ajoutez les variables d'environnement (voir ci-dessus)
6. Notez l'URL de votre backend

## Étape 2 : Déployer le Frontend sur Vercel

### Méthode 1 : Via l'interface Vercel

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub
4. Configuration :
   - **Framework Preset** : Create React App
   - **Root Directory** : `client`
   - **Build Command** : `npm run build`
   - **Output Directory** : `build`
5. Ajoutez les variables d'environnement :
   - **REACT_APP_API_URL** : L'URL de votre backend (ex: `https://votre-app.railway.app/api`)
6. Cliquez sur "Deploy"

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## Étape 3 : Configuration des Variables d'Environnement

### Sur Vercel (Frontend)

Dans le dashboard Vercel, allez dans **Settings > Environment Variables** et ajoutez :

```
REACT_APP_API_URL=https://votre-backend-url.com/api
```

**Important** : Remplacez `https://votre-backend-url.com` par l'URL réelle de votre backend.

### Sur Railway/Render (Backend)

Assurez-vous d'avoir configuré :

```
PORT=4001
JWT_SECRET=votre-secret-jwt-super-securise-changez-moi
JWT_EXPIRES_IN=24h
NODE_ENV=production
```

## Étape 4 : Configuration CORS

Le backend doit autoriser les requêtes depuis votre domaine Vercel. Vérifiez que dans `server/index.js`, CORS est configuré pour accepter votre domaine Vercel :

```javascript
app.use(cors({
  origin: [
    'http://localhost:4000',
    'https://votre-app.vercel.app'
  ],
  credentials: true
}));
```

## Étape 5 : Vérification

1. Visitez votre URL Vercel (ex: `https://votre-app.vercel.app`)
2. Testez la connexion :
   - Créez un compte
   - Connectez-vous
   - Créez une équipe
   - Vérifiez que tout fonctionne

## Dépannage

### Erreur CORS

Si vous voyez des erreurs CORS, ajoutez votre domaine Vercel dans la configuration CORS du backend.

### Erreur 404 sur les routes

Vercel doit rediriger toutes les routes vers `index.html` pour que React Router fonctionne. C'est déjà configuré dans `vercel.json`.

### Variables d'environnement non chargées

- Vérifiez que les variables commencent par `REACT_APP_`
- Redéployez après avoir ajouté des variables
- Les variables sont injectées au moment du build

### Backend non accessible

- Vérifiez que le backend est bien déployé et en ligne
- Vérifiez l'URL dans `REACT_APP_API_URL`
- Testez l'URL du backend directement dans le navigateur

## Commandes Utiles

```bash
# Déployer sur Vercel
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Voir les variables d'environnement
vercel env ls
```

## Support

Pour plus d'aide :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Railway](https://docs.railway.app)
- [Documentation Render](https://render.com/docs)

