export interface Dream {
  id: string;
  audioUrl?: string;
  transcription: string;
  emotion: Emotion;
  generatedImage: string;
  createdAt: Date;
  title?: string;
}

export type Emotion = 'joyeux' | 'stressant' | 'neutre' | 'mystérieux' | 'paisible' | 'intense';

export interface EmotionOption {
  value: Emotion;
  label: string;
  icon: string;
  color: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Types pour Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string;
} 