import './StoryBook.css'
import TurnPageButton from '../turn-page-button/turnPageButton';
import Image from '../image/image';
import Story from '../story/Story';

import { useRef } from 'react';

const StoryBookBrowse = (props) => {
  
  /*
  Needs to fetch only the local storage info related to its own instance (current page number). 
  With different books rendered on the same page, will need to be referenced by its own key.
  Should setup localStorage object to handle every time the page renders a new list of books? 
  */

  let sysInfo = JSON.parse(localStorage.getItem("sysInfo"))

  const storyPages = props.storyPages

  console.log(storyPages)

  const [renderChapter, setRenderChapter] = props.setRender

  let imgUrl = useRef(storyPages["imageHistory"][renderChapter] || "");
  let story = useRef(storyPages["textHistory"][renderChapter] || "");

  /*
  Turnpage here needs to be rewritten to handle the new localStorage object.
  */

  const turnPage = (direct) => {
    if (direct == 'back') {
      story.current = storyPages["textHistory"][renderChapter -1]
      imgUrl.current = storyPages["imageHistory"][renderChapter -1]
      sysInfo["currentPage"] --
      localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
      setRenderChapter(renderChapter -1)
    } else if (direct == 'next') {
      sysInfo["currentPage"] ++
      localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
      story.current = storyPages["textHistory"][renderChapter +1]
      imgUrl.current = storyPages["imageHistory"][renderChapter +1]
      setRenderChapter(renderChapter +1)
    } else if (direct == 'last') {
      story.current = storyPages["textHistory"].slice(-1)
      imgUrl.current = storyPages["imageHistory"].slice(-1)
      sysInfo["currentPage"] = storyPages["textHistory"].length -1
      localStorage.setItem("sysInfo", JSON.stringify(sysInfo))
      setRenderChapter = storyPages["textHistory"][storyPages["textHistory"].length -1]
    }
  }

  console.log("StoryBook rerendered")

  return (
    <div className="results-container">
      <div className="next-page-container">
        {renderChapter>0 &&
          <TurnPageButton id="previous-page-button" direct="back" label="Previous Chapter" callback={turnPage}/>
        }
      </div>
      <div className="storybook-container">
          <Image link={imgUrl.current} />
          <Story storyString={story.current} />
      </div>
      <div className="next-page-container">
        {renderChapter<storyPages['textHistory'].length-1 &&
          <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={turnPage}/>
        }
      </div>
    </div>
  )
}

export default StoryBookBrowse;