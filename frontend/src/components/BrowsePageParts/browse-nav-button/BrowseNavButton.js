import "./BrowseNavButton.css"

import { useNavigate } from 'react-router';

const BrowseNavButton = () => {

  const navigate = useNavigate()

  const browseBooks = () => {

    navigate('/browse')

  }

  return (
    <div className='browse-nav-container'>
      <button className="submit-button" id="browse-button" type="submit" onClick={browseBooks}>Browse Stories</button>
    </div>
  )
}

export default BrowseNavButton