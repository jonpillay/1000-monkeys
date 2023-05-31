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

// import React, { useEffect } from 'react';

// const LandingPage = () => {
//   useEffect(() => {
//     const getMessages = () => {
//       fetch('/api/messages')
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//         })
//         .catch((error) => {
//           console.error('Error retrieving messages:', error);
//         });
//     };

//     getMessages();
//   }, []);

//   return <div>Landing Page</div>;
// };

export default LandingPage;


