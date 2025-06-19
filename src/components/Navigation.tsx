import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, History, LogOut, User } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  name: string;
}

interface NavigationProps {
  user: UserData;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(26, 26, 46, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: 'none'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Brain size={32} color="#6366f1" />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Synthétiseur de Rêves
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant={location.pathname === '/' ? 'contained' : 'text'}
            onClick={() => navigate('/')}
            startIcon={<Brain size={20} />}
            sx={{
              background: location.pathname === '/' ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' : 'transparent',
              '&:hover': {
                background: location.pathname === '/' ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' : 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Enregistrer
          </Button>
          <Button
            variant={location.pathname === '/history' ? 'contained' : 'text'}
            onClick={() => navigate('/history')}
            startIcon={<History size={20} />}
            sx={{
              background: location.pathname === '/history' ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' : 'transparent',
              '&:hover': {
                background: location.pathname === '/history' ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' : 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Historique
          </Button>

          {/* Menu utilisateur */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Bonjour, {user.name}
            </Typography>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { background: 'rgba(255, 255, 255, 0.2)' }
              }}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#6366f1' }}>
                <User size={16} />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  background: 'rgba(26, 26, 46, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  mt: 1
                }
              }}
            >
              <MenuItem onClick={handleMenuClose} disabled>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <User size={16} />
                  {user.email}
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LogOut size={16} />
                  Se déconnecter
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 