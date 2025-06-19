import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Chip,
  Paper,
  IconButton,
  LinearProgress,
  Tabs,
  Tab
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Upload,
  Brain,
  Save,
  RefreshCw
} from 'lucide-react';
import dreamService from '../services/dreamService';
import { Emotion } from '../types';
import AudioRecorder from './AudioRecorder';
import APIStatus from './APIStatus';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`recording-tabpanel-${index}`}
      aria-labelledby={`recording-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const DreamRecorder: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'idle' | 'recording' | 'transcribing' | 'analyzing' | 'generating' | 'complete'>('idle');
  const [transcription, setTranscription] = useState('');
  const [emotion, setEmotion] = useState<Emotion | null>(null);
  const [generatedImage, setGeneratedImage] = useState('');
  const [error, setError] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'audio/wav' || file.type === 'audio/mp3' || file.type === 'audio/mpeg')) {
      setAudioFile(file);
      setError('');
      processAudioFile(file);
    } else {
      setError('Veuillez sélectionner un fichier audio valide (.wav ou .mp3)');
    }
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
    setAudioFile(file);
    setError('');
    processAudioFile(file);
  };

  const processAudioFile = async (file: File) => {
    setIsProcessing(true);
    setCurrentStep('transcribing');
    setError('');

    try {
      // Transcription avec AssemblyAI
      const transcriptionResponse = await dreamService.transcribeAudio(file);
      
      if (transcriptionResponse.success) {
        console.log('📝 Transcription reçue:', transcriptionResponse.data.transcription);
        setTranscription(transcriptionResponse.data.transcription);
        setCurrentStep('analyzing');

        // Analyse d'émotion
        const emotionResponse = await dreamService.analyzeEmotion(transcriptionResponse.data.transcription);
        
        if (emotionResponse.success) {
          console.log('🎭 Émotion reçue:', emotionResponse.data.emotion);
          setEmotion(emotionResponse.data.emotion);
          setCurrentStep('generating');

          // Génération d'image
          console.log('🎨 Génération d\'image avec:', {
            prompt: transcriptionResponse.data.transcription,
            emotion: emotionResponse.data.emotion
          });
          const imageResponse = await dreamService.generateImage(transcriptionResponse.data.transcription, emotionResponse.data.emotion);
          
          if (imageResponse.success) {
            setGeneratedImage(imageResponse.data.imageUrl);
            setCurrentStep('complete');
          }
        }
      } else {
        setError('Erreur lors de la transcription');
      }
    } catch (err) {
      setError('Une erreur est survenue lors du traitement');
      setCurrentStep('idle');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveDream = async () => {
    if (!transcription || !emotion || !generatedImage) return;

    try {
      const dreamData = {
        audioUrl: audioFile ? URL.createObjectURL(audioFile) : undefined,
        transcription,
        emotion,
        generatedImage,
        title: `Rêve du ${new Date().toLocaleDateString()}`
      };

      const response = await dreamService.saveDream(dreamData);
      if (response.success) {
        // Reset form
        setTranscription('');
        setEmotion(null);
        setGeneratedImage('');
        setAudioFile(null);
        setCurrentStep('idle');
        setError('');
      }
    } catch (err) {
      setError('Erreur lors de la sauvegarde');
    }
  };

  const handleReset = () => {
    setTranscription('');
    setEmotion(null);
    setGeneratedImage('');
    setAudioFile(null);
    setCurrentStep('idle');
    setError('');
  };

  const getStepProgress = () => {
    const steps = ['transcribing', 'analyzing', 'generating', 'complete'];
    return steps.indexOf(currentStep) + 1;
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            mb: 4,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Racontez votre rêve
        </Typography>
      </motion.div>

      {/* Statut des APIs */}
      <APIStatus />

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Section d'enregistrement */}
        <Box sx={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Mic color="#6366f1" />
                  Enregistrement Audio
                </Typography>

                <Tabs
                  value={tabValue}
                  onChange={(e, newValue) => setTabValue(newValue)}
                  variant="fullWidth"
                  sx={{ mb: 3 }}
                >
                  <Tab label="Enregistrement direct" />
                  <Tab label="Fichier audio" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <AudioRecorder
                    onRecordingComplete={handleRecordingComplete}
                    isProcessing={isProcessing}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <input
                      type="file"
                      accept=".wav,.mp3"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />
                    
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      startIcon={<Upload />}
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                        mb: 2,
                        minWidth: 200
                      }}
                    >
                      Choisir un fichier audio
                    </Button>

                    {audioFile && (
                      <Typography variant="body2" color="text.secondary">
                        Fichier sélectionné: {audioFile.name}
                      </Typography>
                    )}
                  </Box>
                </TabPanel>

                {isProcessing && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Étape {getStepProgress()}/3: {
                        currentStep === 'transcribing' ? 'Transcription...' :
                        currentStep === 'analyzing' ? 'Analyse émotionnelle...' :
                        currentStep === 'generating' ? 'Génération d\'image...' : 'Terminé'
                      }
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(getStepProgress() / 3) * 100}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )}

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Box>

        {/* Section de résultats */}
        <Box sx={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Brain color="#6366f1" />
                  Résultats
                </Typography>

                <AnimatePresence>
                  {transcription && (
                    <motion.div
                      key="transcription"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Transcription:
                      </Typography>
                      <Paper sx={{ p: 2, mb: 3, background: 'rgba(99, 102, 241, 0.1)' }}>
                        <Typography variant="body1">
                          "{transcription}"
                        </Typography>
                      </Paper>
                    </motion.div>
                  )}

                  {emotion && (
                    <motion.div
                      key="emotion"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      style={{ marginTop: '1rem' }}
                    >
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Émotion détectée:
                      </Typography>
                      <Chip
                        label={emotion}
                        icon={<span>{dreamService.getEmotionIcon(emotion)}</span>}
                        sx={{
                          background: `linear-gradient(135deg, ${dreamService.getEmotionColor(emotion)} 0%, ${dreamService.getEmotionColor(emotion)}80 100%)`,
                          color: 'white',
                          fontSize: '1rem',
                          padding: 1
                        }}
                      />
                    </motion.div>
                  )}

                  {generatedImage && (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                        Image générée:
                      </Typography>
                      <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                        <img
                          src={generatedImage}
                          alt="Rêve généré"
                          style={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: 8
                          }}
                        />
                      </Box>
                    </motion.div>
                  )}

                  {currentStep === 'complete' && (
                    <motion.div
                      key="actions"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                          variant="contained"
                          onClick={handleSaveDream}
                          startIcon={<Save />}
                          sx={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            flex: 1
                          }}
                        >
                          Sauvegarder le rêve
                        </Button>
                        <IconButton
                          onClick={handleReset}
                          sx={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
                        >
                          <RefreshCw />
                        </IconButton>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default DreamRecorder; 