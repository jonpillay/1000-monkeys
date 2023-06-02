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
    <div>
      <h1 className="title">AI-Tistic Tales</h1>
      <Routes>
        <Route path="/" element={<FormContainer navigate={ useNavigate() }/>} />
        <Route path="/results" element={<ResultPage navigate={ useNavigate() }/>} />
      </Routes>
    </div>
  );
};

export default App;
