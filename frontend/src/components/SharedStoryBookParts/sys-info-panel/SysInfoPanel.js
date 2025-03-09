// import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import './SysInfoPanel.css';

import { useState, useEffect } from 'react';

const SysInfoPanel = (props) => {

  const genre = props.genre
  const genreFont = props.genreFont
  const artStyle = props.artstyle

  const promptText = props.promptText

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
        <div className='user-prompt-display'>
          <textarea className='prompt-display-box' rows={5} cols={90} style={{fontSize:'0.8rem', fontFamily:'VT323', resize:'none', padding: '20px'}} readOnly value={promptText}/>
        </div>
      </div>
    </>
  )
};

export default SysInfoPanel;