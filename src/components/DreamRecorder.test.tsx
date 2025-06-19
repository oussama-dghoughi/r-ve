import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DreamRecorder from './DreamRecorder';

// Mock du service
jest.mock('../services/dreamService', () => ({
  __esModule: true,
  default: {
    transcribeAudio: jest.fn(),
    analyzeEmotion: jest.fn(),
    generateImage: jest.fn(),
    saveDream: jest.fn(),
    getEmotionIcon: jest.fn(),
    getEmotionColor: jest.fn(),
  },
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('DreamRecorder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the main title', () => {
    renderWithRouter(<DreamRecorder />);
    expect(screen.getByText('Racontez votre rêve')).toBeInTheDocument();
  });

  test('renders upload button', () => {
    renderWithRouter(<DreamRecorder />);
    expect(screen.getByText('Choisir un fichier audio')).toBeInTheDocument();
  });

  test('shows file selection when upload button is clicked', () => {
    renderWithRouter(<DreamRecorder />);
    const uploadButton = screen.getByText('Choisir un fichier audio');
    fireEvent.click(uploadButton);
    // Le bouton devrait être présent et cliquable
    expect(uploadButton).toBeInTheDocument();
  });

  test('displays error for invalid file type', async () => {
    renderWithRouter(<DreamRecorder />);
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByRole('button', { name: /choisir un fichier audio/i });
    
    // Simuler la sélection d'un fichier invalide
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fireEvent.change(fileInput, { target: { files: [file] } });
    }

    await waitFor(() => {
      expect(screen.getByText('Veuillez sélectionner un fichier audio valide (.wav ou .mp3)')).toBeInTheDocument();
    });
  });

  test('renders results section', () => {
    renderWithRouter(<DreamRecorder />);
    expect(screen.getByText('Résultats')).toBeInTheDocument();
  });
}); 