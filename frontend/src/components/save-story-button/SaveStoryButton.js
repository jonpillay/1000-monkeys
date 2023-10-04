import { useAuthContext } from "../../hooks/useAuthContext"
import { useSaveStory } from "../../hooks/useSaveStory"

import "./SaveStoryButton.css"

function SaveStoryButton(props) {

  const { user } = useAuthContext()

  const { saveStory, updateStory, isLoading, error } = useSaveStory()
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const storyPages = localStorage.getItem('storyPages')

    const genre = JSON.parse(localStorage.getItem('userChoices'))['genre']

    console.log(genre)

    await saveStory(storyPages, genre)

  }
  
  return (
    <>
    <button className="save-story-button" onClick={handleSubmit}>
      Save Story
    </button>
    {error && <div className="error">{error}</div>}
    </>
  )
}

export default SaveStoryButton;