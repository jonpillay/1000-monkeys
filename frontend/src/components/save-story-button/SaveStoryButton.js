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

    console.log(stringStoryPages)

    console.log(genre)

    const storyPages = JSON.parse(stringStoryPages)

    if (storyPages['storyID']) {
      try {
        await updateStory(storyPages['storyID'], stringStoryPages)
        localStorage.setItem('storyInSync', 'true')
        setStoryInSync(true)
      } catch (error) {
        console.log(error)
      }
      
    } else {
      const story_id = await saveStory(stringStoryPages, genre)
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