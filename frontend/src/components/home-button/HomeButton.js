import './HomeButton.css';
import HomeIcon from './typing-logo.png';
import Nav from '../nav/Nav'
import { useNavigate } from 'react-router';

const HomeButton = () => {
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
    <div className="home-button-container">
      <div className="home-button" onClick={goHome}>
        <img className="home-icon" src={HomeIcon} alt="home" />
      </div>
      <div className='title-container'>
        <div className='title'>1000 Monkeys</div>
      </div>
      <div>
        <Nav/>
      </div>
    </div>
  );
};

export default HomeButton;
