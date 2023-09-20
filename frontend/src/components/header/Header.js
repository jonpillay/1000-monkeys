import './Header.css';
import HomeIcon from './typing-logo.png';
import Nav from '../nav/Nav'
import UserPanel from '../user-panel/UserPanel';
import { useNavigate } from 'react-router';
import { useLoadingContext } from '../../hooks/useLoadingContext';

const Header = () => {

  const { loading } = useLoadingContext()

  const navigate = useNavigate()
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
    <div className="header-container">
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
