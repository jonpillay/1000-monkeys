import React, { useState } from "react";
import Image from "../image/image";
import Story from "../story/Story";

const StorySoFar = () => {
  const [messageHistory, setMessageHistory] = useState(
    JSON.parse(window.localStorage.getItem("messageHistory")) || []
  );

  const [imageHistory, setImageHistory] = useState(
    JSON.parse(window.localStorage.getItem("imageHistory")) || []
  );

  return (
    <div className="story-so-far">
      <h1>Your story so far!</h1>
      {messageHistory.map((content, index) => (
        <div key={index}>
          <Image link={imageHistory[index]} />
          <Story content={content} />
        </div>
      ))}
    </div>
  );
};

export default StorySoFar;
