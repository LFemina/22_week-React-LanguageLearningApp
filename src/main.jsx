import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { WordsProvider } from './components/wordsContext/WordsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WordsProvider>
      <App />
    </WordsProvider>
  </StrictMode>,
);
