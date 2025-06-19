# 🎨 Configuration Hugging Face pour la génération d'images

Ce guide vous explique comment configurer Hugging Face pour générer des images à partir de la transcription de vos rêves.

## 📋 Prérequis

1. **Compte Hugging Face** : Créez un compte sur [Hugging Face](https://huggingface.co/)
2. **Token API** : Obtenez votre token depuis les paramètres de votre compte

## 🔑 Configuration de la clé API

### 1. Obtenir votre token Hugging Face

1. Connectez-vous à [Hugging Face](https://huggingface.co/)
2. Allez dans votre profil → Settings
3. Cliquez sur "Access Tokens"
4. Cliquez sur "New token"
5. Donnez un nom à votre token (ex: "Dream Synthesizer")
6. Sélectionnez le rôle "Read"
7. Copiez le token qui commence par "hf_"

### 2. Configurer l'application

1. Ouvrez le fichier `.env` dans le dossier `dream-synthesizer`
2. Remplacez `hf_your_token_here` par votre vraie clé API :

```env
REACT_APP_HUGGING_FACE_TOKEN=hf_votre_vrai_token_ici
REACT_APP_HUGGING_FACE_ENABLED=true
```

## 🎯 Comment ça fonctionne

### Processus de génération d'image

1. **Transcription** : AssemblyAI transcrit votre rêve en texte
2. **Analyse d'émotion** : Mistral AI analyse l'émotion du rêve
3. **Prompt amélioré** : Le texte est enrichi avec des éléments visuels basés sur l'émotion
4. **Génération** : Hugging Face génère une image avec Stable Diffusion
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
- **Stable Diffusion 2.1** : `stabilityai/stable-diffusion-2-1`
- **Qualité** : Excellente
- **Style** : Réaliste et artistique

### Modèles alternatifs
- `runwayml/stable-diffusion-v1-5`
- `CompVis/stable-diffusion-v1-4`
- `prompthero/openjourney`
- `dreamlike-art/dreamlike-diffusion-1.0`

## 🎨 Paramètres de génération

- **Résolution** : 512x512 pixels
- **Étapes d'inférence** : 30
- **Guidance scale** : 7.5
- **Timeout** : 30 secondes

## 🧪 Test de la configuration

### 1. Vérifier la disponibilité
- Ouvrez l'application
- Allez dans "Statut des APIs"
- Vérifiez que "Hugging Face" apparaît comme "Disponible"

### 2. Tester la génération
1. Enregistrez un rêve
2. Attendez la transcription et l'analyse d'émotion
3. Vérifiez que l'image est générée par Hugging Face

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

- **Hugging Face** : Gratuit avec limitations
- **Limite** : ~30,000 requêtes par mois
- **Coût estimé** : Gratuit pour un usage personnel

## 🛠️ Dépannage

### Erreur "API non disponible"
1. Vérifiez votre token API
2. Assurez-vous que `REACT_APP_HUGGING_FACE_ENABLED=true`
3. Redémarrez l'application

### Erreur "Rate limit"
- Hugging Face a des limites de requêtes
- Attendez quelques minutes entre les générations

### Erreur "Invalid token"
- Vérifiez que le token est correct
- Assurez-vous qu'il commence par "hf_"

### Image de mauvaise qualité
- Le modèle peut prendre du temps à se charger
- Relancez la génération après quelques secondes

## 🔧 Personnalisation

### Changer le modèle
Modifiez `HUGGING_FACE_CONFIG.MODEL` dans `imageService.ts` :

```typescript
MODEL: 'prompthero/openjourney' // Pour un style plus artistique
```

### Ajuster les paramètres
Modifiez les paramètres dans `generateWithHuggingFace` :

```typescript
parameters: {
  num_inference_steps: 50, // Plus d'étapes = meilleure qualité
  guidance_scale: 8.5,     // Plus de guidance = plus fidèle au prompt
  width: 768,              // Résolution plus élevée
  height: 768
}
```

## 📞 Support

- **Documentation Hugging Face** : [huggingface.co/docs](https://huggingface.co/docs)
- **Modèles disponibles** : [huggingface.co/models](https://huggingface.co/models)
- **Support** : [huggingface.co/support](https://huggingface.co/support)

---

🎉 **Votre application génère maintenant des images oniriques avec Hugging Face !** 