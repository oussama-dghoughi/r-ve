# 🎬 Guide de Démonstration - Synthétiseur de Rêves

## 📋 Prérequis pour la démo

1. **Navigateur moderne** (Chrome, Firefox, Safari, Edge)
2. **Microphone** pour l'enregistrement audio
3. **Connexion Internet** pour les images placeholder

## 🚀 Démarrage de la démo

### 1. Installation et lancement
```bash
cd dream-synthesizer
npm install
npm start
```

### 2. Accès à l'application
Ouvrez votre navigateur sur : `http://localhost:3000`

## 🎯 Scénario de démonstration

### Étape 1 : Authentification
1. **Page d'accueil** : L'utilisateur arrive sur la page de connexion
2. **Inscription** : Cliquer sur l'onglet "Inscription"
   - Nom : "John Doe"
   - Email : "john@example.com"
   - Mot de passe : "password123"
3. **Connexion** : Le système simule une connexion réussie

### Étape 2 : Enregistrement d'un rêve
1. **Interface principale** : L'utilisateur voit l'interface avec deux onglets
2. **Enregistrement direct** (onglet par défaut) :
   - Cliquer sur "Commencer l'enregistrement"
   - Autoriser l'accès au microphone
   - Raconter un rêve (exemple : "J'étais dans une forêt enchantée...")
   - Cliquer sur "Arrêter l'enregistrement"
   - Écouter l'enregistrement
   - Cliquer sur "Utiliser cet enregistrement"

### Étape 3 : Traitement automatique
1. **Transcription** : L'IA simule la transcription (2 secondes)
2. **Analyse émotionnelle** : Détection de l'émotion (1.5 secondes)
3. **Génération d'image** : Création de l'image (3 secondes)
4. **Résultats affichés** : Transcription, émotion, image générée

### Étape 4 : Sauvegarde
1. **Bouton "Sauvegarder le rêve"** : Enregistre le rêve dans l'historique
2. **Confirmation** : Le formulaire se réinitialise

### Étape 5 : Consultation de l'historique
1. **Navigation** : Cliquer sur "Historique" dans le menu
2. **Liste des rêves** : Voir tous les rêves enregistrés
3. **Détails d'un rêve** : Cliquer sur une carte pour voir les détails
4. **Suppression** : Utiliser le bouton poubelle pour supprimer un rêve

### Étape 6 : Déconnexion
1. **Menu utilisateur** : Cliquer sur l'avatar en haut à droite
2. **Déconnexion** : Sélectionner "Se déconnecter"
3. **Retour à la connexion** : L'utilisateur revient à la page d'authentification

## 🎨 Fonctionnalités à démontrer

### ✅ Fonctionnalités principales
- [x] **Authentification** : Connexion/Inscription
- [x] **Enregistrement audio direct** : Via microphone
- [x] **Upload de fichiers** : Fichiers .wav/.mp3
- [x] **Transcription automatique** : Simulation IA
- [x] **Analyse émotionnelle** : Détection d'émotions
- [x] **Génération d'images** : Images placeholder
- [x] **Historique personnel** : Stockage des rêves
- [x] **Interface responsive** : Mobile et desktop

### 🎭 Animations et UX
- [x] **Animations fluides** : Framer Motion
- [x] **Indicateurs de chargement** : Progress bars
- [x] **Feedback visuel** : États d'enregistrement
- [x] **Design moderne** : Thème sombre avec gradients
- [x] **Navigation intuitive** : Menu et routing

## 🔧 Configuration pour la démo

### Variables d'environnement (optionnel)
```env
REACT_APP_DEMO_MODE=true
REACT_APP_API_TIMEOUT=2000
```

### Personnalisation des délais
Dans `src/services/dreamService.ts`, vous pouvez ajuster les délais :
```typescript
// Transcription : 2000ms
setTimeout(() => { ... }, 2000);

// Analyse émotionnelle : 1500ms
setTimeout(() => { ... }, 1500);

// Génération d'image : 3000ms
setTimeout(() => { ... }, 3000);
```

## 🎪 Script de démonstration

### Introduction (30 secondes)
"Bonjour, je vais vous présenter le Synthétiseur de Rêves, une application qui transforme vos rêves racontés en images visuelles grâce à l'intelligence artificielle."

### Démonstration (2-3 minutes)
1. **Authentification** (30s)
   - "Commençons par créer un compte utilisateur"
   - Remplir le formulaire d'inscription
   - "L'utilisateur est maintenant connecté"

2. **Enregistrement** (1m)
   - "Voici l'interface principale avec deux options d'enregistrement"
   - "Je vais utiliser l'enregistrement direct via microphone"
   - Raconter un rêve court
   - "L'enregistrement est terminé, écoutons-le"

3. **Traitement IA** (1m)
   - "L'application va maintenant traiter l'audio"
   - "Première étape : transcription automatique"
   - "Deuxième étape : analyse de l'émotion"
   - "Troisième étape : génération d'image"
   - "Voici le résultat final !"

4. **Historique** (30s)
   - "Naviguons vers l'historique pour voir tous les rêves"
   - "Chaque rêve est sauvegardé avec ses détails"
   - "Possibilité de supprimer ou consulter les détails"

### Conclusion (30 secondes)
"Cette application démontre l'intégration de plusieurs technologies IA : reconnaissance vocale, analyse de sentiment, et génération d'images. L'interface utilisateur moderne offre une expérience fluide et intuitive."

## 🐛 Dépannage

### Problèmes courants
1. **Microphone non détecté** : Vérifier les permissions du navigateur
2. **Erreur de compilation** : Vérifier les dépendances avec `npm install`
3. **Images non chargées** : Vérifier la connexion Internet
4. **Animations lentes** : Réduire les délais dans le service

### Logs de débogage
```bash
# Mode développement avec logs détaillés
npm start

# Vérifier les erreurs dans la console du navigateur
F12 > Console
```

## 📱 Compatibilité

### Navigateurs supportés
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Fonctionnalités par navigateur
- **Enregistrement audio** : Tous les navigateurs modernes
- **Permissions microphone** : HTTPS requis pour la production
- **Animations** : Support complet avec Framer Motion
- **Stockage local** : localStorage disponible partout

---

**Durée totale de la démo : 3-4 minutes**
**Niveau technique : Intermédiaire**
**Public cible : Développeurs, designers, product managers** 