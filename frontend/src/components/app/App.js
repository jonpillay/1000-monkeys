import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectAiEngineVer } from './systemInfoSlice';

import './App.css';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';

import Header from '../HeaderSharedParts/header/Header';
import SplashPage from '../Pages/splash-page/SplashPage'
import AdminPage from '../Pages/admin-page/AdminPage';
import ActivationPage from '../Pages/activation-page/ActivationPage';
import ActivationSignupPanel from '../ActivationPageParts/activation-signup-panel/ActivationSignupPanel';
import BrowsePage from '../Pages/browse-page/BrowsePage';
import CreateSplashPage from '../Pages/create-splash-page/CreateSplashPage';
import CreateStoriesPage from '../Pages/create-stories-page/CreateStoriesPage';
import LoadingPage from '../Pages/loading_page/LoadingPage';
import TermsOfUsePage from '../Pages/terms-of-use-page/TermsOfUsePage';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';

import { useLoadSystemInfo } from '../../hooks/useLoadSystemInfo' 

import WarningSplash from '../SplashPageParts/warning-splash/WarningSplash';

const App = () => {

  const AiEngineVer = useSelector(selectAiEngineVer)

  const { loadSystemInfo, fetchingSysInfo } = useLoadSystemInfo()

  const story = useStoryContext()

  const {user} = useAuthContext()

  const admin = user ? user.isSuper : false

  useEffect(() => {
    if (AiEngineVer == null) {
      console.log("loading sys info")
      loadSystemInfo()
    }
  }, [AiEngineVer])

  if (!fetchingSysInfo) {
    return <div>Loading Sytem Info...</div>
  }

  return (
    <div className="app">
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/warning-test" element={ <WarningSplash/> } />
            <Route path="/start-your-story" element={ user ? <CreateSplashPage /> : <Navigate to="/"/>} />
            <Route path="/create" element={  user && story ? <CreateStoriesPage/> : <Navigate to="/"/> } />
            <Route path="/browse" element={ <BrowsePage/> } />
            <Route path="/loading" element={ <LoadingPage/> } />
            <Route path="/activate" element={ <ActivationPage/> } />
            <Route path="/userfactoryintheenv" element={ admin === true ? <AdminPage/> : <Navigate to="/"/> } />
            <Route path="/" element={ <SplashPage/> } />
            <Route path="/terms-of-use" element={ <TermsOfUsePage/> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;