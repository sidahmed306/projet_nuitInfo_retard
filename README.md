# Nuit de l'Info Gamification Tool

Application web complète pour gérer et améliorer l'expérience compétitive de la Nuit de l'Info avec authentification et base de données SQLite.

## Features

- 📊 **Dashboard**: Vue d'ensemble avec statistiques et leaderboard
- 👥 **Teams Management**: Créer, éditer et gérer les équipes
- 🏆 **Scores Management**: Enregistrer et suivre les scores
- 🎯 **Challenges Management**: Définir et gérer les défis
- 🎮 **Gamification**: Système de badges et réalisations
- 🔐 **Authentification**: Système de login/register sécurisé
- 💾 **SQLite**: Base de données locale persistante

## Tech Stack

- **Frontend**: React.js avec Tailwind CSS
- **Backend**: Node.js avec Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs pour le hashage des mots de passe

## Installation

1. Installer toutes les dépendances:
```bash
npm run install-all
```

2. Configurer les variables d'environnement:
```bash
cd server
# Créer un fichier .env (voir server/ENV_SETUP.md)
# Le fichier .env sera créé automatiquement au premier démarrage
```

3. Démarrer le projet (backend + frontend):
```bash
npm run dev
```

Ou démarrer séparément:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## Déploiement

### Déploiement sur Vercel

Le frontend peut être déployé sur Vercel. Voir le guide complet dans [DEPLOYMENT.md](./DEPLOYMENT.md).

**Résumé rapide** :
1. Déployer le backend sur Railway/Render (voir `DEPLOYMENT.md`)
2. Déployer le frontend sur Vercel :
   ```bash
   vercel
   ```
3. Configurer la variable d'environnement `REACT_APP_API_URL` sur Vercel avec l'URL de votre backend

## Configuration

### Variables d'environnement (server/.env)

```
PORT=4001
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

## Structure du Projet

```
nuitInfo/
├── server/
│   ├── config/
│   │   └── database.js        # Configuration SQLite
│   ├── controllers/          # Contrôleurs (auth, teams, scores, etc.)
│   ├── middleware/           # Middlewares (auth, validation, errors)
│   ├── routes/              # Routes API
│   ├── data/                # Base de données SQLite (créée automatiquement)
│   ├── index.js             # Point d'entrée serveur
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages (Dashboard, Teams, etc.)
│   │   ├── services/        # Services API
│   │   └── App.js
│   └── package.json
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Obtenir l'utilisateur actuel (protégé)

### Teams (Protégé - Admin)
- `GET /api/teams` - Liste des équipes
- `GET /api/teams/:id` - Détails d'une équipe
- `POST /api/teams` - Créer une équipe
- `PUT /api/teams/:id` - Modifier une équipe
- `DELETE /api/teams/:id` - Supprimer une équipe

### Challenges (Protégé - Admin)
- `GET /api/challenges` - Liste des défis
- `POST /api/challenges` - Créer un défi
- `PUT /api/challenges/:id` - Modifier un défi
- `DELETE /api/challenges/:id` - Supprimer un défi

### Scores (Protégé - Admin)
- `GET /api/scores` - Liste des scores
- `POST /api/scores` - Créer un score
- `PUT /api/scores/:id` - Modifier un score
- `DELETE /api/scores/:id` - Supprimer un score

### Dashboard (Protégé)
- `GET /api/dashboard/stats` - Statistiques du dashboard

## Authentification

### Rôles
- **user**: Accès en lecture seule
- **admin**: Accès complet (CRUD)

### Utilisation
1. Créer un compte via `/register`
2. Se connecter via `/login`
3. Le token JWT est stocké dans localStorage
4. Toutes les requêtes incluent automatiquement le token

## Base de données

La base de données SQLite est créée automatiquement dans `server/data/database.db` avec les tables suivantes:
- `users` - Utilisateurs
- `teams` - Équipes
- `challenges` - Défis
- `scores` - Scores

## Sécurité

- Mots de passe hashés avec bcryptjs
- JWT pour l'authentification
- Validation des données avec express-validator
- Middleware d'authentification sur toutes les routes
- Protection CSRF via CORS

## License

MIT
