import { useAuthContext } from "../../hooks/useAuthContext"
import { useSaveStory } from "../../hooks/useSaveStory"

import "./SaveStoryButton.css"

import SaveIcon from "../../img/floppy-disk-save.png"

function SaveStoryButton(props) {

  const { user } = useAuthContext()

  const { saveStory, updateStory, isLoading, error } = useSaveStory()
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const stringStoryPages = localStorage.getItem('storyPages')
    console.log(stringStoryPages)

    const storyPages = JSON.parse(stringStoryPages)

    const genre = JSON.parse(stringStoryPages)['genre']

    if (storyPages['storyID']) {
      await updateStory(storyPages['storyID'], stringStoryPages)
    } else {
      const story_id = await saveStory(stringStoryPages, genre)
    }
  }
  
  return (
    <>
    <div className="save-button-container">
      <button disabled={isLoading} className="save-story-button" onClick={handleSubmit}>
        <img className="save-icon" src={SaveIcon}/>
      </button>
      {error && <div className="error">{error}</div>}
    </div>
    </>
  )
}

export default SaveStoryButton;