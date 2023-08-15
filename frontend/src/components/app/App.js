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
import AdminPanel from '../admin-panel/AdminPanel';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';
import { useState } from 'react';

const getAdmin = (obj, property) => {
  if (obj) {
    return property in obj
  } else {
    console.log("Well this fired off")
    return false
  }
}

const App = () => {

  // const getStory = () => {
  //   const storyHistory = localStorage.getItem('storyPages')
  //   return storyHistory
  // }

  const {story} = useStoryContext()
  const {user} = useAuthContext()

  const admin = user && user.isSuper;

  console.log("This is the admin value ", admin === true)

  // route to signup (that should only activationJWT from invite code verification) only protected by presence of obj named activationJWT, JWT checks in middleware on form submission. 
  const activationJWT = localStorage.getItem('activationJWT')

  console.log(story)
  console.log(user)

  return (
    <div className="background-image-container">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={ story ? <Navigate to="/results"/> : <SplashContainer/> } />
          <Route exact path="/results" element={ !story ? <Navigate to="/"/> : <ResultPage/> } />
          <Route path="/userfactoryintheenv" element={ admin ? <AdminPanel/> : <Navigate to="/"/> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;