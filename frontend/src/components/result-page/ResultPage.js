import React, { useState } from 'react';
import Image from '../image/image';
import Story from '../story/Story';

const ResultPage = ({ navigate }) => {
  
  const [userChoices, setUserChoices] = useState(window.localStorage.getItem("userChoices"));

    // GPTClientCall(formValues)
    // sdClientCall(formValues)

  const sdClientCall = (userInput) => {
    fetch('/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  const GPTClientCall = (userInput) => {
    fetch("/story", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInput)
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }
  
  return (
    <div className="result-page">
      <h1>Here's your story!</h1>
      <div className="container">
        <Image />
        <Story />
        <div className="buttons">
          <button>Save this story</button>
          <button>Make a new story</button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
