import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Navigate,
  useNavigate,
  Routes,
  Route,
  Router
} from 'react-router-dom';
import FormContainer from '../form-container/FormContainer';
import ResultPage from '../result-page/ResultPage';
import StorySoFar from '../story-so-far/StorySoFar';
import SplashContainer from '../splash-container/SplashContainer'

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';
import { useState } from 'react';   

const App = () => {

  

  // const getStory = () => {
  //   const storyHistory = localStorage.getItem('storyPages')
  //   return storyHistory
  // }

  const {story} = useStoryContext()
  const {user} = useAuthContext()

  console.log(story)
  console.log(user)

  return (
    <div className="background-image-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ story ? <Navigate to="/results"/> : <SplashContainer/> } />
          <Route exact path="/results" element={ !story ? <Navigate to="/"/> : <ResultPage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;