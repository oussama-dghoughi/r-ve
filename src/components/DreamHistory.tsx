import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  CircularProgress,
  Paper
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Trash2,
  Eye,
  Calendar,
  Brain
} from 'lucide-react';
import dreamService from '../services/dreamService';
import { Dream } from '../types';

const DreamHistory: React.FC = () => {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dreamToDelete, setDreamToDelete] = useState<Dream | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDreams();
  }, []);

  const loadDreams = async () => {
    try {
      setLoading(true);
      const response = await dreamService.getDreams();
      if (response.success) {
        setDreams(response.data);
      } else {
        setError('Erreur lors du chargement des rêves');
      }
    } catch (err) {
      setError('Erreur lors du chargement des rêves');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDream = async () => {
    if (!dreamToDelete) return;

    try {
      const response = await dreamService.deleteDream(dreamToDelete.id);
      if (response.success) {
        setDreams(dreams.filter(dream => dream.id !== dreamToDelete.id));
        setDeleteDialogOpen(false);
        setDreamToDelete(null);
      } else {
        setError('Erreur lors de la suppression');
      }
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const openDeleteDialog = (dream: Dream) => {
    setDreamToDelete(dream);
    setDeleteDialogOpen(true);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
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
          Historique des Rêves
        </Typography>
      </motion.div>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {dreams.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card sx={{ textAlign: 'center', py: 8 }}>
            <CardContent>
              <History size={64} color="#6366f1" style={{ marginBottom: 16 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>
                Aucun rêve enregistré
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Commencez par enregistrer votre premier rêve pour le voir apparaître ici.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          <AnimatePresence>
            {dreams.map((dream, index) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                    }
                  }}
                  onClick={() => setSelectedDream(dream)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={dream.generatedImage}
                      alt="Rêve généré"
                      style={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16
                      }}
                    />
                    <Chip
                      label={dream.emotion}
                      icon={<span>{dreamService.getEmotionIcon(dream.emotion)}</span>}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        background: `linear-gradient(135deg, ${dreamService.getEmotionColor(dream.emotion)} 0%, ${dreamService.getEmotionColor(dream.emotion)}80 100%)`,
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {dream.title || 'Rêve sans titre'}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {dream.transcription}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Calendar size={16} color="#6366f1" />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(dream.createdAt)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDream(dream);
                        }}
                        sx={{ 
                          background: 'rgba(99, 102, 241, 0.1)',
                          '&:hover': { background: 'rgba(99, 102, 241, 0.2)' }
                        }}
                      >
                        <Eye size={16} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteDialog(dream);
                        }}
                        sx={{ 
                          background: 'rgba(239, 68, 68, 0.1)',
                          '&:hover': { background: 'rgba(239, 68, 68, 0.2)' }
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      )}

      {/* Dialog pour afficher les détails d'un rêve */}
      <Dialog
        open={!!selectedDream}
        onClose={() => setSelectedDream(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedDream && (
          <>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Brain color="#6366f1" />
              {selectedDream.title || 'Détails du rêve'}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <img
                  src={selectedDream.generatedImage}
                  alt="Rêve généré"
                  style={{
                    width: '100%',
                    height: 300,
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Émotion détectée:
                </Typography>
                <Chip
                  label={selectedDream.emotion}
                  icon={<span>{dreamService.getEmotionIcon(selectedDream.emotion)}</span>}
                  sx={{
                    background: `linear-gradient(135deg, ${dreamService.getEmotionColor(selectedDream.emotion)} 0%, ${dreamService.getEmotionColor(selectedDream.emotion)}80 100%)`,
                    color: 'white',
                    fontSize: '1rem',
                    padding: 1
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Transcription:
                </Typography>
                <Paper sx={{ p: 2, background: 'rgba(99, 102, 241, 0.1)' }}>
                  <Typography variant="body1">
                    "{selectedDream.transcription}"
                  </Typography>
                </Paper>
              </Box>
              
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Date de création:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(selectedDream.createdAt)}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedDream(null)}>
                Fermer
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Dialog de confirmation de suppression */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer ce rêve ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleDeleteDream} 
            color="error" 
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DreamHistory; 