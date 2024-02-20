import React, { useEffect, useContext } from 'react';
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
import BrowsePage from '../browse-page/BrowsePage';
import CreateSplashPage from '../create-splash-page/CreateSplashPage';
import CreateStoriesPage from '../create-stories-page/CreateStoriesPage';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';

import { StoryContext } from '../../context/StoryContext';

import monkeySpinner from "../../img/favpng_infinite-monkey-theorem.png"
import LoadingPage from '../loading_page/LoadingPage';

import { useDispatch, useSelector } from 'react-redux';
import { resetSysInfo, selectUserToken } from '../create-stories-page/storyBookSysInfoSlice';
import { resetStoryBookSlice } from '../story-book/storyBookSlice';
import { clearReduxPersist } from '../../redux-state/store';

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

  const storyDispatch = useContext(StoryContext)

  const reduxDispatch = useDispatch()

  // const getStory = () => {
  //   const storyHistory = localStorage.getItem('storyPages')
  //   return storyHistory
  // }

  // const {story} = useStoryContext()
  const {user} = useAuthContext()

  // const reduxCheck = useSelector(selectAllChapterTexts)

  // const reduxLive = reduxCheck.length > 0

  const reduxToken = useSelector(selectUserToken)

  const admin = user ? user.isSuper : false

  // if (true) {
  //   console.log("user id is " + user.token)
  // }


  // useEffect(() => {
  //   if (user == null || reduxToken != user.token) {
  //     clearReduxPersist()
  //     reduxDispatch(resetSysInfo())
  //     reduxDispatch(resetStoryBookSlice())
  //   }
  // }, [])

  return (
    <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/start-your-story" element={ <CreateSplashPage/> } />
            <Route exact path="/create" element={ <CreateStoriesPage/> } />
            <Route exact path="/browse" element={ <BrowsePage/> } />
            <Route exact path="/loading" element={ <LoadingPage/> } />
            <Route exact path="/activate" element={ <ActivationPage/> } />
            {/* <Route exact path="/results" element={ !story ? <Navigate to="/"/> : <ResultPage/> } /> */}
            <Route exact path="/userfactoryintheenv" element={ admin == true ? <AdminPanel/> : <Navigate to="/"/> } />
            <Route exact path="/" element={ <SplashContainer/> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;