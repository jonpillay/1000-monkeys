import React from 'react';
import './App.css';
import {
  useNavigate,
  Routes,
  Route
} from 'react-router-dom';
import FormContainer from '../form-container/FormContainer';
import LoadingIcon from '../loading-icon/LoadingIcon';
import ResultPage from '../result-page/ResultPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FormContainer navigate={ useNavigate() }/>} />
        <Route path="/loading" element={<LoadingIcon navigate={ useNavigate() }/>} />
        <Route path="/results" element={<ResultPage navigate={ useNavigate() }/>} />
      </Routes>
      {/* <h1 className="title">AI-Tistic Tales</h1>
      <div className="forms">
        <FormContainer />
      </div> */}
    </div>
  );
};

export default App;
