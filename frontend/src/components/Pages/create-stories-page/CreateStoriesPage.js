import './CreateStoriesPage.css'

import { useLoadingContext } from "../../../hooks/useLoadingContext";

import { useSelector, useDispatch } from 'react-redux';

import { selectRenderChapter, selectAllChapterImages } from '../../CreateStoryPageParts/story-book-create/storyBookSlice';

import { selectStoryInProgress, selectCharacter, selectGenre, selectArtStyle, selectFirstChapter, selectGPTPromptHistory, selectSDPromptHistory, setStoryInProgress, setFirstChapter } from './storyBookSysInfoSlice';

import CreateStoriesControlPanel from '../../CreateStoryPageParts/create-stories-control-panel/CreateStoriesControlPanel';
import ChapterTitle from '../../SharedStoryBookParts/chapter-title/ChapterTitle';
import SaveStoryButton from '../../SharedStoryBookParts/save-story-button/SaveStoryButton';
// import StoryBookCreate from '../../CreateStoryPageParts/story-book-create/StoryBookCreate';
import StoryBookCreate from '../../CreateStoryPageParts/story-book-create/StoryBookCreate.js';
import SysInfoPanel from '../../SharedStoryBookParts/sys-info-panel/SysInfoPanel.js';
import LoadingPage from '../loading_page/LoadingPage'

import { useCreateStory } from '../../../hooks/useCreateStory'
import { useEffect, useRef } from 'react';
import { useAuthContext } from '../../../hooks/useAuthContext';

import { resetStoryBookSlice } from "../../CreateStoryPageParts/story-book-create/storyBookSlice";
import { resetSysInfo, resetStorySysInfo } from "./storyBookSysInfoSlice";

import { useStoryContext } from "../../../hooks/useStoryContext";

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
    const genre = useSelector(selectGenre)
    const artStyle = useSelector(selectArtStyle)
    const GPTChatHistory = useSelector(selectGPTPromptHistory)
    const SDPromptHistory = useSelector(selectSDPromptHistory)
    const chapterImgURLs = useSelector(selectAllChapterImages)

    const firstChapter = useSelector(selectFirstChapter)

    const renderChapter = useSelector(selectRenderChapter) || null

    const storyInProgress = useSelector(selectStoryInProgress)

    let genreFont = ''

    if (genre == 'Western') {
      genreFont = 'rye'
    } else if (genre == 'Fairytale') {
      genreFont = 'flavors'
    } else if (genre == 'Cyberpunk') {
      genreFont = 'cynatar'
    } else if (genre == 'Sci-Fi') {
      genreFont = 'major-mono'
    }else if (genre == 'Cyberpunk') {
      genreFont = 'cynatar'
    } else if (genre == 'Dystopian') {
      genreFont = 'phage-rough'
    }

    const userPromptHistory = GPTChatHistory.filter(prompt => prompt['role'] == 'user')
    const userPromptHistoryList = []
    userPromptHistory.forEach(promptObj => userPromptHistoryList.push(promptObj['content']))
  
    const combinedPrompts = []
  
    console.log(userPromptHistory)
    
    if (userPromptHistory && userPromptHistoryList.length == chapterImgURLs.length) {
      userPromptHistoryList.forEach(prompt => {
        const chapterPromptStr = "SYS:\\> User Chapter Prompt = ".concat(prompt)
  
        let SDPrompt = ""
  
        if (SDPromptHistory.length == chapterImgURLs.length) {
          const SDPromptInd = combinedPrompts.length
          console.log(typeof SDPromptInd)
          SDPrompt = SDPromptHistory[SDPromptInd]
    
        } else {
          SDPrompt = "Image Gen Prompt Not Available."
        }
  
        const SDPromptStr = "SYS:\\> AI Generated Image Prompt = ".concat(SDPrompt)
  
        const finalPrompt = chapterPromptStr.concat("\n\n").concat(SDPromptStr)
  
        combinedPrompts.push(finalPrompt)
      });
    }

    const chapterPromptText = useRef(combinedPrompts[renderChapter])

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
      const handleUserPageNavigation = (event) => {

        if (loading) {
          event.preventDefault()

          // console.log(performance.getEntriesByType("navigation")[0].type)

          const userNavPrompt = window.confirm(
            "Navigating/Refreshing During Story Creation Will Terminate Creation.\nUnsaved Data Will be Lost and Credits Will be Deducted.\nPress OK To Continue, Or Cancel To Stay on Page."
          )

          if (userNavPrompt) {

            window.location.href = event.target.href

            if (event.type === "beforeunload") {
              window.location.reload();
            }
          }
        }
      }

    window.addEventListener("beforeunload", handleUserPageNavigation)

    return () => {
      window.removeEventListener("beforeunload", handleUserPageNavigation)
    }

    }, [loading])

    useEffect(() => {
      if (localStorage.getItem('firstChapter')) {
        genFirstChapter()
      }
    }, [loading])

  return (
    <>
      { loading == false ? (
        <div className="create-page-containter">
          <CreateStoriesControlPanel AIGenCall={AIGenCall} userPromtNextChapter={userPromtNextChapter} AIPromptNextChapter={AIPromptNextChapter} refreshStory={refreshStory} refreshImage={refreshImage} isLoading={isLoading} error={error}/>
          <div className="storybook-header">
              <ChapterTitle chapterNumber={renderChapter + 1}/>
              <SaveStoryButton setStoryInSync={[storyInSync, setStoryInSync]}/>
          </div>
          <StoryBookCreate/>
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