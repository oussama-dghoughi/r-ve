# 🎨 Configuration Stability AI API pour la génération d'images (GRATUIT)

Ce guide vous explique comment configurer Stability AI API **gratuite** pour générer des images à partir de la transcription de vos rêves.

## 📋 Prérequis

1. **Compte Stability AI** : Créez un compte sur [Stability AI](https://platform.stability.ai/)
2. **Token API** : Obtenez votre token gratuit depuis votre compte

## 🔑 Configuration de la clé API

### 1. Obtenir votre token Stability AI GRATUIT

1. Allez sur [Stability AI Platform](https://platform.stability.ai/)
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. Créez un compte gratuit
4. Allez dans **"Account"** → **"API Keys"**
5. Cliquez sur **"Create API Key"**
6. Donnez un nom à votre clé (ex: "Dream Synthesizer")
7. Copiez votre clé API

### 2. Configurer l'application

1. Ouvrez le fichier `.env.local` dans le dossier `dream-synthesizer`
2. Ajoutez votre token Stability AI :

```env
REACT_APP_STABILITY_API_KEY=votre_token_stability_ici
REACT_APP_STABILITY_ENABLED=true
```

## 🎯 Comment ça fonctionne

### Processus de génération d'image

1. **Transcription** : AssemblyAI transcrit votre rêve en texte
2. **Analyse d'émotion** : Mistral AI analyse l'émotion du rêve
3. **Prompt amélioré** : Le texte est enrichi avec des éléments visuels basés sur l'émotion
4. **Génération** : Stability AI génère une image avec Stable Diffusion XL
5. **Résultat** : L'image est affichée dans l'application

### Amélioration automatique du prompt

Le service améliore automatiquement votre prompt avec :

**Éléments émotionnels** :
- **Joyeux** : couleurs vibrantes, éclairage lumineux, atmosphère joyeuse
- **Stressant** : atmosphère sombre, éclairage dramatique, ombres intenses
- **Mystérieux** : brouillard, ombres, atmosphère énigmatique
- **Paisible** : éclairage doux, couleurs douces, atmosphère sereine
- **Intense** : composition dynamique, couleurs audacieuses

**Éléments artistiques** :
- Qualité élevée, détaillé, artistique
- Onirique, surréaliste
- Belle composition

## 🚀 Avantages de Stability AI

### ✅ **Gratuit et généreux**
- **25 générations par mois** gratuitement
- **Qualité professionnelle**
- **Stable Diffusion XL**

### ✅ **Qualité excellente**
- Résolution 1024x1024
- Modèle Stable Diffusion XL
- Images photoréalistes

### ✅ **API stable**
- Documentation complète
- Réponse rapide
- Support professionnel

## 🎨 Paramètres de génération

- **Modèle** : Stable Diffusion XL 1024
- **Résolution** : 1024x1024 pixels
- **Étapes** : 30
- **CFG Scale** : 7
- **Style** : Photographic
- **Timeout** : 45 secondes

## 🧪 Test de la configuration

### 1. Vérifier la disponibilité
- Ouvrez l'application
- Allez dans "Statut des APIs"
- Vérifiez que "Stability AI" apparaît comme "Disponible"

### 2. Tester la génération
1. Enregistrez un rêve
2. Attendez la transcription et l'analyse d'émotion
3. Vérifiez que l'image est générée par Stability AI

### 3. Exemples de prompts

**Rêve joyeux** :
> "J'étais dans un jardin coloré avec des fleurs qui dansaient"
> 
> **Prompt amélioré** : "J'étais dans un jardin coloré avec des fleurs qui dansaient, vibrant colors, bright lighting, cheerful atmosphere, dreamy, magical, high quality, detailed, artistic, dreamlike, surreal, beautiful composition"

**Rêve mystérieux** :
> "Je marchais dans une maison ancienne avec des portes secrètes"
> 
> **Prompt amélioré** : "Je marchais dans une maison ancienne avec des portes secrètes, mysterious atmosphere, fog, shadows, enigmatic, ethereal, high quality, detailed, artistic, dreamlike, surreal, beautiful composition"

## 💰 Coûts

- **Stability AI** : **GRATUIT**
- **Limite** : 25 générations par mois
- **Coût estimé** : 0€

## 🛠️ Dépannage

### Erreur "API non disponible"
1. Vérifiez votre token API
2. Assurez-vous que `REACT_APP_STABILITY_ENABLED=true`
3. Redémarrez l'application

### Erreur "Rate limit"
- Stability AI limite à 25 générations par mois
- Attendez le mois suivant ou utilisez Hugging Face

### Erreur "Invalid token"
- Vérifiez que le token est correct
- Assurez-vous qu'il est actif dans votre compte Stability AI

### Génération lente
- Stability AI peut prendre 15-30 secondes
- C'est normal pour une génération de qualité

## 🔧 Personnalisation

### Changer les paramètres
Modifiez les paramètres dans `generateWithStability` :

```typescript
body: JSON.stringify({
  text_prompts: [{ text: enhancedPrompt, weight: 1 }],
  cfg_scale: 8,        // Plus de guidance = plus fidèle
  height: 768,          // Résolution plus petite
  width: 768,
  samples: 1,
  steps: 50,            // Plus d'étapes = meilleure qualité
  style_preset: "cinematic" // Autres styles disponibles
})
```

### Styles disponibles
- `photographic` - Photoréaliste
- `cinematic` - Cinématographique
- `anime` - Style anime
- `digital-art` - Art numérique
- `comic-book` - Style BD
- `fantasy-art` - Art fantastique

## 📞 Support

- **Platform Stability AI** : [platform.stability.ai](https://platform.stability.ai/)
- **Documentation API** : [platform.stability.ai/docs](https://platform.stability.ai/docs)
- **Support** : Via la platform Stability AI

## 🔄 Fallback automatique

Si Stability AI n'est pas disponible, l'application utilise automatiquement :
1. **Hugging Face** (si configuré)
2. **Mock** (images simulées)

## 🎯 Alternatives gratuites

Si vous voulez plus de générations gratuites :

### 1. **Hugging Face** (Déjà configuré)
- ✅ Illimité (avec limitations techniques)
- ✅ Plusieurs modèles

### 2. **Leonardo.ai**
- ✅ 150 générations gratuites par jour
- ✅ Interface web + API

### 3. **DeepAI**
- ✅ 5 générations gratuites par jour
- ✅ API simple

## 📊 Comparaison des options gratuites

| Service | Gratuit | Limite | Qualité | Facilité |
|---------|---------|--------|---------|----------|
| **Stability AI** | ✅ 100% | 25/mois | Excellente | Simple |
| **Hugging Face** | ✅ 100% | Illimité | Variable | Moyenne |
| **Leonardo.ai** | ✅ 100% | 150/jour | Excellente | Complexe |

---

🎉 **Votre application génère maintenant des images oniriques avec Stability AI GRATUIT !** 