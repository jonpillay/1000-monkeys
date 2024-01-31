import './CreateStoriesPage.css'

import { useSelector } from 'react-redux';
import { selectRenderChapter } from '../story-book/storyBookSlice';

import CreateStoriesControlPanel from '../create-stories-control-panel/CreateStoriesControlPanel';
import ChapterTitle from '../chapter-title/ChapterTitle';
import SaveStoryButton from '../save-story-button/SaveStoryButton';
import StoryBook from '../story-book/StoryBook';

import { useCreateStory } from '../../hooks/useCreateStory'

const CreateStoriesPage = (props) => {
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

  return (
    <>
      <div className="create-page-containter">
        <CreateStoriesControlPanel AIGenCall={AIGenCall} userPromtNextChapter={userPromtNextChapter} AIPromptNextChapter={AIPromptNextChapter} refreshStory={refreshStory} refreshImage={refreshImage} isLoading={isLoading} error={error}/>
        <div className="storybook-header">
            <ChapterTitle chapterNumber={renderChapter + 1}/>
            <SaveStoryButton setStoryInSync={[storyInSync, setStoryInSync]}/>
        </div>
        <StoryBook/>
      </div>
    </>
  )
};

export default CreateStoriesPage;