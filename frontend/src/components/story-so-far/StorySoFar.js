import React, { useState } from "react";
import Image from "../image/image";
import Story from "../story/Story";
import HomeButton from "../home-button/HomeButton";
import "./StorySoFar.css";
import html2pdf from "html2pdf.js";

const StorySoFar = ({ navigate  }) => {
  const [userChoices, setUserChoices] = useState(
    JSON.parse(window.localStorage.getItem("userChoices")) || []
  );

  const messageHistory = userChoices.messageHistory;
  const imageHistory = userChoices.imageHistory;

  const handleDownloadPDF = () => {
    const element = document.querySelector('.story-so-far');
    html2pdf()
      .set({ margin: 0.5, filename: 'story_so_far.pdf' })
      .from(element)
      .save();
  };

  return (
    <>
      <HomeButton navigate={ navigate }/>
      <h1 className="title">Your story so far!</h1>
      <button className="download-button" onClick={handleDownloadPDF}>Download PDF</button>
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
