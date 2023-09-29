import { useAuthContext } from "../../hooks/useAuthContext"
import "./SaveStoryButton.css"

function NavButton(props) {

  const { user } = useAuthContext()
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const storyPages = localStorage.getItem('storyPages') 

    const storyText = storyPages['textHistory']
    const storyImages = storyPages['imageHistory']

    await saveStory(storyText, storyImages, user)

  }
  

  return (
    <Button className="save-story-button" onClick={handleSubmit}>
      Save Story
    </Button>
  )
}

export default NavButton;