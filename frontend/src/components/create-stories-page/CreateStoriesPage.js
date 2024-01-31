import './CreateStoriesPage.css'

import CreateStoriesControlPanel from '../create-stories-control-panel/CreateStoriesControlPanel';

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

  return (
    <>
      <div className="create-page-containter">
        <CreateStoriesControlPanel AIGenCall={AIGenCall} userPromtNextChapter={userPromtNextChapter} AIPromptNextChapter={AIPromptNextChapter} refreshStory={refreshStory} refreshImage={refreshImage} isLoading={isLoading} error={error}/>
        <StoryBook/>
      </div>
    </>
  )
};

export default CreateStoriesPage;