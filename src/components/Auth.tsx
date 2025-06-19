import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { User, Lock, Mail, LogIn, UserPlus } from 'lucide-react';

interface AuthProps {
  onLogin: (user: { id: string; email: string; name: string }) => void;
}

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
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      // Simulation d'une connexion réussie
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLogin({
        id: '1',
        email,
        name: email.split('@')[0] // Utilise la partie avant @ comme nom
      });
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !name) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      // Simulation d'une inscription réussie
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onLogin({
        id: '1',
        email,
        name
      });
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700
                }}
              >
                Synthétiseur de Rêves
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Connectez-vous pour commencer votre voyage onirique
              </Typography>
            </Box>

            <Paper sx={{ mb: 3 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': {
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <Tab
                  icon={<LogIn size={20} />}
                  label="Connexion"
                  iconPosition="start"
                />
                <Tab
                  icon={<UserPlus size={20} />}
                  label="Inscription"
                  iconPosition="start"
                />
              </Tabs>
            </Paper>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <TabPanel value={tabValue} index={0}>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <Mail size={20} style={{ marginRight: 8, color: '#6366f1' }} />,
                  }}
                />
                <TextField
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <Lock size={20} style={{ marginRight: 8, color: '#6366f1' }} />,
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    py: 1.5
                  }}
                >
                  Se connecter
                </Button>
              </form>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <form onSubmit={handleRegister}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <User size={20} style={{ marginRight: 8, color: '#6366f1' }} />,
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <Mail size={20} style={{ marginRight: 8, color: '#6366f1' }} />,
                  }}
                />
                <TextField
                  fullWidth
                  label="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: <Lock size={20} style={{ marginRight: 8, color: '#6366f1' }} />,
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    py: 1.5
                  }}
                >
                  S'inscrire
                </Button>
              </form>
            </TabPanel>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Auth; 