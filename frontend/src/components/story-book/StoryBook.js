import './StoryBook.css'
import TurnPageButton from '../turn-page-button/turnPageButton';
import Image from '../image/image';
import Story from '../story/Story';

const StoryBook = () => {

  console.log("StoryBook rerendered")

  useEffect(() => {
    setDisplayCredits(credits)
  }, [credits]);

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
        {renderChapter!=storyPages["textHistory"].length-1 &&
          <TurnPageButton id="next-page-button" direct="next" label="Next Chapter" callback={turnPage}/>
        }
      </div>
    </div>

  )
}

export default StoryBook;