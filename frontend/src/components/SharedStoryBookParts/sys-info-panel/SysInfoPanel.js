// import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import './SysInfoPanel.css';

import { useState, useEffect } from 'react';

const SysInfoPanel = (props) => {

  const genre = props.genre
  const genreFont = props.genreFont
  const artStyle = props.artstyle
  const GPTChatHistory = props.GPTChatHistory
  const renderChapter = props.renderChapter
  const chapterPrompt = props.chapterPrompt

  let promptText = props.promptText

  useEffect(() => {
    promptText.current = GPTChatHistory[renderChapter]['content']
  }, [])

  return (
    <>
      <div className='sys-info-panel-container'>
        <div className='user-choices-panel'>
          <div className="genre-panel">
            Genre = <span style={{fontFamily:genreFont}}>{genre}</span>
          </div>
          <div className="art-style-panel">
            Art Style = <span style={{fontFamily:'merriweather-bold'}}>{artStyle}</span>
          </div>
          <div className="ai-engine-panel">
            AI Engine = <span style={{fontFamily:'digital-7'}}>v.0.9</span>
          </div>
        </div>
        <div className='user_prompt-display'>
          <span>Chapter Prompt = </span><textarea rows={3} cols={50} style={{fontSize:20, resize:'none'}} readOnly>{promptText.current}</textarea>
        </div>
      </div>
    </>
  )
};

export default SysInfoPanel;