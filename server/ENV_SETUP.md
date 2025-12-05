# Configuration des Variables d'Environnement

Créez un fichier `.env` dans le dossier `server/` avec les variables suivantes :

```env
PORT=4001
JWT_SECRET=change-this-to-a-random-secret-key-in-production
JWT_EXPIRES_IN=24h
NODE_ENV=development
FRONTEND_URL=http://localhost:4000
```

## Pour la Production

En production, configurez :

```env
PORT=4001
JWT_SECRET=votre-secret-jwt-super-securise-et-unique
JWT_EXPIRES_IN=24h
NODE_ENV=production
FRONTEND_URL=https://votre-app.vercel.app,https://votre-domaine.com
```

**Important** : 
- Changez `JWT_SECRET` par une clé aléatoire et sécurisée
- Ajoutez toutes les URLs de votre frontend dans `FRONTEND_URL` (séparées par des virgules)

