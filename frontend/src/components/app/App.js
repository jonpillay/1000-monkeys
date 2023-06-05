import React from 'react';
import './App.css';
import {
  useNavigate,
  Routes,
  Route
} from 'react-router-dom';
import FormContainer from '../form-container/FormContainer';
import ResultPage from '../result-page/ResultPage';

const App = () => {
  return (
    <div className="background-image-container">
      <div>
        <Routes>
          <Route path="/" element={<FormContainer navigate={ useNavigate() }/>} />
          <Route path="/results" element={<ResultPage navigate={ useNavigate() }/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
