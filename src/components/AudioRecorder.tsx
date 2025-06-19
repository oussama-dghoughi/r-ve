import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  IconButton,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Mic,
  Square,
  Play,
  Pause
} from 'lucide-react';

interface AudioRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  isProcessing?: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete, isProcessing = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [transcription, setTranscription] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setTranscription('');

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onRecordingComplete(audioBlob);
        
        // Arrêter tous les tracks du stream
        stream.getTracks().forEach(track => track.stop());
      };

      // Démarrer la reconnaissance vocale en temps réel
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'fr-FR';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscription(finalTranscript + interimTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error('Erreur reconnaissance vocale:', event.error);
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      mediaRecorder.start();
      setIsRecording(true);
      setError('');
    } catch (err) {
      setError('Impossible d\'accéder au microphone');
      console.error('Erreur d\'enregistrement:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Arrêter la reconnaissance vocale
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {!audioUrl ? (
        <Box>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              startIcon={isRecording ? <Square /> : <Mic />}
              sx={{
                background: isRecording 
                  ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                minWidth: 200,
                height: 60,
                fontSize: '1.1rem',
                mb: 2
              }}
            >
              {isRecording ? 'Arrêter l\'enregistrement' : 'Commencer l\'enregistrement'}
            </Button>
          </motion.div>
          
          <Typography variant="body2" color="text.secondary">
            {isRecording ? 'Enregistrement en cours...' : 'Cliquez pour commencer l\'enregistrement'}
          </Typography>

          {/* Affichage de la transcription en temps réel */}
          {isRecording && transcription && (
            <Paper sx={{ p: 2, mt: 2, background: 'rgba(99, 102, 241, 0.1)' }}>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                "{transcription}"
              </Typography>
            </Paper>
          )}
        </Box>
      ) : (
        <Box>
          <Paper sx={{ p: 3, mb: 2, background: 'rgba(99, 102, 241, 0.1)' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Enregistrement terminé
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              <IconButton
                onClick={isPlaying ? pauseAudio : playAudio}
                sx={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5b21b6 0%, #be185d 100%)'
                  }
                }}
              >
                {isPlaying ? <Pause /> : <Play />}
              </IconButton>
            </Box>

            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnded}
              style={{ display: 'none' }}
            />

            <Typography variant="body2" color="text.secondary">
              Écoutez votre enregistrement ou cliquez sur "Recommencer" pour enregistrer à nouveau
            </Typography>
          </Paper>

          <Button
            variant="outlined"
            onClick={() => {
              setAudioUrl(null);
              setIsPlaying(false);
              setTranscription('');
            }}
            disabled={isProcessing}
            sx={{ borderColor: '#6366f1', color: '#6366f1' }}
          >
            Recommencer
          </Button>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default AudioRecorder; 