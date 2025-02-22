import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';
import './index.css';
import App from './App.jsx';
import WordStore from './WordStore.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider wordStore={WordStore}>
      <App />
    </Provider>
  </StrictMode>,
);