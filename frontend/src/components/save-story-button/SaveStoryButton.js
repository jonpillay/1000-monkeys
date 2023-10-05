import { useAuthContext } from "../../hooks/useAuthContext"
import { useSaveStory } from "../../hooks/useSaveStory"

import "./SaveStoryButton.css"

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
    <button disabled={isLoading} className="save-story-button" onClick={handleSubmit}>
      Save Story
    </button>
    {error && <div className="error">{error}</div>}
    </>
  )
}

export default SaveStoryButton;