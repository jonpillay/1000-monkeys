import './CreateStoriesPage.css'

import { useLoadingContext } from "../../hooks/useLoadingContext";

import { useSelector } from 'react-redux';
import { selectRenderChapter } from '../story-book/storyBookSlice';

import { selectStoryInProgress, selectCharacter, selectGenre, selectArtStyle } from './storyBookSysInfoSlice';

import CreateStoriesControlPanel from '../create-stories-control-panel/CreateStoriesControlPanel';
import ChapterTitle from '../chapter-title/ChapterTitle';
import SaveStoryButton from '../save-story-button/SaveStoryButton';
import StoryBook from '../story-book/StoryBook';
import LoadingPage from '../loading_page/LoadingPage'

import { useCreateStory } from '../../hooks/useCreateStory'
import CreateSplashPage from '../create-splash-page/CreateSplashPage';
import { useEffect } from 'react';

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

    const renderChapter = useSelector(selectRenderChapter) || null

    const storyInProgress = useSelector(selectStoryInProgress)
    // const character = useSelector(selectCharacter) || null
    // const genre = useSelector(selectGenre) || null
    // const artStyle = useSelector(selectArtStyle) || null

    console.log(storyInProgress)

    useEffect(() => {
      if (storyInProgress && renderChapter == null) {
        AIGenCall()
      }
    }, [])

  return (
    <>
      {!loading ? (
        storyInProgress ? (
          <div className="create-page-containter">
          <CreateStoriesControlPanel AIGenCall={AIGenCall} userPromtNextChapter={userPromtNextChapter} AIPromptNextChapter={AIPromptNextChapter} refreshStory={refreshStory} refreshImage={refreshImage} isLoading={isLoading} error={error}/>
          <div className="storybook-header">
              <ChapterTitle chapterNumber={renderChapter + 1}/>
              <SaveStoryButton setStoryInSync={[storyInSync, setStoryInSync]}/>
          </div>
          <StoryBook/>
        </div>
        ) : (
          <CreateSplashPage AIGenCall={AIGenCall} />
        )
      ) : (
        <div className="nav-box">
          <LoadingPage />
        </div> 
      )}

    </>
  )
};

export default CreateStoriesPage;