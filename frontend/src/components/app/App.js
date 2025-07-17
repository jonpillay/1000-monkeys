import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectAiEngineVer, selectSysInfoExpiry } from './systemInfoSlice';

import { useIsMobile } from '../../hooks/useIsMobile';

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
import BrowsePage from '../Pages/browse-page/BrowsePage';
import CreateSplashPage from '../Pages/create-splash-page/CreateSplashPage';
import CreateStoriesPage from '../Pages/create-stories-page/CreateStoriesPage';
import LoadingPage from '../Pages/loading_page/LoadingPage';
import TermsOfUsePage from '../Pages/terms-of-use-page/TermsOfUsePage';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';

import { useLoadSystemInfo } from '../../hooks/useLoadSystemInfo' 

import WarningSplash from '../SplashPageParts/warning-splash/WarningSplash';
import InitialiseSystemPage from '../Pages/initialise-system-page/InitialiseSystemPage';

const App = () => { 

  const AiEngineVer = useSelector(selectAiEngineVer)
  const sysInfoExpiry = useSelector(selectSysInfoExpiry)

  const [ sysInfoLoading, setSysInfoLoading ] = useState(!AiEngineVer || Date.now() > sysInfoExpiry || !sysInfoExpiry)

  const { loadSystemInfo, fetchingSysInfo, fetchingSysInfoSuccess, fetchingSysInfoError, sysInfoObj, setSysInfoObj } = useLoadSystemInfo()

  const story = useStoryContext()

  const {user} = useAuthContext()

  const admin = user ? user.isSuper : false

  useEffect(() => {
    if (sysInfoLoading) {
      loadSystemInfo()
    }
  }, [])

  const mobileLoad = useIsMobile()

  if (mobileLoad) {
    console.log("is mobile load")
    return <div>"This site must run on desktop"</div>
  }

  if (sysInfoLoading) {
    return <div><InitialiseSystemPage loadSystemInfo={loadSystemInfo} fetchingSysInfo={fetchingSysInfo} fetchingSysInfoSuccess={fetchingSysInfoSuccess} sysInfoLoading={sysInfoLoading} setSysInfoLoading={setSysInfoLoading} sysInfoObj={sysInfoObj} setSysInfoObj={setSysInfoObj} /></div>
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