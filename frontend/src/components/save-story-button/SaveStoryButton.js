import { useAuthContext } from "../../hooks/useAuthContext"
import { useSaveStory } from "../../hooks/useSaveStory"

import "./SaveStoryButton.css"

import SaveIcon from "../../img/floppy-disk-save.png"

function SaveStoryButton(props) {

  const { user } = useAuthContext()

  const { saveStory, updateStory, isLoading, error } = useSaveStory()

  const [storyInSync, setStoryInSync] = props.setStoryInSync
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const stringStoryPages = localStorage.getItem('storyPages')

    const genre = JSON.parse(localStorage.getItem('userChoices'))['genre']

    const character = JSON.parse(localStorage.getItem('userChoices'))['character']

    const artstyle = JSON.parse(localStorage.getItem('userChoices'))['style']

    console.log("This is the stringStoryPages object that gets sent for save", stringStoryPages)

    console.log(genre)

    const storyPages = JSON.parse(stringStoryPages)

    console.log("This is the storyPages object that gets sent for save", storyPages)

    if (storyPages['storyID']) {
      try {
        await updateStory(storyPages['storyID'], storyPages)
        localStorage.setItem('storyInSync', 'true')
        setStoryInSync(true)
      } catch (error) {
        console.log(error)
      }
      
    } else {
      const story_id = await saveStory(stringStoryPages, genre, character, artstyle)
      localStorage.setItem('storyInSync', 'true')
      setStoryInSync(true)
    }
  }
  
  return (
    <>
    {storyInSync == false ? (
      <div className="save-button-container">
        <button disabled={isLoading} className="save-story-button" onClick={handleSubmit}>
          <img className="save-icon" src={SaveIcon}/>
        </button>
        {error && <div className="error">{error}</div>}
      </div>
    ) : (
      <div className="save-button-container">

      </div>
    )}

    </>
  )
}

export default SaveStoryButton;