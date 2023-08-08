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

  const storyHistory = localStorage.getItem('storyPages')

  const user = useAuthContext()
  console.log(user)

  return (
    <div className="background-image-container">
      <Routes>
        <Route path="/" element={storyHistory ? <Navigate to='/results' /> : <SplashConatiner/> } />
        <Route path="/results" element={user ? <ResultPage/> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
};

export default App;