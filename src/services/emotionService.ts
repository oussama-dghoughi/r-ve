import { Emotion, ApiResponse } from '../types';

// Configuration de l'API Mistral AI pour l'analyse d'émotion
const MISTRAL_CONFIG = {
  ENABLED: process.env.REACT_APP_MISTRAL_ENABLED === 'true',
  API_KEY: process.env.REACT_APP_MISTRAL_API_KEY || '',
  MODEL: 'mistral-large-latest',
  URL: 'https://api.mistral.ai/v1/chat/completions',
  TIMEOUT: parseInt(process.env.REACT_APP_EMOTION_TIMEOUT || '15000')
};

// Mapping des émotions détectées par Mistral vers nos émotions
const mistralToEmotion: { [key: string]: Emotion } = {
  'joyeux': 'joyeux',
  'heureux': 'joyeux',
  'joyful': 'joyeux',
  'happy': 'joyeux',
  'stressant': 'stressant',
  'stressé': 'stressant',
  'stressful': 'stressant',
  'anxieux': 'stressant',
  'anxious': 'stressant',
  'neutre': 'neutre',
  'neutral': 'neutre',
  'paisible': 'paisible',
  'calme': 'paisible',
  'peaceful': 'paisible',
  'mystérieux': 'mystérieux',
  'mysterious': 'mystérieux',
  'intense': 'intense',
  'passionné': 'intense',
  'passionate': 'intense'
};

// Mots-clés pour affiner l'analyse d'émotion (fallback)
const emotionKeywords = {
  mystérieux: ['mystérieux', 'étrange', 'inconnu', 'secret', 'caché', 'obscur', 'énigmatique'],
  paisible: ['calme', 'tranquille', 'serein', 'paisible', 'doux', 'apaisant', 'zen'],
  intense: ['intense', 'puissant', 'vif', 'dramatique', 'passionné', 'énergique', 'dynamique']
};

class EmotionService {
  private async analyzeWithMistral(text: string): Promise<Emotion> {
    try {
      console.log('🧠 Analyse d\'émotion avec Mistral AI...');
      
      const prompt = `Analyse l'émotion dominante dans ce rêve décrit en français. 
      
Rêve: "${text}"

Réponds UNIQUEMENT avec l'une de ces émotions (en français):
- joyeux (pour les rêves positifs, heureux, colorés, amusants)
- stressant (pour les rêves angoissants, effrayants, négatifs)
- neutre (pour les rêves sans émotion particulière)
- paisible (pour les rêves calmes, sereins, apaisants)
- mystérieux (pour les rêves étranges, énigmatiques, mystérieux)
- intense (pour les rêves passionnés, dramatiques, puissants)

Émotion détectée:`;

      const response = await fetch(MISTRAL_CONFIG.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MISTRAL_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: MISTRAL_CONFIG.MODEL,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 50,
          temperature: 0.3
        }),
        signal: AbortSignal.timeout(MISTRAL_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erreur API Mistral: ${response.status}`);
      }

      const result = await response.json();
      console.log('📊 Résultat Mistral:', result);

      // Extraire l'émotion de la réponse
      let emotion: Emotion = 'neutre';
      
      if (result.choices && result.choices[0] && result.choices[0].message) {
        const responseText = result.choices[0].message.content.toLowerCase().trim();
        console.log('🎭 Réponse Mistral:', responseText);

        // Chercher l'émotion dans la réponse
        for (const [emotionKey, emotionValue] of Object.entries(mistralToEmotion)) {
          if (responseText.includes(emotionKey.toLowerCase())) {
            emotion = emotionValue;
            break;
          }
        }
      }

      // Fallback avec analyse de mots-clés si Mistral n'a pas donné de réponse claire
      if (emotion === 'neutre') {
        const textLower = text.toLowerCase();
        for (const [emotionType, keywords] of Object.entries(emotionKeywords)) {
          if (keywords.some(keyword => textLower.includes(keyword))) {
            emotion = emotionType as Emotion;
            break;
          }
        }
      }

      console.log('🎭 Émotion détectée par Mistral:', emotion);
      return emotion;

    } catch (error) {
      console.error('❌ Erreur Mistral:', error);
      throw error;
    }
  }

  private async analyzeWithMock(text: string): Promise<Emotion> {
    console.log('🎭 Utilisation de l\'analyse d\'émotion simulée');
    
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Analyse simple basée sur les mots-clés
    const textLower = text.toLowerCase();
    
    // Vérifier les mots-clés spécifiques
    for (const [emotionType, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        return emotionType as Emotion;
      }
    }

    // Analyse basique du sentiment
    const positiveWords = ['bon', 'beau', 'heureux', 'joie', 'amour', 'sourire', 'lumière', 'couleur'];
    const negativeWords = ['mauvais', 'peur', 'angoisse', 'sombre', 'danger', 'courir', 'perdu', 'stress'];
    
    const positiveCount = positiveWords.filter(word => textLower.includes(word)).length;
    const negativeCount = negativeWords.filter(word => textLower.includes(word)).length;

    if (positiveCount > negativeCount) {
      return 'joyeux';
    } else if (negativeCount > positiveCount) {
      return 'stressant';
    } else {
      return 'neutre';
    }
  }

  async analyzeEmotion(text: string): Promise<ApiResponse> {
    console.log('🔍 Début de l\'analyse d\'émotion');
    console.log('📝 Texte à analyser:', text);

    try {
      let emotion: Emotion;

      // Utiliser Mistral AI si configuré
      if (MISTRAL_CONFIG.ENABLED && MISTRAL_CONFIG.API_KEY) {
        try {
          emotion = await this.analyzeWithMistral(text);
        } catch (error) {
          console.error('❌ Erreur Mistral, fallback vers mock:', error);
          emotion = await this.analyzeWithMock(text);
        }
      } else {
        // Utiliser l'analyse simulée
        emotion = await this.analyzeWithMock(text);
      }

      return {
        success: true,
        data: { emotion }
      };

    } catch (error) {
      console.error('💥 Erreur analyse d\'émotion:', error);
      return {
        success: false,
        error: 'Erreur lors de l\'analyse d\'émotion'
      };
    }
  }

  // Vérifier la disponibilité de l'API
  async checkAvailability(): Promise<boolean> {
    if (!MISTRAL_CONFIG.ENABLED || !MISTRAL_CONFIG.API_KEY) {
      console.log('❌ Mistral AI non configuré');
      return false;
    }

    try {
      const response = await fetch(MISTRAL_CONFIG.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MISTRAL_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: MISTRAL_CONFIG.MODEL,
          messages: [
            {
              role: 'user',
              content: 'Test de connexion'
            }
          ],
          max_tokens: 10
        }),
        signal: AbortSignal.timeout(5000)
      });

      const isAvailable = response.ok;
      console.log('✅ Mistral AI disponible:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.error('❌ API Mistral non disponible:', error);
      return false;
    }
  }
}

const emotionService = new EmotionService();
export default emotionService; 