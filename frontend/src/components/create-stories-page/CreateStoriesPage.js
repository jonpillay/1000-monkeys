import './CreateStoriesPage.css'

import { useLoadingContext } from "../../hooks/useLoadingContext";

import { useSelector } from 'react-redux';
import { selectRenderChapter } from '../story-book/storyBookSlice';

import { selectStoryInProgress, selectCharacter, selectGenre, selectArtStyle } from '../app/SysInfoSlice';

import CreateStoriesControlPanel from '../create-stories-control-panel/CreateStoriesControlPanel';
import ChapterTitle from '../chapter-title/ChapterTitle';
import SaveStoryButton from '../save-story-button/SaveStoryButton';
import StoryBook from '../story-book/StoryBook';
import LoadingPage from '../loading_page/LoadingPage'

import { useCreateStory } from '../../hooks/useCreateStory'

const CreateStoriesPage = (props) => {
  const { loading } = useLoadingContext()

  const { 
    AIGenCall,
    userPromtNextChapter,
    AIPromptNextChapter,
    refreshStory,
    refreshImage,
    storyInSync,
    setStoryInSync,
    isLoading,
    setIsLoading,
    storyPages,
    error } = useCreateStory()

    const renderChapter = useSelector(selectRenderChapter)

    const storyInProgress = useSelector(selectStoryInProgress)
    const character = useSelector(selectCharacter)
    const genre = useSelector(selectGenre)
    const artStyle = useSelector(selectArtStyle)

  return (
    <>
      {!loading ? (
        <div className="create-page-containter">
          <CreateStoriesControlPanel AIGenCall={AIGenCall} userPromtNextChapter={userPromtNextChapter} AIPromptNextChapter={AIPromptNextChapter} refreshStory={refreshStory} refreshImage={refreshImage} isLoading={isLoading} error={error}/>
          <div className="storybook-header">
              <ChapterTitle chapterNumber={renderChapter + 1}/>
              <SaveStoryButton setStoryInSync={[storyInSync, setStoryInSync]}/>
          </div>
          <StoryBook/>
        </div>
      ) : (
        <div className="nav-box">
          <LoadingPage />
        </div> 
      )}

    </>
  )
};

export default CreateStoriesPage;