import React from 'react';
import './App.css';
import {
  Navigate,
  useNavigate,
  Routes,
  Route
} from 'react-router-dom';
import FormContainer from '../form-container/FormContainer';
import ResultPage from '../result-page/ResultPage';
import StorySoFar from '../story-so-far/StorySoFar';
import SplashConatiner from '../splash-container/SplashContainer'

import { useAuthContext } from '../../hooks/useAuthContext';

const App = () => {
  const { user } = useAuthContext()

  return (
    <div className="background-image-container">
      <Routes>
        <Route path="/" element={<SplashConatiner/>} />
        <Route path="/results" element={user ? <ResultPage /> : <Navigate to='/'/>} />
      </Routes>
    </div>
  );
};

export default App;