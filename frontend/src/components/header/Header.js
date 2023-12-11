import './Header.css';
import HomeIcon from './typing-logo.png';
import Nav from '../nav/Nav'
import UserPanel from '../user-panel/UserPanel';
import { useNavigate } from 'react-router';
import { useLoadingContext } from '../../hooks/useLoadingContext';
import { useEffect, useState } from 'react';

const Header = () => {

  const { loading } = useLoadingContext()
  const navigate = useNavigate()

  const [showHeaderMouse, setShowHeaderMouse] = useState(false)

  useEffect(() => {
    // const headerScroll = () => {
    //   if (window.scrollY > 28) {
    //     setShowHeaderMouse(true)
    //   }
    // };

    // window.addEventListener('scroll', headerScroll);

    const headerMouse = (Mpos) => {
      if (Mpos.clientY < 190) {
        setShowHeaderMouse(true)
      } else {
        setShowHeaderMouse(false)
      }
    }

    document.addEventListener('mousemove', headerMouse);
  }, [])

  const goHome = () => {
    setTimeout(function(){
      localStorage.removeItem("storyPages");
      localStorage.removeItem("GPTPromptHistory")
      localStorage.removeItem("userChoices");
      localStorage.removeItem("sysInfo");
    }, 200);

    navigate("/");
  };

  return (
    <div className={showHeaderMouse ? 'header-container active' : 'header-container'}>
      <button className="home-button" onClick={goHome} disabled={loading}>
        <img className="home-icon" src={HomeIcon} alt="home" />
      </button>
      <div className='title-container'>
        <div className='title'>1000 Monkeys</div>
      </div>
      {!loading && <Nav />}
    </div>
  );
};

export default Header;
