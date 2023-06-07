import React, { useState } from "react";
import Image from "../image/image";
import Story from "../story/Story";
import HomeButton from "../home-button/HomeButton";

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
        <div className="story-so-far">
        <h1>Your story so far!</h1>
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
