import React, { useEffect, useState } from 'react';
import Image from '../image/image';
import Story from '../story/Story';

const ResultPage = ({ navigate }) => {
  
  const [userChoices, setUserChoices] = useState(window.localStorage.getItem("userChoices"));
  const [imgUrl, setImgUrl] = useState()

  useEffect(() => {
    // GPTClientCall(userChoices)
    sdClientCall(userChoices)
  }, [])
  

  const sdClientCall = (userChoices) => {
    fetch('/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: userChoices
    })
    .then(response => response.json())
    .then(data => setImgUrl('https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80'))
  }

  const GPTClientCall = (userChoices) => {
    fetch("/story", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: userChoices
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }
  
  return (
    <div className="result-page">
      <h1>Here's your story!</h1>
      <div className="container">
        <Image link={imgUrl}/>
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
