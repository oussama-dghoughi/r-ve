import { Dream, Emotion, ApiResponse } from '../types';
import transcriptionService from './transcriptionService';

// Mock data pour la démo
const mockTranscriptions = [
  "J'étais dans une forêt enchantée, les arbres parlaient et les oiseaux chantaient des mélodies mystérieuses...",
  "Je volais au-dessus des nuages, traversant des paysages de rêve avec des couleurs que je n'avais jamais vues...",
  "J'étais dans une maison qui n'en finissait pas de grandir, chaque pièce menait à une autre plus étrange...",
  "Je courais dans un labyrinthe de miroirs, mon reflet me guidait vers une lumière dorée...",
  "J'étais sur une plage de sable rose, les vagues étaient faites de musique et le soleil dansait..."
];

const emotionIcons = {
  joyeux: '😊',
  stressant: '😰',
  neutre: '😐',
  mystérieux: '🔮',
  paisible: '😌',
  intense: '🔥'
};

const emotionColors = {
  joyeux: '#10b981',
  stressant: '#ef4444',
  neutre: '#6b7280',
  mystérieux: '#8b5cf6',
  paisible: '#3b82f6',
  intense: '#f59e0b'
};

class DreamService {
  private dreams: Dream[] = [];

  // Utiliser le nouveau service de transcription
  async transcribeAudio(audioFile: File): Promise<ApiResponse> {
    try {
      // Convertir le File en Blob pour le service de transcription
      const audioBlob = new Blob([audioFile], { type: audioFile.type });
      return await transcriptionService.transcribeAudio(audioBlob);
    } catch (error) {
      console.error('Transcription error:', error);
      // Fallback vers la méthode mock
      return this.transcribeWithMock();
    }
  }

  // Méthode mock de fallback
  private async transcribeWithMock(): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
        resolve({
          success: true,
          data: { transcription: randomTranscription }
        });
      }, 2000);
    });
  }

  // Simuler l'analyse d'émotion
  async analyzeEmotion(text: string): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const emotions: Emotion[] = ['joyeux', 'stressant', 'neutre', 'mystérieux', 'paisible', 'intense'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        resolve({
          success: true,
          data: { emotion: randomEmotion }
        });
      }, 1500);
    });
  }

  // Simuler la génération d'image
  async generateImage(prompt: string, emotion: Emotion): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Utiliser des images placeholder basées sur l'émotion
        const imageUrls = {
          joyeux: 'https://picsum.photos/400/300?random=1',
          stressant: 'https://picsum.photos/400/300?random=2',
          neutre: 'https://picsum.photos/400/300?random=3',
          mystérieux: 'https://picsum.photos/400/300?random=4',
          paisible: 'https://picsum.photos/400/300?random=5',
          intense: 'https://picsum.photos/400/300?random=6'
        };
        
        resolve({
          success: true,
          data: { imageUrl: imageUrls[emotion] }
        });
      }, 3000);
    });
  }

  // Sauvegarder un rêve
  async saveDream(dream: Omit<Dream, 'id' | 'createdAt'>): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDream: Dream = {
          ...dream,
          id: Date.now().toString(),
          createdAt: new Date()
        };
        this.dreams.unshift(newDream);
        resolve({
          success: true,
          data: newDream
        });
      }, 1000);
    });
  }

  // Récupérer tous les rêves
  async getDreams(): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: this.dreams
        });
      }, 500);
    });
  }

  // Supprimer un rêve
  async deleteDream(id: string): Promise<ApiResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.dreams = this.dreams.filter(dream => dream.id !== id);
        resolve({
          success: true,
          data: { message: 'Rêve supprimé avec succès' }
        });
      }, 500);
    });
  }

  getEmotionIcon(emotion: Emotion): string {
    return emotionIcons[emotion];
  }

  getEmotionColor(emotion: Emotion): string {
    return emotionColors[emotion];
  }

  // Vérifier la disponibilité des APIs de transcription
  async checkTranscriptionAPIs() {
    const availability = await transcriptionService.checkAPIAvailability();
    return {
      assemblyAI: availability.assemblyAI,
      huggingFace: false,
      openAI: false,
      google: false,
      azure: false,
      mock: availability.mock
    };
  }
}

const dreamService = new DreamService();
export default dreamService; 