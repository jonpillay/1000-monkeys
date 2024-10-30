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
import FormContainer from '../initialise-story-form/InitialiseStoryForm';
// import ResultPage from '../Pages/result-page/ResultPage';
import StorySoFar from '../story-so-far/StorySoFar';
import SplashContainer from '../splash-container/SplashContainer'
import AdminPage from '../Pages/admin-page/AdminPage';
import ActivationPage from '../Pages/activation-page/ActivationPage';
import BrowsePage from '../Pages/browse-page/BrowsePage';
import CreateSplashPage from '../Pages/create-splash-page/CreateSplashPage';
import CreateStoriesPage from '../Pages/create-stories-page/CreateStoriesPage';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';

import { StoryContext } from '../../context/StoryContext';

import monkeySpinner from "../../img/favpng_infinite-monkey-theorem.png"
import LoadingPage from '../Pages/loading_page/LoadingPage';

import { useDispatch, useSelector } from 'react-redux';
import { resetSysInfo, selectUserToken } from '../Pages/create-stories-page/storyBookSysInfoSlice';
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
            <Route exact path="/userfactoryintheenv" element={ admin == true ? <AdminPage/> : <Navigate to="/"/> } />
            <Route exact path="/" element={ <SplashContainer/> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;