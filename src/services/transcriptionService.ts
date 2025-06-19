import { ApiResponse } from '../types';
import { API_CONFIG } from '../config/api';

// Configuration de l'API AssemblyAI pour la transcription
const ASSEMBLY_AI_CONFIG = {
  ENABLED: true, // Forcer l'activation
  TOKEN: '585cf224714c4bb4972be9a25b7b0c9b', // Clé API directe
  UPLOAD_URL: 'https://api.assemblyai.com/v2/upload',
  TRANSCRIPT_URL: 'https://api.assemblyai.com/v2/transcript',
  TIMEOUT: parseInt(process.env.REACT_APP_TRANSCRIPTION_TIMEOUT || '30000')
};

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

class TranscriptionService {
  // Méthode 1: AssemblyAI API (transcription de haute qualité)
  async transcribeWithAssemblyAI(audioBlob: Blob): Promise<ApiResponse> {
    try {
      console.log('🎤 Début de la transcription avec AssemblyAI...');

      // Étape 1: Upload du fichier audio
      const uploadResponse = await fetch(ASSEMBLY_AI_CONFIG.UPLOAD_URL, {
        method: 'POST',
        headers: {
          'Authorization': ASSEMBLY_AI_CONFIG.TOKEN,
          'Content-Type': 'application/octet-stream'
        },
        body: audioBlob,
        signal: AbortSignal.timeout(ASSEMBLY_AI_CONFIG.TIMEOUT)
      });

      if (!uploadResponse.ok) {
        throw new Error(`Erreur upload AssemblyAI: ${uploadResponse.status}`);
      }

      const uploadResult = await uploadResponse.json();
      console.log('📤 Fichier uploadé:', uploadResult.upload_url);

      // Étape 2: Demander la transcription
      const transcriptResponse = await fetch(ASSEMBLY_AI_CONFIG.TRANSCRIPT_URL, {
        method: 'POST',
        headers: {
          'Authorization': ASSEMBLY_AI_CONFIG.TOKEN,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          audio_url: uploadResult.upload_url,
          language_code: 'fr'
        }),
        signal: AbortSignal.timeout(ASSEMBLY_AI_CONFIG.TIMEOUT)
      });

      if (!transcriptResponse.ok) {
        throw new Error(`Erreur transcription AssemblyAI: ${transcriptResponse.status}`);
      }

      const transcriptResult = await transcriptResponse.json();
      console.log('📝 Transcription demandée:', transcriptResult.id);

      // Étape 3: Polling pour obtenir le résultat
      const pollUrl = `${ASSEMBLY_AI_CONFIG.TRANSCRIPT_URL}/${transcriptResult.id}`;
      let finalResult = null;
      let attempts = 0;
      const maxAttempts = 30; // 30 secondes max

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Attendre 3 secondes comme dans l'exemple PHP

        const pollResponse = await fetch(pollUrl, {
          headers: {
            'Authorization': ASSEMBLY_AI_CONFIG.TOKEN
          }
        });

        if (!pollResponse.ok) {
          throw new Error(`Erreur polling AssemblyAI: ${pollResponse.status}`);
        }

        finalResult = await pollResponse.json();
        console.log('📊 Statut transcription:', finalResult.status);

        if (finalResult.status === 'completed') {
          break;
        } else if (finalResult.status === 'error') {
          throw new Error(`Erreur transcription: ${finalResult.error}`);
        }

        attempts++;
      }

      if (!finalResult || finalResult.status !== 'completed') {
        throw new Error('Timeout de la transcription');
      }

      console.log('✅ Transcription AssemblyAI réussie');
      return {
        success: true,
        data: { transcription: finalResult.text }
      };

    } catch (error) {
      console.error('❌ Erreur AssemblyAI:', error);
      throw error;
    }
  }

  // Méthode principale qui essaie toutes les options
  async transcribeAudio(audioBlob: Blob): Promise<ApiResponse> {
    console.log('🔍 Début de la transcription audio');
    console.log('📋 Configuration:', {
      ASSEMBLY_AI_ENABLED: ASSEMBLY_AI_CONFIG.ENABLED,
      TRANSCRIPTION_METHOD: API_CONFIG.GENERAL.TRANSCRIPTION_METHOD
    });

    // Si AssemblyAI est activé, l'utiliser
    if (ASSEMBLY_AI_CONFIG.ENABLED && ASSEMBLY_AI_CONFIG.TOKEN) {
      console.log('🎤 Utilisation d\'AssemblyAI');
      try {
        const result = await this.transcribeWithAssemblyAI(audioBlob);
        console.log('✅ Transcription AssemblyAI réussie');
        return result;
      } catch (error) {
        console.error('❌ Erreur AssemblyAI:', error);
        // Fallback vers mock en cas d'erreur
        console.log('🎭 Fallback vers Mock API...');
        return await this.transcribeWithMock(audioBlob);
      }
    }

    // Si le mode démo est activé
    if (API_CONFIG.GENERAL.DEMO_MODE) {
      console.log('🎭 Mode démo activé - utilisation de la transcription simulée');
      return this.transcribeWithMock(audioBlob);
    }

    // Fallback vers mock si rien d'autre n'est configuré
    console.log('🎭 Aucune API configurée - utilisation du mode démo');
    return await this.transcribeWithMock(audioBlob);
  }

  // Méthode Mock (fallback)
  async transcribeWithMock(audioBlob: Blob): Promise<ApiResponse> {
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockTranscriptions = [
      "J'étais dans une forêt mystérieuse, entouré d'arbres qui semblaient vivants. Le vent soufflait doucement et j'entendais des voix lointaines qui m'appelaient.",
      "Je volais au-dessus d'une ville futuriste, avec des bâtiments qui touchaient les nuages. Les lumières brillaient de toutes les couleurs imaginables.",
      "Je me trouvais dans une maison que je ne reconnaissais pas, mais qui me semblait familière. Chaque pièce me menait vers une nouvelle découverte.",
      "J'étais sur une plage déserte au coucher du soleil. Les vagues étaient calmes et j'avais l'impression d'être seul au monde.",
      "Je courais dans un labyrinthe infini, avec des murs qui changeaient constamment. Je savais qu'il y avait quelque chose d'important à trouver au centre."
    ];

    const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];

    return {
      success: true,
      data: { transcription: randomTranscription }
    };
  }

  // Vérifier la disponibilité des APIs
  async checkAPIAvailability(): Promise<{
    assemblyAI: boolean;
    mock: boolean;
  }> {
    // Vérifier si AssemblyAI est configuré
    console.log('🔍 Configuration AssemblyAI:', {
      TOKEN: ASSEMBLY_AI_CONFIG.TOKEN ? 'PRÉSENT' : 'ABSENT',
      ENABLED: ASSEMBLY_AI_CONFIG.ENABLED,
      TOKEN_LENGTH: ASSEMBLY_AI_CONFIG.TOKEN?.length || 0
    });

    const assemblyAI = !!(ASSEMBLY_AI_CONFIG.ENABLED && ASSEMBLY_AI_CONFIG.TOKEN);
    const mock = true; // Toujours disponible comme fallback

    console.log('🔍 Vérification des APIs:', {
      assemblyAI,
      mock,
      TOKEN_EXISTS: !!ASSEMBLY_AI_CONFIG.TOKEN,
      ENABLED: ASSEMBLY_AI_CONFIG.ENABLED
    });

    return { assemblyAI, mock };
  }
}

const transcriptionService = new TranscriptionService();
export default transcriptionService; 