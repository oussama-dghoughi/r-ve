# 🌙 Synthétiseur de Rêves

Une application web moderne et impressionnante qui transforme vos rêves racontés en images visuelles grâce à l'intelligence artificielle.

## ✨ Fonctionnalités

- **🎤 Enregistrement Audio** : Upload de fichiers audio (.wav/.mp3) pour raconter vos rêves
- **📝 Transcription Automatique** : Conversion de la parole en texte via IA
- **🧠 Analyse Émotionnelle** : Détection automatique de l'ambiance du rêve
- **🎨 Génération d'Images** : Création d'images basées sur le contenu et l'émotion du rêve
- **📚 Historique Personnel** : Stockage et consultation de tous vos rêves
- **🎯 Interface Moderne** : Design responsive avec animations fluides
- **Authentification** : Système de connexion sécurisé

## 🚀 Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd dream-synthesizer
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration des APIs de transcription**

   ### Option A : Hugging Face API (Recommandé - Gratuit)
   
   **Guide rapide :**
   1. Allez sur [Hugging Face](https://huggingface.co/) et créez un compte gratuit
   2. Allez dans Settings > Access Tokens
   3. Créez un nouveau token avec le rôle "Read"
   4. Copiez le token qui commence par `hf_`
   5. Collez-le dans le fichier `.env` :
   ```bash
   cp .env.example .env
   ```
   - Ajoutez votre token dans le fichier `.env` :
   ```
   REACT_APP_HUGGING_FACE_TOKEN=hf_votre_token_ici
   REACT_APP_DEMO_MODE=false
   ```
   
   **Guide détaillé :** Voir [HUGGING_FACE_SETUP.md](./HUGGING_FACE_SETUP.md)

   ### Option B : Web Speech API (Gratuit, intégré au navigateur)
   
   Aucune configuration nécessaire, fonctionne automatiquement dans Chrome/Edge.

   ### Option C : Mode Démo (Pour les tests)
   
   Laissez `REACT_APP_DEMO_MODE=true` dans le fichier `.env` pour utiliser des transcriptions simulées.

4. **Lancer l'application**
   ```bash
   npm start
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## 🛠️ Technologies Utilisées

- **React 18** - Framework frontend
- **TypeScript** - Typage statique
- **Material-UI** - Composants UI modernes
- **Framer Motion** - Animations fluides
- **React Router** - Navigation
- **Lucide React** - Icônes modernes

## 📱 Utilisation

### 1. Enregistrer un Rêve

1. Cliquez sur "Choisir un fichier audio"
2. Sélectionnez votre fichier audio (.wav ou .mp3)
3. L'application va automatiquement :
   - Transcrire votre audio
   - Analyser l'émotion
   - Générer une image
4. Cliquez sur "Sauvegarder le rêve" pour le conserver

### 2. Consulter l'Historique

1. Naviguez vers "Historique" dans le menu
2. Visualisez tous vos rêves enregistrés
3. Cliquez sur une carte pour voir les détails
4. Supprimez les rêves indésirables

## 🎨 Design

L'application utilise un design moderne avec :
- **Thème sombre** élégant
- **Gradients colorés** pour les accents
- **Animations fluides** avec Framer Motion
- **Interface responsive** pour tous les écrans
- **Icônes modernes** de Lucide React

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
REACT_APP_API_URL=your_api_url_here
```

### Personnalisation du thème

Modifiez le thème dans `src/App.tsx` pour changer les couleurs et le style.

## 📊 APIs Utilisées

### APIs Mockées (Démo)

L'application utilise actuellement des APIs mockées pour la démonstration :

- **Transcription Audio** : Simulation avec délais réalistes
- **Analyse Émotionnelle** : Détection d'émotions (joyeux, stressant, neutre, etc.)
- **Génération d'Images** : Images placeholder via Picsum Photos

### Intégration d'APIs Réelles

Pour utiliser des APIs réelles, modifiez `src/services/dreamService.ts` :

```typescript
// Exemple avec OpenAI Whisper pour la transcription
const transcriptionResponse = await fetch('/api/transcribe', {
  method: 'POST',
  body: formData
});

// Exemple avec OpenAI GPT pour l'analyse d'émotion
const emotionResponse = await fetch('/api/analyze-emotion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: transcription })
});

// Exemple avec DALL-E pour la génération d'image
const imageResponse = await fetch('/api/generate-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, emotion })
});
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Lancer les tests en mode watch
npm test -- --watch

# Générer un rapport de couverture
npm test -- --coverage
```

## 📦 Build de Production

```bash
# Construire l'application
npm run build

# Prévisualiser le build
npm run preview
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connectez votre repo GitHub à Vercel
2. Vercel détectera automatiquement React
3. Déployez en un clic

### Netlify

1. Construisez l'application : `npm run build`
2. Uploadez le dossier `build` sur Netlify

### Autres plateformes

L'application peut être déployée sur n'importe quelle plateforme supportant les applications React statiques.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

## 🎯 Roadmap

- [ ] Intégration d'APIs réelles (OpenAI, etc.)
- [ ] Support de l'enregistrement audio direct
- [ ] Génération de vidéos courtes
- [ ] Partage social des rêves
- [ ] Analyse de tendances émotionnelles
- [ ] Export des données
- [ ] Mode hors ligne
- [ ] Application mobile

---

**Développé avec ❤️ pour transformer vos rêves en réalité visuelle**
