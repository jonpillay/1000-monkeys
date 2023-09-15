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

import Header from '../header/Header';
import FormContainer from '../form-container/FormContainer';
import ResultPage from '../result-page/ResultPage';
import StorySoFar from '../story-so-far/StorySoFar';
import SplashContainer from '../splash-container/SplashContainer'
import AdminPanel from '../admin-panel/AdminPanel';
import ActivationPage from '../activation-page.js/ActivationPage';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';
import { useCredits } from '../../hooks/useCredits';

import monkeySpinner from "../../img/favpng_infinite-monkey-theorem.png"

// const getAdmin = (obj) => {
//   if (obj) {
//     if (obj.isSuper == true) {
//       return true
//     } else {
//       return false
//     }
//   } else {
//     console.log("Well this fired off")
//     return false
//   }
// }

const App = () => {

  // const getStory = () => {
  //   const storyHistory = localStorage.getItem('storyPages')
  //   return storyHistory
  // }

  const {story} = useStoryContext()
  const {user} = useAuthContext()

  const admin = user ? user.isSuper : false

  console.log("This is the admin value ", admin)

  // route to signup (that should only activationJWT from invite code verification) only protected by presence of obj named activationJWT, JWT checks in middleware on form submission. 
  const activationJWT = localStorage.getItem('activationJWT')

  console.log(story)
  console.log(user)



  return (
    <div className="background-image-container">
      <div className='monkey-spinner'>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route exact path="/activate" element={ <ActivationPage/> } />
            <Route exact path="/results" element={ !story ? <Navigate to="/"/> : <ResultPage/> } />
            <Route exact path="/userfactoryintheenv" element={ admin == true ? <AdminPanel/> : <Navigate to="/"/> } />
            <Route exact path="/" element={ story ? <Navigate to="/results"/> : <SplashContainer/> } />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;