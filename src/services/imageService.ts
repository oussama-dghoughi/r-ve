import { ApiResponse } from '../types';

// Configuration de l'API Hugging Face pour la génération d'images
const HUGGING_FACE_CONFIG = {
  ENABLED: process.env.REACT_APP_HUGGING_FACE_ENABLED === 'true',
  API_KEY: process.env.REACT_APP_HUGGING_FACE_TOKEN || '',
  MODEL: 'stabilityai/stable-diffusion-2-1', // Modèle Stable Diffusion
  URL: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
  TIMEOUT: parseInt(process.env.REACT_APP_IMAGE_TIMEOUT || '30000')
};

// Modèles alternatifs disponibles
const ALTERNATIVE_MODELS = [
  'runwayml/stable-diffusion-v1-5',
  'CompVis/stable-diffusion-v1-4',
  'prompthero/openjourney',
  'dreamlike-art/dreamlike-diffusion-1.0'
];

class ImageService {
  private async generateWithHuggingFace(prompt: string, emotion: string): Promise<ApiResponse> {
    try {
      console.log('🎨 Génération d\'image avec Hugging Face...');
      console.log('📝 Prompt:', prompt);
      console.log('🎭 Émotion:', emotion);

      // Améliorer le prompt avec l'émotion
      const enhancedPrompt = this.enhancePromptWithEmotion(prompt, emotion);
      console.log('✨ Prompt amélioré:', enhancedPrompt);

      const response = await fetch(HUGGING_FACE_CONFIG.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            num_inference_steps: 30,
            guidance_scale: 7.5,
            width: 512,
            height: 512
          }
        }),
        signal: AbortSignal.timeout(HUGGING_FACE_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        throw new Error(`Erreur API Hugging Face: ${response.status}`);
      }

      // Hugging Face retourne directement l'image en base64
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);

      console.log('✅ Image générée avec succès');
      return {
        success: true,
        data: { imageUrl }
      };

    } catch (error) {
      console.error('❌ Erreur Hugging Face:', error);
      throw error;
    }
  }

  private enhancePromptWithEmotion(prompt: string, emotion: string): string {
    // Améliorer le prompt avec des éléments visuels basés sur l'émotion
    const emotionEnhancements = {
      joyeux: 'vibrant colors, bright lighting, cheerful atmosphere, dreamy, magical',
      stressant: 'dark atmosphere, dramatic lighting, intense shadows, surreal, nightmarish',
      neutre: 'balanced composition, natural lighting, calm atmosphere, realistic',
      mystérieux: 'mysterious atmosphere, fog, shadows, enigmatic, ethereal',
      paisible: 'soft lighting, gentle colors, serene atmosphere, peaceful, tranquil',
      intense: 'dynamic composition, bold colors, powerful atmosphere, dramatic'
    };

    const enhancement = emotionEnhancements[emotion as keyof typeof emotionEnhancements] || '';
    
    // Ajouter des éléments artistiques pour améliorer la qualité
    const artisticElements = 'high quality, detailed, artistic, dreamlike, surreal, beautiful composition';
    
    return `${prompt}, ${enhancement}, ${artisticElements}`.trim();
  }

  private async generateWithMock(prompt: string, emotion: string): Promise<ApiResponse> {
    console.log('🎨 Utilisation de la génération d\'image simulée');
    
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Utiliser des images placeholder basées sur l'émotion
    const imageUrls = {
      joyeux: 'https://picsum.photos/512/512?random=1&blur=2',
      stressant: 'https://picsum.photos/512/512?random=2&blur=2',
      neutre: 'https://picsum.photos/512/512?random=3&blur=2',
      mystérieux: 'https://picsum.photos/512/512?random=4&blur=2',
      paisible: 'https://picsum.photos/512/512?random=5&blur=2',
      intense: 'https://picsum.photos/512/512?random=6&blur=2'
    };

    const imageUrl = imageUrls[emotion as keyof typeof imageUrls] || imageUrls.neutre;

    return {
      success: true,
      data: { imageUrl }
    };
  }

  async generateImage(prompt: string, emotion: string): Promise<ApiResponse> {
    console.log('🎨 Début de la génération d\'image');
    console.log('📝 Prompt:', prompt);
    console.log('🎭 Émotion:', emotion);

    try {
      let result: ApiResponse;

      // Utiliser Hugging Face si configuré
      if (HUGGING_FACE_CONFIG.ENABLED && HUGGING_FACE_CONFIG.API_KEY) {
        try {
          result = await this.generateWithHuggingFace(prompt, emotion);
        } catch (error) {
          console.error('❌ Erreur Hugging Face, fallback vers mock:', error);
          result = await this.generateWithMock(prompt, emotion);
        }
      } else {
        // Utiliser la génération simulée
        result = await this.generateWithMock(prompt, emotion);
      }

      return result;

    } catch (error) {
      console.error('💥 Erreur génération d\'image:', error);
      return {
        success: false,
        error: 'Erreur lors de la génération d\'image'
      };
    }
  }

  // Vérifier la disponibilité de l'API
  async checkAvailability(): Promise<boolean> {
    if (!HUGGING_FACE_CONFIG.ENABLED || !HUGGING_FACE_CONFIG.API_KEY) {
      console.log('❌ Hugging Face non configuré');
      return false;
    }

    try {
      const response = await fetch(HUGGING_FACE_CONFIG.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGING_FACE_CONFIG.API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: 'test image generation'
        }),
        signal: AbortSignal.timeout(5000)
      });

      const isAvailable = response.ok;
      console.log('✅ Hugging Face disponible:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.error('❌ API Hugging Face non disponible:', error);
      return false;
    }
  }

  // Obtenir des suggestions de prompts basées sur l'émotion
  getPromptSuggestions(emotion: string): string[] {
    const suggestions = {
      joyeux: [
        'Un jardin coloré avec des fleurs qui dansent',
        'Un ciel rempli d\'étoiles brillantes',
        'Une forêt enchantée avec des créatures magiques'
      ],
      stressant: [
        'Un couloir sombre avec des ombres menaçantes',
        'Une tempête violente dans un paysage désolé',
        'Des portes qui s\'ouvrent sur l\'inconnu'
      ],
      neutre: [
        'Un paysage urbain au coucher du soleil',
        'Une pièce vide avec une lumière douce',
        'Un chemin dans la campagne'
      ],
      mystérieux: [
        'Une maison ancienne avec des secrets cachés',
        'Un brouillard épais dans une forêt',
        'Des symboles mystérieux gravés dans la pierre'
      ],
      paisible: [
        'Un lac calme reflétant les montagnes',
        'Un jardin zen avec des pierres et de l\'eau',
        'Une plage déserte au lever du soleil'
      ],
      intense: [
        'Une explosion de couleurs et d\'énergie',
        'Un volcan en éruption dans un paysage dramatique',
        'Une tempête électrique dans le ciel'
      ]
    };

    return suggestions[emotion as keyof typeof suggestions] || suggestions.neutre;
  }
}

const imageService = new ImageService();
export default imageService; 