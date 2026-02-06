# Paris Restaurant Map

Une application web simple en JavaScript vanilla pour découvrir les meilleurs restaurants de Paris.

## Fonctionnalités

- 🗺️ Carte interactive de Paris avec marqueurs
- 🔍 Recherche par nom et adresse
- 🍽️ Filtres par type, cuisine, budget et arrondissement
- 📑 Détails des restaurants avec images et descriptions
- 📱 Design responsive et mobile-friendly
- ⚡ Performance optimisée avec chargement paresseux

## Installation

1. Cloner ou télécharger ce dépôt
2. Lancer un serveur web local:
   ```bash
   python3 -m http.server 8000
   ```
   Ou utiliser n'importe quel serveur web
3. Ouvrir http://localhost:8000 dans votre navigateur

## Utilisation

### Recherche
- Utilisez la barre de recherche pour trouver des restaurants par nom ou adresse
- Les résultats se mettent à jour automatiquement

### Filtres
- Cliquez sur 🔍 Filtres pour ouvrir le panneau de filtrage
- Sélectionnez plusieurs options pour chaque catégorie
- Appliquez les filtres pour affiner les résultats
- Réinitialisez pour tout voir

### Carte
- Cliquez sur les marqueurs pour voir les détails
- La carte se centre sur Paris par défaut
- Les marqueurs se mettent à jour selon les filtres

### Détails
- Cliquez sur un restaurant dans la liste pour voir ses détails
- Informations complètes : adresse, métro, note, description
- Boutons d'action : appeler, directions, site web

## Structure du projet

```
paris-restaurant-map/
├── index.html          # Structure HTML principale
├── styles.css          # Styles CSS (responsive, animations)
├── app.js             # Logique JavaScript principale
├── package.json       # Configuration du projet
└── data/
    └── restaurants.json # Données des restaurants
```

## Données

L'application utilise un fichier JSON avec 10 restaurants d'exemple. Vous pouvez:
- Ajouter plus de restaurants au fichier `data/restaurants.json`
- Modifier les filtres existants
- Ajouter de nouvelles catégories

## Technologies

- **Vanilla JavaScript** - Pas de framework externe
- **Leaflet.js** - Bibliothèque légère pour les cartes
- **CSS Grid/Flexbox** - Mise en page responsive
- **LocalStorage** - Sauvegarde des préférences

## Performance

- Chargement paresseux des images
- Débouncing pour la recherche
- Minimal DOM manipulation
- CSS optimisé pour le rendu

## Compatibilité

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## Contribution

1. Forker le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter les changements (`git commit -am 'Ajout de la fonctionnalité X'`)
4. Pusher vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## Contact

Pour toute question ou suggestion, créez une issue sur le dépôt GitHub.