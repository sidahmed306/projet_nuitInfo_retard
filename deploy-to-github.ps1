# Script PowerShell pour uploader le projet sur GitHub
# Usage: .\deploy-to-github.ps1

Write-Host "🚀 Déploiement sur GitHub" -ForegroundColor Green
Write-Host ""

# Vérifier si Git est installé
try {
    $gitVersion = git --version
    Write-Host "✅ Git installé: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git n'est pas installé. Veuillez installer Git d'abord." -ForegroundColor Red
    exit 1
}

# Vérifier si on est dans un repository Git
if (-not (Test-Path .git)) {
    Write-Host "📦 Initialisation du repository Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repository Git initialisé" -ForegroundColor Green
} else {
    Write-Host "✅ Repository Git déjà initialisé" -ForegroundColor Green
}

# Demander le nom du repository GitHub
Write-Host ""
$repoName = Read-Host "Entrez le nom de votre repository GitHub (ex: nuit-info-gamification)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "❌ Le nom du repository ne peut pas être vide" -ForegroundColor Red
    exit 1
}

# Vérifier si le remote existe déjà
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  Un remote 'origin' existe déjà: $remoteExists" -ForegroundColor Yellow
    $update = Read-Host "Voulez-vous le mettre à jour? (o/n)"
    if ($update -eq "o" -or $update -eq "O") {
        git remote set-url origin "https://github.com/sidahmed306/$repoName.git"
        Write-Host "✅ Remote mis à jour" -ForegroundColor Green
    }
} else {
    git remote add origin "https://github.com/sidahmed306/$repoName.git"
    Write-Host "✅ Remote 'origin' ajouté" -ForegroundColor Green
}

# Ajouter tous les fichiers
Write-Host ""
Write-Host "📝 Ajout des fichiers..." -ForegroundColor Yellow
git add .
Write-Host "✅ Fichiers ajoutés" -ForegroundColor Green

# Créer un commit
Write-Host ""
$commitMessage = Read-Host "Entrez le message de commit (ou appuyez sur Entrée pour 'Initial commit')"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit: Nuit de l'Info Gamification Tool"
}

git commit -m $commitMessage
Write-Host "✅ Commit créé" -ForegroundColor Green

# Définir la branche principale
Write-Host ""
Write-Host "🌿 Configuration de la branche principale..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branche principale configurée" -ForegroundColor Green

# Pousser vers GitHub
Write-Host ""
Write-Host "📤 Upload vers GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Vous devrez entrer vos identifiants GitHub" -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "✅ Projet uploadé avec succès sur GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Votre repository: https://github.com/sidahmed306/$repoName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Prochaines étapes:" -ForegroundColor Yellow
    Write-Host "   1. Allez sur https://vercel.com" -ForegroundColor White
    Write-Host "   2. Créez un nouveau projet" -ForegroundColor White
    Write-Host "   3. Importez votre repository GitHub" -ForegroundColor White
    Write-Host "   4. Suivez le guide dans GITHUB_DEPLOY.md" -ForegroundColor White
} catch {
    Write-Host ""
    Write-Host "❌ Erreur lors de l'upload. Vérifiez:" -ForegroundColor Red
    Write-Host "   - Vos identifiants GitHub" -ForegroundColor White
    Write-Host "   - Que le repository existe sur GitHub" -ForegroundColor White
    Write-Host "   - Que vous avez les permissions" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Astuce: Créez d'abord le repository sur GitHub, puis relancez ce script" -ForegroundColor Yellow
}

