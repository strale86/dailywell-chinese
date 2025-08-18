import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppNavigator } from './navigation/AppNavigator';
import { ThemeProvider } from './contexts/ThemeContext';
import { registerServiceWorker } from './utils/offlineManager';
import './index.css';

// Register service worker for offline functionality
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  </StrictMode>
);
