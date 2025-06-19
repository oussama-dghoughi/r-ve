// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';

// Mock pour les animations Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement('div', props, children),
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock pour les icônes Lucide React
jest.mock('lucide-react', () => ({
  Mic: () => React.createElement('div', { 'data-testid': 'mic-icon' }, 'Mic'),
  MicOff: () => React.createElement('div', { 'data-testid': 'mic-off-icon' }, 'MicOff'),
  Upload: () => React.createElement('div', { 'data-testid': 'upload-icon' }, 'Upload'),
  Brain: () => React.createElement('div', { 'data-testid': 'brain-icon' }, 'Brain'),
  Image: () => React.createElement('div', { 'data-testid': 'image-icon' }, 'Image'),
  Save: () => React.createElement('div', { 'data-testid': 'save-icon' }, 'Save'),
  RefreshCw: () => React.createElement('div', { 'data-testid': 'refresh-icon' }, 'RefreshCw'),
  History: () => React.createElement('div', { 'data-testid': 'history-icon' }, 'History'),
  Trash2: () => React.createElement('div', { 'data-testid': 'trash-icon' }, 'Trash2'),
  Eye: () => React.createElement('div', { 'data-testid': 'eye-icon' }, 'Eye'),
  Calendar: () => React.createElement('div', { 'data-testid': 'calendar-icon' }, 'Calendar'),
  User: () => React.createElement('div', { 'data-testid': 'user-icon' }, 'User'),
  Lock: () => React.createElement('div', { 'data-testid': 'lock-icon' }, 'Lock'),
  Mail: () => React.createElement('div', { 'data-testid': 'mail-icon' }, 'Mail'),
  LogIn: () => React.createElement('div', { 'data-testid': 'login-icon' }, 'LogIn'),
  UserPlus: () => React.createElement('div', { 'data-testid': 'user-plus-icon' }, 'UserPlus'),
  LogOut: () => React.createElement('div', { 'data-testid': 'logout-icon' }, 'LogOut'),
  Square: () => React.createElement('div', { 'data-testid': 'square-icon' }, 'Square'),
  Play: () => React.createElement('div', { 'data-testid': 'play-icon' }, 'Play'),
  Pause: () => React.createElement('div', { 'data-testid': 'pause-icon' }, 'Pause'),
}));

// Configuration globale pour les tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
