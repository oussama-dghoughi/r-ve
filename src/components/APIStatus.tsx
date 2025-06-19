import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Collapse,
  Alert
} from '@mui/material';
import {
  CheckCircle,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
  Mic,
  Brain,
  Cloud,
  Zap,
  Globe,
  Settings,
  Heart
} from 'lucide-react';
import dreamService from '../services/dreamService';
import emotionService from '../services/emotionService';

interface APIStatusData {
  assemblyAI: boolean;
  huggingFace: boolean;
  openAI: boolean;
  google: boolean;
  azure: boolean;
  mock: boolean;
  emotionAPI: boolean;
}

const APIStatus: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<APIStatusData | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const transcriptionStatus = await dreamService.checkTranscriptionAPIs();
        const emotionStatus = await emotionService.checkAvailability();
        
        setApiStatus({
          ...transcriptionStatus,
          emotionAPI: emotionStatus
        });
      } catch (error) {
        console.error('Erreur lors de la vérification des APIs:', error);
        // Fallback avec des valeurs par défaut
        setApiStatus({
          assemblyAI: false,
          huggingFace: false,
          openAI: false,
          google: false,
          azure: false,
          mock: true,
          emotionAPI: false
        });
      }
    };

    checkStatus();
  }, []);

  if (!apiStatus) return null;

  const getStatusIcon = (available: boolean) => {
    return available ? (
      <CheckCircle size={16} color="#10b981" />
    ) : (
      <XCircle size={16} color="#ef4444" />
    );
  };

  const getStatusColor = (available: boolean) => {
    return available ? 'success' : 'error';
  };

  const getAvailableAPIs = () => {
    return Object.entries(apiStatus).filter(([key, available]) => available && key !== 'mock').length;
  };

  return (
    <Card sx={{ mb: 3, background: 'rgba(99, 102, 241, 0.05)' }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Info size={20} color="#6366f1" />
            <Typography variant="h6" sx={{ fontSize: '1rem' }}>
              Statut des APIs de transcription
            </Typography>
            <Chip 
              label={`${getAvailableAPIs()} API(s) disponible(s)`}
              size="small"
              color={getAvailableAPIs() > 0 ? 'success' : 'warning'}
              sx={{ ml: 1 }}
            />
          </Box>
          <IconButton
            size="small"
            onClick={() => setExpanded(!expanded)}
            sx={{ color: '#6366f1' }}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            {/* Web Speech API */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(apiStatus.assemblyAI)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  AssemblyAI Transcription API
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Transcription audio de haute qualité (payant)
                </Typography>
              </Box>
              <Chip
                label={apiStatus.assemblyAI ? 'Disponible' : 'Non configuré'}
                color={getStatusColor(apiStatus.assemblyAI) as any}
                size="small"
                icon={<Mic size={12} />}
              />
            </Box>

            {/* Hugging Face API */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(apiStatus.huggingFace)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Hugging Face API
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Modèle Whisper pour la transcription (gratuit avec limitations)
                </Typography>
              </Box>
              <Chip
                label={apiStatus.huggingFace ? 'Configuré' : 'Non configuré'}
                color={getStatusColor(apiStatus.huggingFace) as any}
                size="small"
                icon={<Cloud size={12} />}
              />
            </Box>

            {/* OpenAI Whisper API */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(apiStatus.openAI)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  OpenAI Whisper API
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Transcription de haute qualité (payant)
                </Typography>
              </Box>
              <Chip
                label={apiStatus.openAI ? 'Configuré' : 'Non configuré'}
                color={getStatusColor(apiStatus.openAI) as any}
                size="small"
                icon={<Zap size={12} />}
              />
            </Box>

            {/* Google Speech-to-Text API */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(apiStatus.google)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Google Speech-to-Text
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  API Google pour la reconnaissance vocale (payant)
                </Typography>
              </Box>
              <Chip
                label={apiStatus.google ? 'Configuré' : 'Non configuré'}
                color={getStatusColor(apiStatus.google) as any}
                size="small"
                icon={<Globe size={12} />}
              />
            </Box>

            {/* Azure Speech Services */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(apiStatus.azure)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Azure Speech Services
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Services de reconnaissance vocale Microsoft (payant)
                </Typography>
              </Box>
              <Chip
                label={apiStatus.azure ? 'Configuré' : 'Non configuré'}
                color={getStatusColor(apiStatus.azure) as any}
                size="small"
                icon={<Settings size={12} />}
              />
            </Box>

            {/* AssemblyAI Emotion API */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(apiStatus.emotionAPI)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  AssemblyAI Emotion API
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Analyse d'émotion et de sentiment avancée (payant)
                </Typography>
              </Box>
              <Chip
                label={apiStatus.emotionAPI ? 'Disponible' : 'Non configuré'}
                color={getStatusColor(apiStatus.emotionAPI) as any}
                size="small"
                icon={<Heart size={12} />}
              />
            </Box>

            {/* Mock API */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {getStatusIcon(apiStatus.mock)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Mode Simulation
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Données simulées pour les tests et la démo
                </Typography>
              </Box>
              <Chip
                label={apiStatus.mock ? 'Toujours disponible' : 'Non disponible'}
                color={getStatusColor(apiStatus.mock) as any}
                size="small"
                icon={<Brain size={12} />}
              />
            </Box>

            {/* Instructions */}
            {getAvailableAPIs() === 0 && (
              <Alert severity="info" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Pour une transcription réelle, configurez au moins une API dans le fichier .env
                </Typography>
              </Alert>
            )}

            {getAvailableAPIs() > 0 && (
              <Alert severity="success" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  {getAvailableAPIs()} API(s) configurée(s). L'application utilisera automatiquement la meilleure option disponible.
                </Typography>
              </Alert>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default APIStatus; 