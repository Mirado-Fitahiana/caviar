# Maison Caviar - Site E-commerce

Site web e-commerce de luxe pour la vente de caviar premium à Madagascar.

## 📁 Structure du Projet

```
caviar/
├── index.html              # Page principale
├── data/
│   ├── content.json       # Tous les textes du site (multilingue)
│   └── products.json      # Catalogue des produits
└── assets/
    ├── style.css          # Styles complets du site
    └── script.js          # Logique JavaScript + système e-commerce
```

## 🌐 Gestion du Contenu

Tous les textes du site sont externalisés dans des fichiers JSON pour faciliter :
- **La traduction** : Ajoutez facilement de nouvelles langues
- **La maintenance** : Modifiez les textes sans toucher au code
- **La cohérence** : Centralisez tout le contenu

### `data/content.json`
Contient tous les textes du site :
- Meta (titre, langue)
- Header et navigation
- Bannière
- Hero section
- Sections de contenu
- Footer
- Modals (produit, panier, commande)
- Notifications

### `data/products.json`
Catalogue des produits avec :
- ID unique
- Nom et description
- Images
- Catégorie et badges
- Prix par format (30g, 50g, 125g)
- Métadonnées

## 🚀 Fonctionnalités

### E-commerce
- ✅ Fiches produits détaillées avec modal
- ✅ Système de panier avec LocalStorage
- ✅ Gestion des quantités
- ✅ Formulaire de commande complet
- ✅ Calcul automatique des totaux

### Interface
- 🎨 Thème luxe (doré et bleu)
- ✨ Animations fluides partout
- 📱 Design responsive
- 🔔 Notifications toast
- 🎉 Confettis de confirmation

### Technique
- 💾 Persistance du panier (LocalStorage)
- 📊 Chargement dynamique depuis JSON
- 🎯 Modals avec animations
- 🔄 Mise à jour temps réel

## 🛠️ Utilisation

### Modifier les textes
1. Ouvrez `data/content.json`
2. Modifiez les valeurs souhaitées
3. Rechargez la page

### Modifier les produits
1. Ouvrez `data/products.json`
2. Ajoutez/modifiez les produits
3. Rechargez la page

### Ajouter une langue
1. Créez `data/content-en.json` (par exemple)
2. Copiez la structure de `content.json`
3. Traduisez les valeurs
4. Modifiez `script.js` pour charger le bon fichier selon la langue

## 💰 Prix
Tous les prix sont en **Ariary (Ar)** - Monnaie de Madagascar

## 🎯 Optimisations Futures
- [ ] Système de multi-langue dynamique
- [ ] Backend pour gérer les commandes
- [ ] Paiement en ligne
- [ ] Gestion des stocks
- [ ] Espace client

---
**Maison Caviar** - Caviar d'exception à Madagascar 🇲🇬
