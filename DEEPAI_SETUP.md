# 🎨 Configuration DeepAI API pour la génération d'images (GRATUIT)

Ce guide vous explique comment configurer DeepAI API **gratuite** pour générer des images à partir de la transcription de vos rêves.

## 📋 Prérequis

1. **Compte DeepAI** : Créez un compte sur [DeepAI](https://deepai.org/)
2. **Token API** : Obtenez votre token gratuit depuis votre compte

## 🔑 Configuration de la clé API

### 1. Obtenir votre token DeepAI GRATUIT

1. Allez sur [DeepAI](https://deepai.org/)
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. Créez un compte gratuit
4. Allez dans **"API"** dans le menu
5. Cliquez sur **"Get API Key"**
6. Copiez votre clé API

### 2. Configurer l'application

1. Ouvrez le fichier `.env.local` dans le dossier `dream-synthesizer`
2. Ajoutez votre token DeepAI :

```env
REACT_APP_DEEPAI_API_KEY=votre_token_deepai_ici
REACT_APP_DEEPAI_ENABLED=true
```

## 🎯 Comment ça fonctionne

### Processus de génération d'image

1. **Transcription** : AssemblyAI transcrit votre rêve en texte
2. **Analyse d'émotion** : Mistral AI analyse l'émotion du rêve
3. **Prompt amélioré** : Le texte est enrichi avec des éléments visuels basés sur l'émotion
4. **Génération** : DeepAI génère une image avec son modèle Text2Img
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

## 🚀 Avantages de DeepAI

### ✅ **100% Gratuit**
- **5 générations par jour** gratuitement
- **Pas de limite de temps**
- **Pas de carte de crédit requise**

### ✅ **Simple à utiliser**
- API REST simple
- Réponse rapide
- Pas de polling nécessaire

### ✅ **Qualité correcte**
- Modèle Text2Img stable
- Images cohérentes
- Résolution standard

## 🎨 Paramètres de génération

- **Modèle** : Text2Img
- **Résolution** : Standard (variable selon le modèle)
- **Timeout** : 30 secondes
- **Format** : URL directe vers l'image

## 🧪 Test de la configuration

### 1. Vérifier la disponibilité
- Ouvrez l'application
- Allez dans "Statut des APIs"
- Vérifiez que "DeepAI" apparaît comme "Disponible"

### 2. Tester la génération
1. Enregistrez un rêve
2. Attendez la transcription et l'analyse d'émotion
3. Vérifiez que l'image est générée par DeepAI

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

- **DeepAI** : **100% GRATUIT**
- **Limite** : 5 générations par jour
- **Coût estimé** : 0€

## 🛠️ Dépannage

### Erreur "API non disponible"
1. Vérifiez votre token API
2. Assurez-vous que `REACT_APP_DEEPAI_ENABLED=true`
3. Redémarrez l'application

### Erreur "Rate limit"
- DeepAI limite à 5 générations par jour
- Attendez le lendemain ou utilisez Hugging Face

### Erreur "Invalid token"
- Vérifiez que le token est correct
- Assurez-vous qu'il est actif dans votre compte DeepAI

### Génération lente
- DeepAI peut prendre 10-20 secondes
- C'est normal pour une API gratuite

## 🔧 Personnalisation

### Changer les paramètres
Modifiez les paramètres dans `generateWithDeepAI` :

```typescript
// DeepAI utilise des paramètres simples
formData.append('text', enhancedPrompt);
// Pas de paramètres supplémentaires disponibles
```

## 📞 Support

- **Site DeepAI** : [deepai.org](https://deepai.org/)
- **Documentation API** : [deepai.org/api-docs](https://deepai.org/api-docs)
- **Support** : Via le site DeepAI

## 🔄 Fallback automatique

Si DeepAI n'est pas disponible, l'application utilise automatiquement :
1. **Hugging Face** (si configuré)
2. **Mock** (images simulées)

## 🎯 Alternatives gratuites

Si vous voulez plus de générations gratuites :

### 1. **Hugging Face** (Déjà configuré)
- ✅ Illimité (avec limitations techniques)
- ✅ Plusieurs modèles

### 2. **Stability AI**
- ✅ 25 générations gratuites par mois
- ✅ Qualité professionnelle

### 3. **Leonardo.ai**
- ✅ 150 générations gratuites par jour
- ✅ Interface web

---

🎉 **Votre application génère maintenant des images oniriques avec DeepAI GRATUIT !** 