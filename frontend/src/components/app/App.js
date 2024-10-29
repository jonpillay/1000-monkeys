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


const App = () => {

  const storyDispatch = useContext(StoryContext)

  const reduxDispatch = useDispatch()

  const {user} = useAuthContext()

  const reduxToken = useSelector(selectUserToken)

  const admin = user ? user.isSuper : false

  return (
    <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/start-your-story" element={ user ? <CreateSplashPage/> : <Navigate to="/"/>} />
            <Route exact path="/create" element={  user ? <CreateStoriesPage/> : <Navigate to="/"/> } />
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