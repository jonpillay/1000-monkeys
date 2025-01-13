import React from 'react';
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

import { useAuthContext } from '../../hooks/useAuthContext';
import { useStoryContext } from '../../hooks/useStoryContext';

import WarningSplash from '../SplashPageParts/warning-splash/WarningSplash';
import WarningExitSpiel from '../SplashPageParts/WarningExitSpiel/WarningExitSpiel';

const App = () => {

  const story = useStoryContext()

  const {user} = useAuthContext()

  const admin = user ? user.isSuper : false

  return (
    <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/start-your-story" element={ user ? <CreateSplashPage /> : <Navigate to="/"/>} />
            <Route exact path="/create" element={  user && story ? <CreateStoriesPage/> : <Navigate to="/"/> } />
            <Route exact path="/browse" element={ <BrowsePage/> } />
            <Route exact path="/loading" element={ <LoadingPage/> } />
            <Route exact path="/activate" element={ <ActivationPage/> } />
            <Route exact path="/userfactoryintheenv" element={ admin === true ? <AdminPage/> : <Navigate to="/"/> } />
            <Route exact path="/" element={ <SplashPage/> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;