import { useAuthContext } from "../../../hooks/useAuthContext"
import { useSaveStory } from "../../../hooks/useSaveStory"

import { useSelector, useDispatch } from "react-redux"
import { selectAllChapterTexts, selectAllChapterImages } from "../../CreateStoryPageParts/story-book-create/storyBookSlice"
import { selectCharacter, selectGenre, selectArtStyle, selectGPTPromptHistory, selectStoryInSync, setStoryInSync, setMongoID, selectMongoID, selectSDPromptHistory } from "../../Pages/create-stories-page/storyBookSysInfoSlice"
import { selectAiEngineVer } from "../../app/systemInfoSlice"


import "./SaveStoryButton.css"

import SaveIcon from "../../../img/floppy-disk-save.png"

function SaveStoryButton(props) {

  const { user } = useAuthContext()

  const { saveStory, updateStory, isLoading, error } = useSaveStory()

  const reduxDispatch = useDispatch()

  const storyInSync = useSelector(selectStoryInSync)

  const reduxChapterImages = useSelector(selectAllChapterImages)
  const reduxChapterText = useSelector(selectAllChapterTexts)

  const reduxCharacter = useSelector(selectCharacter)
  const reduxGenre = useSelector(selectGenre)
  const reduxArtStyle = useSelector(selectArtStyle)
  const reduxGPTPromptHistory = useSelector(selectGPTPromptHistory)
  const reduxSDPromptHistory = useSelector(selectSDPromptHistory)
  const story_id = useSelector(selectMongoID)
  const AIEngineVer = useSelector(selectAiEngineVer)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const stringStoryPages = localStorage.getItem('storyPages')

    const chapterImages = reduxChapterImages
    const chapterTexts = reduxChapterText

    const character = reduxCharacter
    const genre = reduxGenre
    const artStyle = reduxArtStyle
    const GPTPromptHistory = reduxGPTPromptHistory
    const SDPromptHistory = reduxSDPromptHistory
    const storyID = story_id
    const author = user.username

    const storyPages = JSON.parse(stringStoryPages)

    if (storyID != null) {
      try {
        await updateStory(storyID, chapterImages, chapterTexts, GPTPromptHistory, SDPromptHistory)
        reduxDispatch(setStoryInSync(true))
        localStorage.setItem('storyInSync', 'true')
        setStoryInSync(true)
      } catch (error) {
        console.log(error)
      }
      
    } else {
      const story_id = await saveStory(chapterImages, chapterTexts, genre, character, artStyle, GPTPromptHistory, SDPromptHistory, AIEngineVer, author)
      localStorage.setItem('storyInSync', 'true')
      reduxDispatch(setStoryInSync(true))
      setStoryInSync(true)
    }
  }
  
  return (
    <>
    {!storyInSync ? (
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