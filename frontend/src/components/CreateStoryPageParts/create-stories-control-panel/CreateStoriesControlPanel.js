import './CreateStoriesControlPanel.css'

import { useEffect, useState, useRef } from 'react';

import { useNavigate } from "react-router";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CreateButton from '../create_button/CreateButton';
import UserPromptInput from '../user-prompt-input/UserPromptInput';
import PublishStoryControlPanel from '../publish_story_panel/PublishStoryPanel';
import UserPublishToggleButton from '../user-publish-story-button/UserPublishToggleButton';
import { useCreateStory } from '../../../hooks/useCreateStory';

import { useSelector } from 'react-redux';
import { selectAllChapterImages, selectAllChapterTexts, selectRenderChapter } from '.././story-book-create/storyBookSlice';


const CreateStoriesControlPanel = (props) => {

  const AIPromptNextChapter = props.AIPromptNextChapter
  const refreshImage = props.refreshImage
  const refreshStory = props.refreshStory
  const userPromtNextChapter = props.userPromtNextChapter
  const isLoading = props.isLoading
  const error = props.error
  const publishStory = props.publishStory
  const publishing = props.publishing
  const publishError = props.publishError
  
  // import the callback from the FetchsStories and apply it to different genres etc...

  const {user} = useAuthContext()

  const selectedButton = useRef()

  const chapterTexts = useSelector(selectAllChapterTexts)
  const renderChapter = useSelector(selectRenderChapter)

  const publishable = chapterTexts.length >= 5 ? true : false
  const userPublishable = chapterTexts.length >= 3 ? true : false
  const lastChapter = chapterTexts.length == renderChapter+1 ? true : false

  const [ userPublishChoice, setUserPublishChoice ] = useState(false)

  return (
    <>
      <div className='create-control-nav-container'>
        <>
        <div className='create-control-button-container'>
            <CreateButton disabledVar={publishable} selectedButton={selectedButton.current} createFunct={() => AIPromptNextChapter()} font={"phage-rough"} value="AI Prompt The Next Chapter" className="genre-button" />
            <CreateButton selectedButton={selectedButton.current} createFunct={() => refreshImage()} font={"rye"} value="Refresh the Picture" className="genre-button" />
            <CreateButton disabledVar={!lastChapter} selectedButton={selectedButton.current} createFunct={() => refreshStory()} font={"flavors"} value="Refresh Chapter" className="genre-button" />
            {/* <NavButton onClick={fetchByGenre("Western")} value="Western" className="genre-button" /> */}
        </div>
        <div className='create-inputs-container'>
          { !publishable && !userPublishChoice ? (
            <div className='create-control-user-prompt-input'>
              <UserPromptInput userPromtNextChapter={userPromtNextChapter} isLoading={isLoading} />
            </div>
          ) : (
            <div className='create-control-user-prompt-input'>
              <PublishStoryControlPanel publishing={publishing} publishStory={publishStory} publishError={publishError}/>
            </div>
          )}
          { userPublishable && !publishable ? (
            <div className='user-publish-button-container'>
              <UserPublishToggleButton userPublishable={userPublishable} userPublishChoice={userPublishChoice} setUserPublishChoice={setUserPublishChoice} />
            </div>
          ) : (
            <div className='user-publish-button-container'>
            </div>
          )}
        </div>
        <div>
          {error &&
            <div className="error">{error}</div>
          }
        </div>
        </>
      </div>
    </>
  );
}

export default CreateStoriesControlPanel;