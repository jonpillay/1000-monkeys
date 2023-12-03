import './FetchControlPanel.css'
import NavButton from '../navbutton/NavButton';

import { useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuthContext";

const FetchStoriesControlPanel = (props) => {

  // import the callback from the FetchsStories and apply it to different genres etc... 

  const { user } = useAuthContext()

  const fetchByGenre = props.fetchByGenre

  return (
    <>
      <div className="filter-nav-container">
        <>
          <NavButton onClick={fetchByGenre("Western")} value="Western" className="genre-button" />
          {/* <NavButton onClick={fetchByGenre("Western")} value="Western" className="genre-button" /> */}
        </>
      </div>
    </>
  );
}

export default FetchStoriesControlPanel;