import React from 'react';

const LandingPage = () => {

    const getMessages = () => {
      fetch("/").then((response) => response.json()).then((data) => console.log(data))
    }

    return (
      <>
        <h1>Aitistic Tales</h1>
        <button onClick={getMessages}>Click me!</button>
      </>
    );
}

export default LandingPage;


