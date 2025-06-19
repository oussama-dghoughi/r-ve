# 🧠 Configuration Mistral AI pour l'analyse d'émotion

Ce guide vous explique comment configurer Mistral AI pour analyser l'émotion des rêves à partir de leur transcription.

## 📋 Prérequis

1. **Compte Mistral AI** : Créez un compte sur [Mistral AI](https://console.mistral.ai/)
2. **Clé API** : Obtenez votre clé API depuis la console Mistral

## 🔑 Configuration de la clé API

### 1. Obtenir votre clé API Mistral

1. Connectez-vous à [Mistral AI Console](https://console.mistral.ai/)
2. Allez dans la section "API Keys"
3. Cliquez sur "Create new key"
4. Copiez la clé générée

### 2. Configurer l'application

1. Ouvrez le fichier `.env` dans le dossier `dream-synthesizer`
2. Remplacez `your_mistral_api_key_here` par votre vraie clé API :

```env
REACT_APP_MISTRAL_API_KEY=your_real_mistral_api_key_here
REACT_APP_MISTRAL_ENABLED=true
```

## 🎯 Comment ça fonctionne

### Processus d'analyse d'émotion

1. **Transcription** : AssemblyAI transcrit votre rêve en texte
2. **Prompt Mistral** : Le texte est envoyé à Mistral AI avec ce prompt :
   ```
   Analyse l'émotion dominante dans ce rêve décrit en français.
   
   Rêve: "[votre transcription]"
   
   Réponds UNIQUEMENT avec l'une de ces émotions (en français):
   - joyeux (pour les rêves positifs, heureux, colorés, amusants)
   - stressant (pour les rêves angoissants, effrayants, négatifs)
   - neutre (pour les rêves sans émotion particulière)
   - paisible (pour les rêves calmes, sereins, apaisants)
   - mystérieux (pour les rêves étranges, énigmatiques, mystérieux)
   - intense (pour les rêves passionnés, dramatiques, puissants)
   
   Émotion détectée:
   ```

3. **Analyse intelligente** : Mistral AI analyse le contexte et le contenu du rêve
4. **Résultat** : L'émotion détectée est affichée avec une icône et une couleur

## 🚀 Avantages de Mistral AI

### ✅ **Analyse contextuelle**
- Comprend le contexte du rêve
- Analyse les nuances émotionnelles
- Prend en compte la complexité narrative

### ✅ **Précision améliorée**
- Analyse plus fine que les mots-clés simples
- Comprend les métaphores et symboles
- Détecte les émotions mixtes

### ✅ **Flexibilité**
- S'adapte à différents styles de narration
- Comprend les variations linguistiques
- Analyse en français natif

## 🔧 Configuration avancée

### Modèle utilisé
- **Modèle** : `mistral-large-latest`
- **Tokens max** : 50
- **Température** : 0.3 (pour des réponses cohérentes)

### Fallback
Si Mistral AI n'est pas disponible, l'application utilise :
1. **Analyse par mots-clés** : Détection basée sur des termes spécifiques
2. **Analyse de sentiment** : Évaluation positive/négative/neutre

## 🧪 Test de la configuration

### 1. Vérifier la disponibilité
- Ouvrez l'application
- Allez dans "Statut des APIs"
- Vérifiez que "Mistral AI" apparaît comme "Disponible"

### 2. Tester l'analyse
1. Enregistrez un rêve
2. Attendez la transcription
3. Vérifiez que l'émotion est détectée par Mistral AI

### 3. Exemples de test

**Rêve joyeux** :
> "J'étais dans un jardin coloré avec des fleurs qui dansaient, le soleil brillait et je me sentais léger comme une plume."

**Rêve stressant** :
> "Je courais dans un couloir sombre, des ombres me poursuivaient et je ne trouvais pas la sortie."

**Rêve mystérieux** :
> "J'étais dans une maison ancienne avec des portes qui s'ouvraient sur des pièces différentes à chaque fois."

## 💰 Coûts

- **Mistral Large** : ~$0.14 par 1M tokens d'entrée
- **Analyse d'émotion** : ~50 tokens par rêve
- **Coût estimé** : ~$0.000007 par rêve

## 🛠️ Dépannage

### Erreur "API non disponible"
1. Vérifiez votre clé API
2. Assurez-vous que `REACT_APP_MISTRAL_ENABLED=true`
3. Redémarrez l'application

### Erreur "Rate limit"
- Mistral AI a des limites de requêtes
- Attendez quelques secondes entre les analyses

### Erreur "Invalid API key"
- Vérifiez que la clé est correcte
- Assurez-vous qu'elle n'a pas expiré

## 📞 Support

- **Documentation Mistral** : [docs.mistral.ai](https://docs.mistral.ai/)
- **Console Mistral** : [console.mistral.ai](https://console.mistral.ai/)
- **Support** : support@mistral.ai

---

🎉 **Votre application utilise maintenant Mistral AI pour une analyse d'émotion intelligente et contextuelle !** 