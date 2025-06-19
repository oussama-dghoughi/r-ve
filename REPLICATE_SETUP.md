# 🎨 Configuration Replicate API pour la génération d'images

Ce guide vous explique comment configurer Replicate API pour générer des images à partir de la transcription de vos rêves.

## 📋 Prérequis

1. **Compte Replicate** : Créez un compte sur [Replicate](https://replicate.com/)
2. **Token API** : Obtenez votre token depuis les paramètres de votre compte

## 🔑 Configuration de la clé API

### 1. Obtenir votre token Replicate

1. Connectez-vous à [Replicate](https://replicate.com/)
2. Cliquez sur votre **avatar** en haut à droite
3. Sélectionnez **"API tokens"**
4. Cliquez sur **"Create API token"**
5. Donnez un nom à votre token (ex: "Dream Synthesizer")
6. Copiez le token généré

### 2. Configurer l'application

1. Ouvrez le fichier `.env.local` dans le dossier `dream-synthesizer`
2. Ajoutez votre token Replicate :

```env
REACT_APP_REPLICATE_API_KEY=r8_votre_token_ici
REACT_APP_REPLICATE_ENABLED=true
```

## 🎯 Comment ça fonctionne

### Processus de génération d'image

1. **Transcription** : AssemblyAI transcrit votre rêve en texte
2. **Analyse d'émotion** : Mistral AI analyse l'émotion du rêve
3. **Prompt amélioré** : Le texte est enrichi avec des éléments visuels basés sur l'émotion
4. **Génération** : Replicate génère une image avec Stable Diffusion XL
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

## 🚀 Modèles disponibles

### Modèle principal
- **Stable Diffusion XL** : `stability-ai/sdxl`
- **Qualité** : Excellente (1024x1024)
- **Style** : Réaliste et artistique

### Modèles alternatifs
- `stability-ai/stable-diffusion`
- `ai-forever/kandinsky-2.2`
- `cjwbw/anything-v3-better-vae`

## 🎨 Paramètres de génération

- **Résolution** : 1024x1024 pixels
- **Étapes d'inférence** : 50
- **Guidance scale** : 7.5
- **Timeout** : 60 secondes
- **Negative prompt** : "blurry, low quality, distorted, ugly, bad anatomy"

## 🧪 Test de la configuration

### 1. Vérifier la disponibilité
- Ouvrez l'application
- Allez dans "Statut des APIs"
- Vérifiez que "Replicate" apparaît comme "Disponible"

### 2. Tester la génération
1. Enregistrez un rêve
2. Attendez la transcription et l'analyse d'émotion
3. Vérifiez que l'image est générée par Replicate

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

- **Replicate** : Gratuit avec 500 générations par mois
- **Limite** : 500 requêtes par mois
- **Coût estimé** : Gratuit pour un usage personnel

## 🛠️ Dépannage

### Erreur "API non disponible"
1. Vérifiez votre token API
2. Assurez-vous que `REACT_APP_REPLICATE_ENABLED=true`
3. Redémarrez l'application

### Erreur "Rate limit"
- Replicate a des limites de requêtes
- Attendez quelques minutes entre les générations

### Erreur "Invalid token"
- Vérifiez que le token est correct
- Assurez-vous qu'il commence par "r8_"

### Génération lente
- Replicate peut prendre 10-30 secondes
- C'est normal pour une génération de qualité

## 🔧 Personnalisation

### Changer le modèle
Modifiez `REPLICATE_CONFIG.MODEL` dans `imageService.ts` :

```typescript
MODEL: 'ai-forever/kandinsky-2.2' // Pour un style plus artistique
```

### Ajuster les paramètres
Modifiez les paramètres dans `generateWithReplicate` :

```typescript
input: {
  prompt: enhancedPrompt,
  width: 768,              // Résolution plus petite
  height: 768,
  num_inference_steps: 30, // Moins d'étapes = plus rapide
  guidance_scale: 8.5      // Plus de guidance = plus fidèle
}
```

## 📞 Support

- **Documentation Replicate** : [replicate.com/docs](https://replicate.com/docs)
- **Modèles disponibles** : [replicate.com/explore](https://replicate.com/explore)
- **Support** : [replicate.com/support](https://replicate.com/support)

## 🔄 Fallback automatique

Si Replicate n'est pas disponible, l'application utilise automatiquement :
1. **Hugging Face** (si configuré)
2. **Mock** (images simulées)

---

🎉 **Votre application génère maintenant des images oniriques avec Replicate !** 