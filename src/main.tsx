import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

// Block external scripts and prevent share-modal errors
(function() {
  // Prevent any external scripts from loading
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName: string) {
    const element = originalCreateElement.call(this, tagName);
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name: string, value: string) {
        if (name === 'src' && value && (
          value.includes('share-modal') || 
          value.includes('share_modal') ||
          value.includes('external') ||
          value.includes('analytics')
        )) {
          console.log('BLOCKED: external script:', value);
          return;
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    return element;
  };
  
  // Prevent null reference errors
  if (typeof Element !== 'undefined' && Element.prototype) {
    const originalAddEventListener = Element.prototype.addEventListener;
    Element.prototype.addEventListener = function(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
      if (!this || this === null) {
        console.log('BLOCKED: addEventListener on null element');
        return;
      }
      try {
        return originalAddEventListener.call(this, type, listener, options);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        console.log('BLOCKED: addEventListener error:', errorMessage);
        return;
      }
    };
  }
  
  console.log('External script protection activated');
})();

// Register service worker for offline functionality
registerServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
