import { Emotion, ApiResponse } from '../types';

// Configuration de l'API AssemblyAI pour l'analyse d'émotion
const ASSEMBLY_AI_CONFIG = {
  ENABLED: true, // Forcer l'activation
  TOKEN: '585cf224714c4bb4972be9a25b7b0c9b', // Clé API directe
  URL: 'https://api.assemblyai.com/v2/transcript',
  TIMEOUT: parseInt(process.env.REACT_APP_EMOTION_TIMEOUT || '15000')
};

// Mapping des émotions détectées par AssemblyAI vers nos émotions
const assemblyToEmotion: { [key: string]: Emotion } = {
  'happy': 'joyeux',
  'excited': 'joyeux',
  'joyful': 'joyeux',
  'sad': 'stressant',
  'angry': 'stressant',
  'fearful': 'stressant',
  'anxious': 'stressant',
  'neutral': 'neutre',
  'calm': 'paisible',
  'peaceful': 'paisible',
  'mysterious': 'mystérieux',
  'intense': 'intense',
  'passionate': 'intense'
};

// Mots-clés pour affiner l'analyse d'émotion (fallback)
const emotionKeywords = {
  mystérieux: ['mystérieux', 'étrange', 'inconnu', 'secret', 'caché', 'obscur', 'énigmatique'],
  paisible: ['calme', 'tranquille', 'serein', 'paisible', 'doux', 'apaisant', 'zen'],
  intense: ['intense', 'puissant', 'vif', 'dramatique', 'passionné', 'énergique', 'dynamique']
};

class EmotionService {
  private async analyzeWithAssemblyAI(text: string): Promise<Emotion> {
    try {
      console.log('🧠 Analyse d\'émotion avec AssemblyAI...');
      
      // AssemblyAI nécessite un fichier audio, donc on utilise l'analyse de sentiment
      // Pour le texte, on utilise leur endpoint de sentiment analysis
      const response = await fetch('https://api.assemblyai.com/v2/sentiment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ASSEMBLY_AI_CONFIG.TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          language_code: 'fr'
        }),
        signal: AbortSignal.timeout(ASSEMBLY_AI_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erreur API AssemblyAI: ${response.status}`);
      }

      const result = await response.json();
      console.log('📊 Résultat AssemblyAI:', result);

      // Extraire le sentiment principal
      let emotion: Emotion = 'neutre';
      
      if (result.sentiment) {
        const sentiment = result.sentiment.toLowerCase();
        
        // Mapping basique du sentiment
        if (sentiment === 'positive' || sentiment === 'positif') {
          emotion = 'joyeux';
        } else if (sentiment === 'negative' || sentiment === 'négatif') {
          emotion = 'stressant';
        } else {
          emotion = 'neutre';
        }
      }

      // Affiner avec les mots-clés
      const textLower = text.toLowerCase();
      for (const [emotionType, keywords] of Object.entries(emotionKeywords)) {
        if (keywords.some(keyword => textLower.includes(keyword))) {
          emotion = emotionType as Emotion;
          break;
        }
      }

      console.log('🎭 Émotion détectée par AssemblyAI:', emotion);
      return emotion;

    } catch (error) {
      console.error('❌ Erreur AssemblyAI:', error);
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

      // Utiliser AssemblyAI si configuré
      if (ASSEMBLY_AI_CONFIG.ENABLED && ASSEMBLY_AI_CONFIG.TOKEN) {
        try {
          emotion = await this.analyzeWithAssemblyAI(text);
        } catch (error) {
          console.error('❌ Erreur AssemblyAI, fallback vers mock:', error);
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
    if (!ASSEMBLY_AI_CONFIG.ENABLED || !ASSEMBLY_AI_CONFIG.TOKEN) {
      return false;
    }

    try {
      const response = await fetch('https://api.assemblyai.com/v2/sentiment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ASSEMBLY_AI_CONFIG.TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: 'test',
          language_code: 'fr'
        }),
        signal: AbortSignal.timeout(5000)
      });

      return response.ok;
    } catch (error) {
      console.error('❌ API AssemblyAI non disponible:', error);
      return false;
    }
  }
}

const emotionService = new EmotionService();
export default emotionService; 