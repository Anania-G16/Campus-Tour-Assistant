import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 
import { ContextProvider } from "./context/storeContext.jsx"; 
import './index.css';
import 'leaflet/dist/leaflet.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 1. BrowserRouter must be the outermost wrapper */}
    <BrowserRouter>
      {/* 2. Theme and Store contexts follow inside */}
      <ThemeProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);