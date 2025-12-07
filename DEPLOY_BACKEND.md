# 🚀 Guide de Déploiement du Backend

Votre frontend est déjà déployé sur : **https://front-bde-miage.vercel.app**

Maintenant, déployons le backend pour que tout fonctionne !

## ⚠️ Important : SQLite et Vercel

Vercel utilise des fonctions serverless qui ne conservent pas les données entre les appels. **SQLite ne fonctionnera PAS correctement sur Vercel.**

**Solution recommandée : Utiliser Railway** (gratuit et parfait pour SQLite)

---

## Option 1 : Railway (Recommandé) ✅

### Étape 1 : Créer un compte Railway

1. Allez sur **https://railway.app**
2. Cliquez sur **"Start a New Project"**
3. Choisissez **"Login with GitHub"**
4. Autorisez Railway à accéder à votre compte GitHub

### Étape 2 : Déployer le Backend

1. Dans Railway, cliquez sur **"New Project"**
2. Sélectionnez **"Deploy from GitHub repo"**
3. Choisissez votre repository : **`sidahmed306/projet_nuitInfo_retard`**
4. Railway va créer un nouveau service automatiquement

### Étape 3 : Configurer le Root Directory

1. Cliquez sur le service créé
2. Allez dans l'onglet **"Settings"**
3. Dans **"Root Directory"**, entrez : `server`
4. Cliquez sur **"Save"**

### Étape 4 : Configurer les Variables d'Environnement

1. Toujours dans **"Settings"**, allez dans l'onglet **"Variables"**
2. Ajoutez les variables suivantes :

```
PORT=4001
JWT_SECRET=nuit-info-super-secret-jwt-key-2024-changez-moi
JWT_EXPIRES_IN=24h
NODE_ENV=production
FRONTEND_URL=https://front-bde-miage.vercel.app
```

3. Cliquez sur **"Add"** pour chaque variable

### Étape 5 : Obtenir l'URL du Backend

1. Dans l'onglet **"Settings"**, allez dans **"Networking"**
2. Cliquez sur **"Generate Domain"** (ou utilisez le domaine fourni)
3. Copiez l'URL (ex: `https://votre-app.railway.app`)
4. **Notez cette URL**, vous en aurez besoin pour le frontend

### Étape 6 : Mettre à jour le Frontend sur Vercel

1. Allez sur **https://vercel.com**
2. Sélectionnez votre projet frontend
3. Allez dans **"Settings"** → **"Environment Variables"**
4. Modifiez ou ajoutez la variable :
   - **Name** : `REACT_APP_API_URL`
   - **Value** : `https://votre-app.railway.app/api` (remplacez par votre URL Railway)
5. Cliquez sur **"Save"**
6. Allez dans **"Deployments"**
7. Cliquez sur **"..."** à côté du dernier déploiement → **"Redeploy"**

### Étape 7 : Vérifier que tout fonctionne

1. **Backend** : Visitez `https://votre-app.railway.app/api`
   - Vous devriez voir : `{"ok": true, "message": "API is running"}`

2. **Frontend** : Visitez `https://front-bde-miage.vercel.app`
   - Essayez de vous connecter ou créer un compte
   - Si ça fonctionne, c'est bon ! ✅

---

## Option 2 : Render (Alternative)

Si Railway ne fonctionne pas, vous pouvez utiliser Render :

1. Allez sur **https://render.com**
2. Créez un compte (avec GitHub)
3. Cliquez sur **"New +"** → **"Web Service"**
4. Connectez votre repository GitHub
5. Configuration :
   - **Name** : `nuit-info-backend`
   - **Root Directory** : `server`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
6. Variables d'environnement (mêmes que Railway)
7. Cliquez sur **"Create Web Service"**

---

## Option 3 : Vercel (Non recommandé pour SQLite)

⚠️ **ATTENTION** : SQLite ne fonctionnera pas correctement sur Vercel car c'est serverless.

Si vous voulez quand même essayer :

1. Sur Vercel, créez un **nouveau projet**
2. Importez le même repository
3. Configuration :
   - **Root Directory** : `server`
   - **Framework Preset** : `Other`
4. Variables d'environnement (mêmes que Railway)
5. Déployez

**Note** : Les données ne seront pas persistantes avec SQLite sur Vercel.

---

## 🔧 Configuration CORS

Le backend est déjà configuré pour accepter les requêtes depuis `https://front-bde-miage.vercel.app`.

Si vous avez d'autres URLs, ajoutez-les dans la variable `FRONTEND_URL` séparées par des virgules :
```
FRONTEND_URL=https://front-bde-miage.vercel.app,https://autre-url.com
```

---

## ✅ Checklist de Vérification

- [ ] Backend déployé sur Railway/Render
- [ ] Variables d'environnement configurées
- [ ] URL du backend obtenue
- [ ] `REACT_APP_API_URL` mis à jour dans Vercel
- [ ] Frontend redéployé sur Vercel
- [ ] Test de l'API backend : `https://votre-backend.railway.app/api` fonctionne
- [ ] Test du frontend : connexion/inscription fonctionne

---

## 🆘 Problèmes Courants

### Erreur CORS
→ Vérifiez que `FRONTEND_URL` contient bien `https://front-bde-miage.vercel.app`

### Le frontend ne peut pas se connecter au backend
→ Vérifiez que `REACT_APP_API_URL` dans Vercel est correct (doit se terminer par `/api`)

### Erreur 404 sur le backend
→ Vérifiez que l'URL se termine par `/api` (ex: `https://votre-app.railway.app/api`)

### Base de données ne fonctionne pas
→ Si vous utilisez Vercel, passez à Railway ou Render

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans Railway/Render
2. Vérifiez les logs dans Vercel
3. Testez l'API directement : `https://votre-backend.railway.app/api`

