import React from 'react';
import LoadingIcon from '../loading/LoadingIcon';

const LandingPage = () => {

    const getMessages = () => {
      fetch("/").then((response) => response.json()).then((data) => console.log(data))
    }

    return (
      <>
        <h1>Aitistic Tales</h1>
        <button onClick={getMessages}>Click me!</button>
        <LoadingIcon />
      </>
    );
}

export default LandingPage;


