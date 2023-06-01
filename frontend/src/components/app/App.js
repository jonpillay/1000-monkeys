import React from 'react';
import './App.css';
import FormContainer from '../form-container/FormContainer';

const App = () => {
  return (
    <div>
      <h1 className="title">AI-Tistic Tales</h1>
      <div className="forms">
        <FormContainer />
      </div>
    </div>
  );
};

export default App;
