import React, { useState } from "react";
import Image from "../image/image";
import Story from "../story/Story";
import HomeButton from "../home-button/HomeButton";
import "./StorySoFar.css";

const StorySoFar = ({ navigate  }) => {
  const [userChoices, setUserChoices] = useState(
    JSON.parse(window.localStorage.getItem("userChoices")) || []
  );

  const messageHistory = userChoices.messageHistory;
  console.log(messageHistory[0])

  const imageHistory = userChoices.imageHistory;

  return (
    <>
      <HomeButton navigate={ navigate }/>
      <h1 className="title">Your story so far!</h1>
        <div className="story-so-far">
        {messageHistory.map((content, index) => (
          <div key={index}>
            <Image link={imageHistory[index]} />
            <Story storyString={content}/>
          </div>
        ))}
        </div>
    </>
  );
};

export default StorySoFar;
