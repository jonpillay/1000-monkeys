import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
