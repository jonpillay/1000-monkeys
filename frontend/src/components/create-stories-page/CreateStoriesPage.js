import './CreateStoriesPage.css'

import { useLoadingContext } from "../../hooks/useLoadingContext";

import { UseDispatch, useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { selectRenderChapter } from '../story-book/storyBookSlice';

import { selectStoryInProgress, selectCharacter, selectGenre, selectArtStyle, selectFirstChapter, setStoryInProgress, setFirstChapter } from './storyBookSysInfoSlice';

import CreateStoriesControlPanel from '../create-stories-control-panel/CreateStoriesControlPanel';
import ChapterTitle from '../chapter-title/ChapterTitle';
import SaveStoryButton from '../save-story-button/SaveStoryButton';
import StoryBook from '../story-book/StoryBook';
import LoadingPage from '../loading_page/LoadingPage'

import { useCreateStory } from '../../hooks/useCreateStory'
import CreateSplashPage from '../create-splash-page/CreateSplashPage';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';

import { resetStoryBookSlice } from "../story-book/storyBookSlice";
import { resetSysInfo, resetStorySysInfo } from "../create-stories-page/storyBookSysInfoSlice";

import { useStoryContext } from "../../hooks/useStoryContext";

const CreateStoriesPage = (props) => {
  const {user} = useAuthContext
  const { loading } = useLoadingContext()

  const reduxDispatch = useDispatch()
  const { dispatch } = useStoryContext()

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
    error } = useCreateStory()

    const character = useSelector(selectCharacter)

    console.log(character)

    const firstChapter = useSelector(selectFirstChapter)

    const renderChapter = useSelector(selectRenderChapter) || null

    const storyInProgress = useSelector(selectStoryInProgress)
    // const character = useSelector(selectCharacter) || null
    // const genre = useSelector(selectGenre) || null
    // const artStyle = useSelector(selectArtStyle) || null

    console.log(storyInProgress)

    const genFirstChapter = async () => {
      await localStorage.removeItem('firstChapter')
      await AIGenCall()
    }

    const createStoryCleanup = () => {
      reduxDispatch(resetStorySysInfo())
      reduxDispatch(resetStoryBookSlice())
      localStorage.removeItem('storyPages')
      localStorage.removeItem('sysInfo');
      localStorage.removeItem('userChoices');
      localStorage.removeItem('GPTPromptHistory');
      localStorage.removeItem('localGPTPromptHistory');
  
      dispatch({type: "END", payload: null})
    }

    useEffect(() => {
      if (localStorage.getItem('firstChapter')) {
        genFirstChapter()
      }
    }, [])

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