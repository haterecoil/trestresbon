# GitHub Pages Configuration

## Instructions pour déployer sur GitHub Pages

### Étape 1: Créer un dépôt GitHub
1. Connectez-vous à votre compte GitHub
2. Cliquez sur "New repository"
3. Nommez-le: `paris-restaurant-map`
4. Choisissez "Public" (ou "Private" si vous préférez)
5. Ne cochez pas "Initialize with README"
6. Cliquez sur "Create repository"

### Étape 2: Pusher votre code
```bash
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/paris-restaurant-map.git
git branch -M main
git push -u origin main
```

### Étape 3: Configurer GitHub Pages
1. Allez dans les paramètres du dépôt (`Settings`)
2. Cliquez sur "Pages" dans le menu de gauche
3. Sous "Build and deployment", sélectionnez:
   - **Source**: "Deploy from a branch"
   - **Branch**: "main" (ou "gh-pages" si vous préférez)
   - **Folder**: "/ (root)"
4. Cliquez sur "Save"

### Étape 4: Configurer le workflow
Le workflow est déjà configuré dans `.github/workflows/deploy.yml`

### Étape 5: Activer GitHub Pages
1. Retournez dans "Pages" settings
2. Sous "Deploy from a branch", sélectionnez:
   - **Branch**: "main" (ou "gh-pages")
   - **Folder**: "/ (root)"
3. Cliquez sur "Save"

### Étape 6: Vérifier le déploiement
1. Le workflow se déclenche automatiquement sur chaque push
2. Allez dans l'onglet "Actions" pour voir l'état
3. Une fois déployé, vous verrez l'URL de votre site

## URL du site

Votre site sera disponible à:
```
https://VOTRE_NOM_UTILISATEUR.github.io/paris-restaurant-map/
```

## Configuration du workflow

Le workflow est configuré pour:
- Se déclencher sur chaque push vers `main`
- Installer les dépendances npm
- Copier tous les fichiers nécessaires
- Déployer sur GitHub Pages

## Fichiers déployés

Le workflow copie les fichiers suivants:
- `index.html` - Page principale
- `styles.css` - Styles CSS
- `app.js` - JavaScript principal
- `data/restaurants.json` - Données des restaurants
- `README.md` - Documentation

## Dépannage

### Problème: Le site ne s'affiche pas
- Vérifiez que le workflow s'est terminé avec succès
- Assurez-vous que les fichiers sont bien copiés
- Vérifiez les permissions du dépôt

### Problème: Les ressources ne se chargent pas
- Vérifiez les chemins relatifs dans les fichiers
- Assurez-vous que les URLs sont correctes
- Testez avec des chemins absolus si nécessaire

### Problème: Le workflow échoue
- Vérifiez les logs dans l'onglet "Actions"
- Assurez-vous que `npm install` fonctionne
- Vérifiez les permissions d'accès

## Personnalisation

Vous pouvez modifier le workflow pour:
- Changer la branche de déploiement
- Ajouter des étapes de build supplémentaires
- Configurer des variables d'environnement
- Ajouter des notifications

## Sécurité

- Le workflow utilise des permissions minimales
- Les secrets sont gérés automatiquement par GitHub
- Aucune information sensible n'est exposée