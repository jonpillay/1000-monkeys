import React, { useState } from "react";
import Image from "../image/image";
import Story from "../story/Story";
import HomeButton from "../home-button/HomeButton";
import "./StorySoFar.css";
// import html2pdf from "html2pdf.js";

const StorySoFar = ({ navigate  }) => {
  const [userChoices, setUserChoices] = useState(
    JSON.parse(window.localStorage.getItem("userChoices")) || []
  );

  const messageHistory = userChoices.messageHistory;
  const imageHistory = userChoices.imageHistory;

  // const handleDownloadPDF = () => {
  //   const content = `
  //   <div>
  //     ${imageHistory.map(image => `<img src="https://pub-8b49af329fae499aa563997f5d4068a4.r2.dev/generations/79dff0f1-123a-4554-a4cc-18932a8e85e7-0.png" />`).join('')}
  //     ${messageHistory.map(str => `<p>${str}</p>`).join('')}
  //   </div>
  // `;

  // html2pdf().from(content).save('myPdf.pdf');
  // };

  return (
    <>
      <h1 className="story-title">Your story so far!</h1>
      <HomeButton navigate={ navigate }/>
      {/* <button className="download-button" onClick={handleDownloadPDF}>Download PDF</button> */}
        <div className="story-so-far">
        {messageHistory.map((content, index) => (
          <div className="chapter" key={index}>
            <div className="image-so-far">
            <Image link={imageHistory[index]} />
            </div>
            <Story storyString={content}/>
          </div>
        ))}
        </div>
    </>
  );
};

export default StorySoFar;
