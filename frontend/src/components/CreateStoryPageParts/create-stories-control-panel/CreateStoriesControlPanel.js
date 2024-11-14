import './CreateStoriesControlPanel.css'

import { useEffect, useState, useRef } from 'react';

import { useNavigate } from "react-router";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CreateButton from '../create_button/CreateButton';
import UserPromptInput from '../user-prompt-input/UserPromptInput';
import { useCreateStory } from '../../../hooks/useCreateStory';

const CreateStoriesControlPanel = (props) => {

  // import the callback from the FetchsStories and apply it to different genres etc...

  const {user} = useAuthContext()

  const [controlPanelTop, setControlPanelTop] = useState(false)
  const [controlPanelScroll, setControlPanelScroll] = useState(false)

  const selectedButton = useRef()


  // useEffect(() => {
  //   const controlTopScroll = () => {
  //     if (window.scrollY > 50) {
  //       setControlPanelTop(true)
  //     } else {
  //       setControlPanelTop(false)
  //     }
  //   };

  //   window.addEventListener('scroll', controlTopScroll);

  //   // const controlTopMouse = (Mpos) => {
  //   //   if (Mpos.clientY < 70) {
  //   //     setControlPanelTop(true)
  //   //   } else {
  //   //     setControlPanelTop(false)
  //   //   }
  //   // }

  //   const controlScrollnMouse = (Mpos) => {
  //     if (window.scrollY > 10 && Mpos.clientY < 200) {
  //       setControlPanelScroll(true)
  //     } else {
  //       setControlPanelScroll(false)
  //     }
  //   }

  //   document.addEventListener('mousemove', controlScrollnMouse);


  //   // document.addEventListener('mousemove', controlTopMouse);

  // }, [])

  const {
    AIGenCall,
    userPromtNextChapter,
    AIPromptNextChapter,
    refreshStory,
    refreshImage,
    isLoading,
    error,
  } = useCreateStory();

  return (
    <>
      <div className='create-control-nav-container'>
        <>
        <div className='create-control-button-container'>
            <CreateButton selectedButton={selectedButton.current} createFunct={() => AIPromptNextChapter()} font={"phage-rough"} value="You write the next chapter" className="genre-button" />
            <CreateButton selectedButton={selectedButton.current} createFunct={() => refreshImage()} font={"rye"} value="Refresh the Picture" className="genre-button" />
            <CreateButton selectedButton={selectedButton.current} createFunct={() => refreshStory()} font={"flavors"} value="Refresh the Text" className="genre-button" />
            {/* <NavButton onClick={fetchByGenre("Western")} value="Western" className="genre-button" /> */}
        </div>
        <div className='create-control-user-prompt-input'>
          <UserPromptInput userPromtNextChapter={userPromtNextChapter} isLoading={isLoading} />
        </div>
        {error && <div className="error">{error}</div>}
        </>
      </div>
    </>
  );
}

export default CreateStoriesControlPanel;