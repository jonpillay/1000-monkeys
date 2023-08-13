import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { StoryContextProvider } from './context/StoryContext';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoryContextProvider>
          <App />
      </StoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
