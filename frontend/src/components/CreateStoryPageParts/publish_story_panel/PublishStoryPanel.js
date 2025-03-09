import "./PublishStoryControlPanel.css"

import { useState, useRef } from "react";
import { usePublishStory } from "../../../hooks/usePublishStory";
import { useSanitiseInput } from "../../../hooks/useSanitiseInput";
import { useSaveStory } from "../../../hooks/useSaveStory";

import ForbiddenLogo from "../../../img/forbidden.png"

import { useSelector, useDispatch } from "react-redux"
import { selectCharacter, selectGenre, selectArtStyle, selectGPTPromptHistory, selectStoryInSync, setStoryInSync, setMongoID, selectMongoID } from "../../Pages/create-stories-page/storyBookSysInfoSlice"
import { selectAllChapterImages, selectAllChapterTexts } from '../../CreateStoryPageParts/story-book-create/storyBookSlice';
import { useAuthContext } from "../../../hooks/useAuthContext";


const PublishStoryControlPanel = (props) => {

  const { publishStory, isLoading, error } = usePublishStory()

  const [forbidden, setForbidden] = useState(false)

  const {sanitiseInput} = useSanitiseInput()

  const user = useAuthContext()

  const title = useRef()

  const story_id = useSelector(selectMongoID)
  const storyInSync = useSelector(selectStoryInSync)

  const chapterTexts = useSelector(selectAllChapterTexts)
  const chapterImages = useSelector(selectAllChapterImages)
  const GPTChatHistory = useSelector(selectGPTPromptHistory)

  const reduxCharacter = useSelector(selectCharacter)
  const reduxGenre = useSelector(selectGenre)
  const reduxArtStyle = useSelector(selectArtStyle)

  const AIEngineVer = "0.9"
  const author = user.username

  const { saveStory, updateStory, isSaving, saveError } = useSaveStory()

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!storyInSync) {
      if (story_id == null) {
        await saveStory(chapterImages, chapterTexts, reduxGenre, reduxCharacter, reduxArtStyle, GPTChatHistory, AIEngineVer, author)
      } else {
        await updateStory(story_id, chapterImages, chapterTexts, GPTChatHistory)
      }
    }

    const cleanCheck = await sanitiseInput(title.current.value)

    if (cleanCheck == true) {

      await publishStory(story_id, title.current.value)

    } else {
      setForbidden(true)
      setTimeout(() => {
        setForbidden(false)
      }, 1500)
      console.log("Invlaid input")

    }

  }

  return (
    <>
      <div className="publish-story-input-container">
        <form className="publish-story-input-form" onSubmit={handleSubmit}>
          <div className="publish-story-input-title-container">
            <div className="publish-story-input-title">Publish Your Story?</div>
          </div>
          <div className="publish-story-text-input-container">
            <div>
              <input type="text" className="publish-story-input-box" ref={title} placeholder="Give it a title..."/>
            </div>
            <>
            {! forbidden ? 
              <div className="publish-story-input-submit-container">
                <button disabled={isLoading} className="publish-story-input-button" id="publish-story-input-submit-button" type="submit">Publish</button>
              </div>
              :
              <div className="publish-story-input-submit-container">
                <img className="forbidden" src={ForbiddenLogo}/>
              </div>
              }
            </>
          </div>
        </form>
      </div>
    </>
  )
}

export default PublishStoryControlPanel