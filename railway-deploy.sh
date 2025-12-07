#!/bin/bash
# Script pour déployer sur Railway
# Ce fichier est juste pour référence - Railway détecte automatiquement Node.js

echo "🚀 Déploiement sur Railway"
echo ""
echo "1. Allez sur https://railway.app"
echo "2. Créez un nouveau projet"
echo "3. Sélectionnez 'Deploy from GitHub repo'"
echo "4. Choisissez votre repository"
echo "5. Configurez Root Directory: server"
echo "6. Ajoutez les variables d'environnement"
echo ""
echo "Variables d'environnement nécessaires:"
echo "  PORT=4001"
echo "  JWT_SECRET=nuit-info-super-secret-jwt-key-2024"
echo "  JWT_EXPIRES_IN=24h"
echo "  NODE_ENV=production"
echo "  FRONTEND_URL=https://front-bde-miage.vercel.app"
echo ""
echo "✅ Suivez le guide dans DEPLOY_BACKEND.md"

