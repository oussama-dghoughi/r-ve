# Configuration AssemblyAI API

Ce guide vous explique comment configurer l'API AssemblyAI pour l'analyse d'émotion dans votre application Dream Synthesizer.

## 🎯 Fonctionnalité

- **Analyse d'Émotion** : Détection automatique de l'émotion dans le texte transcrit

## 🔑 Obtenir une clé API AssemblyAI

### 1. Créer un compte
1. Allez sur [AssemblyAI](https://www.assemblyai.com/)
2. Cliquez sur "Get Started" et créez votre compte
3. Confirmez votre email

### 2. Générer une clé API
1. Connectez-vous à votre compte AssemblyAI
2. Allez dans **API Keys** dans le dashboard
3. Cliquez sur **Create API Key**
4. Donnez un nom à votre clé (ex: "dream-synthesizer")
5. **Copiez la clé API** (elle commence par `585cf...`)

### 3. Configurer l'application
1. Dans le dossier `dream-synthesizer`, copiez le fichier `.env.example` vers `.env`
2. Ouvrez le fichier `.env`
3. Remplacez `your_assembly_ai_token_here` par votre vraie clé API :

```env
# Configuration des APIs gratuites pour la transcription
REACT_APP_HUGGING_FACE_TOKEN=hf_your_token_here

# Configuration pour l'analyse d'émotion avec AssemblyAI
REACT_APP_ASSEMBLY_AI_TOKEN=585cf_votre_vraie_cle_api_ici
REACT_APP_EMOTION_API_ENABLED=true
REACT_APP_EMOTION_TIMEOUT=15000

# Mode démo (false pour utiliser les vraies APIs)
REACT_APP_DEMO_MODE=false

# Timeouts pour les différentes APIs (en millisecondes)
REACT_APP_TRANSCRIPTION_TIMEOUT=5000
REACT_APP_EMOTION_TIMEOUT=2000
REACT_APP_IMAGE_TIMEOUT=3000

# Méthode de transcription
REACT_APP_TRANSCRIPTION_METHOD=auto
```

## 🧠 Fonctionnalités utilisées

### Analyse d'Émotion
- **Endpoint** : `https://api.assemblyai.com/v2/sentiment`
- **Fonctionnalité** : Analyse de sentiment en français
- **Méthode** : Analyse du texte transcrit pour détecter l'émotion

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
   - L'API AssemblyAI doit apparaître comme "Disponible"

3. **Testez l'analyse d'émotion** :
   - Enregistrez un rêve court
   - Vérifiez que l'émotion détectée correspond au contenu

## 💰 Coûts

- **Sentiment Analysis** : ~$0.10 par minute d'audio
- **Crédits gratuits** : AssemblyAI offre des crédits gratuits pour commencer
- **Paiement** : À l'usage, très économique pour les tests

## ⚠️ Limitations

- **Clé API requise** : Nécessite une clé API AssemblyAI
- **Coût** : Payant selon l'utilisation
- **Latence** : Dépend de la charge du serveur

## 🚨 Dépannage

### Erreur 401 (Unauthorized)
- Vérifiez que votre clé API est correcte
- Assurez-vous que la clé a les bonnes permissions

### Erreur 429 (Rate Limited)
- Vous avez dépassé votre quota
- Attendez quelques minutes ou vérifiez votre usage

### Erreur de timeout
- Augmentez la valeur de `REACT_APP_EMOTION_TIMEOUT` dans `.env`

## 🔄 Fallback automatique

Si l'API AssemblyAI n'est pas disponible, l'application utilise automatiquement :
- **Analyse par mots-clés** pour l'émotion
- **Web Speech API** pour la transcription

Cela garantit que l'application fonctionne toujours !

## 📊 Exemples d'utilisation

L'API AssemblyAI analyse le texte transcrit et retourne :
- **Sentiment** : positive, negative, neutral
- **Confiance** : score de confiance de l'analyse
- **Mots-clés** : termes importants détectés

## ✅ Vérification

Après configuration, vous devriez voir :
- ✅ AssemblyAI Emotion API : "Disponible" dans le statut
- ✅ Analyse d'émotion fonctionnelle lors de l'enregistrement
- ✅ Émotions détectées cohérentes avec le contenu du rêve 