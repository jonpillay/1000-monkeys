import React, { useEffect, useState } from "react";
import Image from "../image/image";
import Story from "../story/Story";
import "./ResultPage.css";
import LoadingIcon from "../loading-icon/LoadingIcon";

const ResultPage = ({ navigate }) => {
  const [userChoices, setUserChoices] = useState(
    window.localStorage.getItem("userChoices")
  );
  const [imgUrl, setImgUrl] = useState();
  const [story, setStory] = useState();
  const [SDLoaded, setSDLoaded] = useState(false);
  const [GPTLoaded, setGPTLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    GPTClientCall(userChoices);
    sdClientCall(userChoices);
  }, []);

  useEffect(() => {
    if (SDLoaded === true && GPTLoaded === true) {
      setIsLoaded(true);
    }
  }, [SDLoaded, GPTLoaded]);

  const sdClientCall = (userChoices) => {
    fetch("/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userChoices,
    })
      .then((response) => response.json())
      .then((data) => {
        setImgUrl(data.imgUrl);
        setSDLoaded(true);
      });
  };

  const GPTClientCall = (userChoices) => {
    fetch("/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userChoices,
    })
      .then((response) => response.json())
      .then((data) => {
        setStory(data["storyText"]);
        updateMessageHistory(data["storyText"]);
        setGPTLoaded(true);
      });
  };

  const updateMessageHistory = (newMessage) => {
    const tempStorage = JSON.parse(localStorage.getItem("userChoices"));
    tempStorage.messageHistory.push(newMessage);
    localStorage.removeItem("userChoices");
    localStorage.setItem("userChoices", JSON.stringify(tempStorage));
    setUserChoices(tempStorage);
  };

  return (
    <>
      <div>
        <button className="results-page-home">Home</button>
      </div>
      {isLoaded ? (
        <div className="result-page">
          <div className="results-page-container">
            <Image link={imgUrl} />
            <Story storyString={story} />
            <div className="buttons">
              <button className="result-button">Save Story</button>
              <button className="result-button">Continue Story</button>
              <button className="result-button">Steer Story</button>
              <button className="result-button">Refresh Story</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="nav-box">
          <LoadingIcon />
        </div>
      )}
    </>
  );
};

export default ResultPage;
