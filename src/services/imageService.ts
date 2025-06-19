import { ApiResponse } from '../types';

// Configuration de l'API Stability AI pour la génération d'images (GRATUIT)
const STABILITY_CONFIG = {
  ENABLED: process.env.REACT_APP_STABILITY_ENABLED === 'true',
  API_KEY: process.env.REACT_APP_STABILITY_API_KEY || '',
  URL: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
  TIMEOUT: 30000 // Réduire à 30 secondes
};

// Configuration de fallback Hugging Face
const HUGGING_FACE_CONFIG = {
  ENABLED: process.env.REACT_APP_HUGGING_FACE_ENABLED === 'true',
  API_KEY: process.env.REACT_APP_HUGGING_FACE_API_KEY || '',
  TIMEOUT: parseInt(process.env.REACT_APP_IMAGE_TIMEOUT || '30000')
};

// Modèles Hugging Face qui fonctionnent vraiment
const WORKING_MODELS = [
  'stabilityai/stable-diffusion-2-1',
  'runwayml/stable-diffusion-v1-5',
  'CompVis/stable-diffusion-v1-4',
  'prompthero/openjourney',
  'dreamlike-art/dreamlike-diffusion-1.0'
];

// Modèles alternatifs disponibles (modèles qui fonctionnent)
const ALTERNATIVE_MODELS = [
  'stabilityai/stable-diffusion-2',
  'stabilityai/stable-diffusion-2-1-base',
  'runwayml/stable-diffusion-v1-5',
  'CompVis/stable-diffusion-v1-4'
];

class ImageService {
  private async generateWithStability(prompt: string, emotion: string): Promise<ApiResponse> {
    try {
      console.log('🎨 Génération d\'image avec Stability AI (GRATUIT)...');
      
      // Améliorer le prompt avec l'émotion
      const enhancedPrompt = this.enhancePromptWithEmotion(prompt, emotion);
      console.log('✨ Prompt amélioré:', enhancedPrompt);

      const response = await fetch(STABILITY_CONFIG.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STABILITY_CONFIG.API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: enhancedPrompt,
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30
        }),
        signal: AbortSignal.timeout(STABILITY_CONFIG.TIMEOUT)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erreur API Stability AI:', response.status, errorText);
        throw new Error(`Erreur API Stability AI: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('📊 Résultat Stability AI:', result);

      if (result.artifacts && result.artifacts[0]) {
        // Stability AI retourne l'image en base64
        const imageData = result.artifacts[0].base64;
        const imageBlob = new Blob([Uint8Array.from(atob(imageData), c => c.charCodeAt(0))], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);

        console.log('✅ Image générée avec succès par Stability AI');
        return {
          success: true,
          data: { imageUrl }
        };
      } else {
        throw new Error('Aucune image générée par Stability AI');
      }

    } catch (error) {
      console.error('❌ Erreur Stability AI:', error);
      throw error;
    }
  }

  private async generateWithHuggingFace(prompt: string, emotion: string): Promise<ApiResponse> {
    // Liste des modèles à essayer dans l'ordre (modèles qui fonctionnent vraiment)
    const models = [
      'stabilityai/stable-diffusion-2-1',
      'runwayml/stable-diffusion-v1-5',
      'CompVis/stable-diffusion-v1-4',
      'prompthero/openjourney',
      'dreamlike-art/dreamlike-diffusion-1.0'
    ];

    for (const model of models) {
      try {
        console.log(`🎨 Tentative avec le modèle Hugging Face: ${model}`);
        
        // Améliorer le prompt avec l'émotion
        const enhancedPrompt = this.enhancePromptWithEmotion(prompt, emotion);
        console.log('✨ Prompt amélioré:', enhancedPrompt);

        const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
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

        if (response.ok) {
          // Hugging Face retourne directement l'image en base64
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);

          console.log(`✅ Image générée avec succès avec le modèle: ${model}`);
          return {
            success: true,
            data: { imageUrl }
          };
        } else {
          console.log(`❌ Modèle ${model} non disponible (${response.status}), essai du suivant...`);
        }
      } catch (error) {
        console.log(`❌ Erreur avec le modèle ${model}:`, error);
        // Continuer avec le modèle suivant
      }
    }

    // Si aucun modèle ne fonctionne
    throw new Error('Aucun modèle Hugging Face disponible');
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

    // Vérifier si le prompt est vide et utiliser un prompt par défaut
    if (!prompt || prompt.trim() === '') {
      console.log('⚠️ Prompt vide, utilisation d\'un prompt par défaut');
      const defaultPrompts = {
        joyeux: 'Un jardin coloré avec des fleurs qui dansent sous le soleil',
        stressant: 'Un couloir sombre avec des ombres menaçantes',
        neutre: 'Un paysage urbain au coucher du soleil',
        mystérieux: 'Une maison ancienne avec des secrets cachés',
        paisible: 'Un lac calme reflétant les montagnes',
        intense: 'Une explosion de couleurs et d\'énergie'
      };
      prompt = defaultPrompts[emotion as keyof typeof defaultPrompts] || 'Un rêve mystérieux et onirique';
      console.log('✨ Nouveau prompt:', prompt);
    }

    // Logs de débogage pour la configuration
    console.log('🔧 Configuration Stability AI:');
    console.log('  - ENABLED:', STABILITY_CONFIG.ENABLED);
    console.log('  - API_KEY exists:', !!STABILITY_CONFIG.API_KEY);
    console.log('  - API_KEY length:', STABILITY_CONFIG.API_KEY.length);

    try {
      let result: ApiResponse;

      // Essayer Stability AI en premier
      if (STABILITY_CONFIG.ENABLED && STABILITY_CONFIG.API_KEY) {
        console.log('✅ Tentative avec Stability AI');
        try {
          result = await this.generateWithStability(prompt, emotion);
          return result;
        } catch (error) {
          console.error('❌ Erreur Stability AI, fallback vers Hugging Face:', error);
        }
      }

      // Essayer Hugging Face en fallback
      if (HUGGING_FACE_CONFIG.ENABLED && HUGGING_FACE_CONFIG.API_KEY) {
        console.log('✅ Tentative avec Hugging Face');
        try {
          result = await this.generateWithHuggingFace(prompt, emotion);
          return result;
        } catch (error) {
          console.error('❌ Erreur Hugging Face, fallback vers mock:', error);
        }
      }

      // Utiliser le mock en dernier recours
      console.log('❌ Aucune API configurée, utilisation du mock');
      result = await this.generateWithMock(prompt, emotion);
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
    if (!STABILITY_CONFIG.ENABLED || !STABILITY_CONFIG.API_KEY) {
      console.log('❌ Stability AI non configuré');
      return false;
    }

    try {
      const response = await fetch(STABILITY_CONFIG.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${STABILITY_CONFIG.API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          text_prompts: [{ text: 'a simple test image', weight: 1 }],
          cfg_scale: 7,
          height: 512,
          width: 512,
          samples: 1,
          steps: 10
        }),
        signal: AbortSignal.timeout(5000)
      });

      const isAvailable = response.ok;
      if (!isAvailable) {
        const errorText = await response.text();
        console.error('❌ Erreur test Stability AI:', response.status, errorText);
      }
      console.log('✅ Stability AI disponible:', isAvailable);
      return isAvailable;
    } catch (error) {
      console.error('❌ API Stability AI non disponible:', error);
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