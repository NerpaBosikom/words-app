import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/theme.css';
import { StoreProvider } from './store/storeContext'; // 👈 добавили импорт

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
);
