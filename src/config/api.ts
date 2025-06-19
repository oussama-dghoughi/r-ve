// Configuration explicite des APIs
export const API_CONFIG = {
  // Web Speech API (gratuit, intégré au navigateur)
  WEB_SPEECH: {
    ENABLED: true,
    LANGUAGE: 'fr-FR',
    CONTINUOUS: true,
    INTERIM_RESULTS: true
  },

  // AssemblyAI API (désactivé)
  ASSEMBLY: {
    TOKEN: '',
    URL: 'https://api.assemblyai.com/v2/upload',
    TRANSCRIPT_URL: 'https://api.assemblyai.com/v2/transcript',
    ENABLED: false
  },

  // Hugging Face API (désactivé)
  HUGGING_FACE: {
    TOKEN: '',
    URL: '',
    ENABLED: false
  },
  
  // OpenAI API
  OPENAI: {
    TOKEN: process.env.REACT_APP_OPENAI_API_KEY || '',
    URL: 'https://api.openai.com/v1/audio/transcriptions',
    ENABLED: false
  },
  
  // Google Speech API
  GOOGLE: {
    TOKEN: process.env.REACT_APP_GOOGLE_API_KEY || '',
    URL: 'https://speech.googleapis.com/v1/speech:recognize',
    ENABLED: false
  },
  
  // Azure Speech API
  AZURE: {
    TOKEN: process.env.REACT_APP_AZURE_SPEECH_KEY || '',
    REGION: process.env.REACT_APP_AZURE_SPEECH_REGION || '',
    URL: 'https://{region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1',
    ENABLED: false
  },
  
  // Configuration générale
  GENERAL: {
    DEMO_MODE: false,
    TRANSCRIPTION_METHOD: 'webSpeech',
    TRANSCRIPTION_TIMEOUT: 30000,
    EMOTION_TIMEOUT: 3000,
    IMAGE_TIMEOUT: 5000,
    DEFAULT_LANGUAGE: 'fr-FR'
  }
};

console.log('🔧 Configuration API chargée:', API_CONFIG); 