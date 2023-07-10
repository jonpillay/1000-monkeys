import React, { useEffect, useState } from "react";
import Image from "../image/image";
import Story from "../story/Story";
import "./ResultPage.css";
import LoadingIcon from "../loading-icon/LoadingIcon";
import SteerStory from "../steer-story/SteerStory";
import HomeButton from "../home-button/HomeButton";

const ResultPage = ({ navigate }) => {

  const [imgUrl, setImgUrl] = useState();
  const [story, setStory] = useState();
  const [SDLoaded, setSDLoaded] = useState(false);
  const [GPTLoaded, setGPTLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reload, setReload] = useState(false);

  const userChoices = localStorage.getItem("userChoices")
  const GPTPromptHistory = localStorage.getItem("GPTPromptHistory")
  const storyPages = JSON.parse(localStorage.getItem("storyPages"))

  console.log(userChoices)
  console.log(GPTPromptHistory)
  console.log(storyPages)

  useEffect(() => {
    console.log("We are here")
    GPTClientCall(userChoices, GPTPromptHistory);
    // imageClientCall(userChoices);
  }, [reload]);

  const triggerReload = () => {
    setReload((prevStat) => !prevStat);
  };

  useEffect(() => {
    if (SDLoaded === true && GPTLoaded === true) {
      setIsLoaded(true);
    }
  }, [SDLoaded, GPTLoaded]);

  const imageClientCall = (userChoices) => {

    fetch("/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userChoices,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log(`This is how the frontend receives the URl ${data.imgUrl}`)
        setImgUrl(data["imgUrl"]);
        updateStorageAndHooks("imageHistory", data["imgUrl"]);
        setSDLoaded(true);
      });
  };

  const GPTClientCall = (userChoices, GPTPromptHistory) => {

    const reqBody = {
      userchoices: userChoices,
      GPTPromptHistory: GPTPromptHistory
    }

    fetch("/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log(data["page_text"])
        storyPages["textHistory"].push(data["page_text"])
        storyPages["imageHistory"].push(data["page_image"])
        console.log(storyPages)
        let GPTPrompts = JSON.parse(GPTPromptHistory)
        GPTPrompts.push({
          role: "assistant",
          content: data["page_text"]
        })
        console.log(GPTPrompts)
      });
  };

  const whatHappensNext = () => {
    resetLoadingParameters();
    updateStorageAndHooks(
      "prompt",
      "what you think will happen in the next chapter based on the history you received"
    );
    triggerReload();
  };

  const steerOnUserInput = (steerInput) => {
    resetLoadingParameters();
    updateStorageAndHooks("prompt", steerInput);
    triggerReload();
  };

  const refreshStory = () => {
    resetLoadingParameters();
    const tempStorage = JSON.parse(localStorage.getItem("userChoices"));
    tempStorage.messageHistory.pop();
    tempStorage.imageHistory.pop();
    localStorage.setItem("userChoices", JSON.stringify(tempStorage));
    // setUserChoices(JSON.stringify(tempStorage));
    triggerReload();
  };

  const resetLoadingParameters = () => {
    setGPTLoaded(false);
    setSDLoaded(false);
    setIsLoaded(false);
  };

  const updateStorageAndHooks = (key, value) => {
    const tempStorage = JSON.parse(localStorage.getItem("userChoices"));
    console.log(tempStorage)
    if (key === "messageHistory" || key === "imageHistory") {
      tempStorage[key] = [...tempStorage[key], value];
    } else {
      tempStorage[key] = value;
    }
    localStorage.setItem("userChoices", JSON.stringify(tempStorage));
    // setUserChoices(JSON.stringify(tempStorage));
  };

  return (
    <>
      <div>
        <HomeButton navigate={navigate} />
      </div>
      {isLoaded ? (
        <div className="result-page">
          <h1 className="resultpage-title">Here's your story!</h1>
          <div className="results-page-container">
            <div className="image-container">
              <Image link={imgUrl} />
            </div>
            <div className="result-story-container">
              <Story storyString={story} />
            </div>
        </div>
          <SteerStory callback={steerOnUserInput} />
            <div className="resultpage-buttons">
              <button className="resultpage-submit-button" data-cy="story-so-far" onClick={() => navigate("/storysofar")}>Story so far...</button> 
              <button className="resultpage-submit-button" data-cy="refresh" onClick={refreshStory}>Refresh the story</button>
              <button className="resultpage-submit-button" data-cy="next" onClick={whatHappensNext}>What happens next?</button>
            <div>
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
