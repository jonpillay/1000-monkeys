import './StoryBook.css'
import TurnPageButton from '../turn-page-button/turnPageButton';
import Image from '../image/image';
import Story from '../story/Story';

const StoryBook = (props) => {

  console.log("StoryBook rerendered")

  return (
    <div className="results-container">
      <div className="next-page-container">
        {props.renderChapter>0 &&
          <TurnPageButton id="previous-page-button" direct="back" label="Previous Chapter" callback={props.turnPage}/>
        }
      </div>
      <div className="storybook-container">
          <Image link={props.image} />
          <Story storyString={props.text} />
      </div>
      <div className="next-page-container">
        {props.renderChapter!=props.length &&
          <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={props.turnPage}/>
        }
      </div>
    </div>

  )
}

export default StoryBook;