# Configuration Hugging Face API

Ce guide vous explique comment configurer l'API Hugging Face pour la transcription audio et l'analyse d'émotion.

## 🎯 Fonctionnalités

- **Transcription Audio** : Conversion de l'audio en texte
- **Analyse d'Émotion** : Détection automatique de l'émotion dans le texte

## 🔑 Obtenir une clé API Hugging Face

### 1. Créer un compte
1. Allez sur [Hugging Face](https://huggingface.co/)
2. Cliquez sur "Sign Up" et créez votre compte
3. Confirmez votre email

### 2. Générer un token d'accès
1. Connectez-vous à votre compte
2. Allez dans **Settings** → **Access Tokens**
3. Cliquez sur **New token**
4. Donnez un nom à votre token (ex: "dream-synthesizer")
5. Sélectionnez **Read** comme rôle
6. Cliquez sur **Generate token**
7. **Copiez le token** (il commence par `hf_`)

### 3. Configurer l'application
1. Dans le dossier `dream-synthesizer`, copiez le fichier `.env.example` vers `.env`
2. Ouvrez le fichier `.env`
3. Remplacez `hf_your_token_here` par votre vrai token :

```env
# Configuration des APIs gratuites
REACT_APP_HUGGING_FACE_TOKEN=hf_votre_vrai_token_ici

# Configuration pour l'analyse d'émotion
REACT_APP_EMOTION_API_ENABLED=true
REACT_APP_EMOTION_TIMEOUT=5000

# Mode démo (false pour utiliser les vraies APIs)
REACT_APP_DEMO_MODE=false

# Timeouts pour les différentes APIs
REACT_APP_TRANSCRIPTION_TIMEOUT=5000
REACT_APP_EMOTION_TIMEOUT=2000
REACT_APP_IMAGE_TIMEOUT=3000

# Méthode de transcription
REACT_APP_TRANSCRIPTION_METHOD=auto
```

## 🧠 Modèles utilisés

### Transcription Audio
- **Modèle** : `whisper-large-v3`
- **Langue** : Français (fr-FR)
- **Qualité** : Haute qualité

### Analyse d'Émotion
- **Modèle** : `cardiffnlp/twitter-roberta-base-sentiment-latest`
- **Fonctionnalité** : Analyse de sentiment (positif/négatif/neutre)
- **Affinage** : Mots-clés pour détecter des émotions spécifiques

## 🎭 Émotions détectées

L'application peut détecter les émotions suivantes :

1. **Joyeux** 😊 - Sentiments positifs, bonheur
2. **Stressant** 😰 - Anxiété, peur, tension
3. **Neutre** 😐 - Équilibre, neutralité
4. **Mystérieux** 🔮 - Étrange, inconnu, secret
5. **Paisible** 😌 - Calme, serein, tranquille
6. **Intense** 🔥 - Passionné, dramatique, énergique

## 🔧 Test de la configuration

1. **Redémarrez l'application** :
   ```bash
   npm start
   ```

2. **Vérifiez le statut** :
   - Ouvrez l'application dans votre navigateur
   - Regardez la section "Statut des APIs"
   - L'API Hugging Face doit apparaître comme "Disponible"

3. **Testez l'analyse d'émotion** :
   - Enregistrez un rêve court
   - Vérifiez que l'émotion détectée correspond au contenu

## ⚠️ Limitations

- **Quota gratuit** : Hugging Face offre un quota limité gratuit
- **Latence** : Les premières requêtes peuvent être plus lentes
- **Disponibilité** : Les modèles peuvent être temporairement indisponibles

## 🚨 Dépannage

### Erreur 401 (Unauthorized)
- Vérifiez que votre token est correct
- Assurez-vous que le token a les bonnes permissions

### Erreur 503 (Service Unavailable)
- Le modèle peut être en cours de chargement
- Réessayez dans quelques secondes

### Erreur de timeout
- Augmentez la valeur de `REACT_APP_EMOTION_TIMEOUT` dans `.env`

## 🔄 Fallback automatique

Si l'API Hugging Face n'est pas disponible, l'application utilise automatiquement :
- **Web Speech API** pour la transcription
- **Analyse par mots-clés** pour l'émotion

Cela garantit que l'application fonctionne toujours, même sans clé API !

## ✅ Vérification

Une fois configuré, vous devriez voir :
- ✅ Hugging Face API: Configuré (vert)
- ✅ Le compteur d'APIs disponibles augmente
- ✅ L'application utilise Hugging Face pour la transcription

## 🔧 Dépannage

### Problème: "Token Hugging Face non configuré"
**Solution**: Vérifiez que votre token est bien collé dans le fichier `.env`

### Problème: "Erreur API Hugging Face: 401"
**Solution**: Votre token est invalide ou expiré. Générez un nouveau token.

### Problème: "Erreur API Hugging Face: 429"
**Solution**: Vous avez dépassé la limite gratuite. Attendez quelques minutes ou passez à une autre API.

## 📊 Limitations Gratuites

- **Requêtes par heure**: ~30-50 requêtes
- **Taille des fichiers**: Jusqu'à 25MB
- **Langues supportées**: Français, Anglais, et plus de 100 langues

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez que votre token commence par `hf_`
2. Assurez-vous que le fichier `.env` est bien sauvegardé
3. Redémarrez l'application après modification
4. Consultez la [documentation Hugging Face](https://huggingface.co/docs/api-inference) 