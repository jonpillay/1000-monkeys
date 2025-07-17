import './Header.css';
import HomeIcon from '../../../img/typing-logo.png';
import Nav from '../nav/Nav'
import { useNavigate } from 'react-router';
import { useLoadingContext } from '../../../hooks/useLoadingContext';
import { useEffect, useState } from 'react';


import { resetStoryBookSlice } from "../../CreateStoryPageParts/story-book-create/storyBookSlice";
import { resetSysInfo, resetStorySysInfo } from "../../Pages/create-stories-page/storyBookSysInfoSlice";

import { useStoryContext } from "../../../hooks/useStoryContext";
import { useDispatch } from "react-redux";
import { Tooltip } from 'react-tooltip'

const Header = () => {

  const { loading } = useLoadingContext()
  const navigate = useNavigate()

  const { dispatch } = useStoryContext()


  const [showHeaderMouse, setShowHeaderMouse] = useState(false)

  const reduxDispatch = useDispatch()

  useEffect(() => {
    const headerScroll = (event) => {
      if (window.scrollY > window.innerHeight/8 && event.clientY < window.innerHeight/4) {
        setShowHeaderMouse(true)
      } else {
        setShowHeaderMouse(false)
      }
    };

    window.addEventListener('scroll', headerScroll);
    window.addEventListener('mousemove', headerScroll);

    return () => {
      window.removeEventListener('scroll', headerScroll);
      window.removeEventListener('mousemove', headerScroll);
    }
  }, [])

  const endStory = async () => {
    await reduxDispatch(resetStorySysInfo())
    await reduxDispatch(resetStoryBookSlice())
    await localStorage.removeItem('storyPages')
    await localStorage.removeItem('sysInfo');
    await localStorage.removeItem('userChoices');
    await localStorage.removeItem('GPTPromptHistory');
    await localStorage.removeItem('localGPTPromptHistory');


    await dispatch({type: "END", payload: null})

    navigate("/");
  }

  return (
    <>
    { !loading  ? (
        <div className={showHeaderMouse ? 'header-container active' : 'header-container'}>
          <button className="home-button" onClick={endStory} disabled={loading}>
            <Tooltip id="home-button-tooltip" />
            <img className="home-icon" src={HomeIcon} alt="home" data-tooltip-id="home-button-tooltip" data-tooltip-content="To Homepage"/>
          </button>
          <div className='title-container'>
            <div className='title'>1000 Monkeys</div>
          </div>
          <Nav />
        </div>
    ) : (
      <div className="spacer"></div>
    ) }
    </>


  );
};

export default Header;
