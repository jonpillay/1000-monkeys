import './App.css';
import LandingPage from '../landing-page/LandingPage'
import React, { useState } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
        </Routes>
    );
}

export default App;
