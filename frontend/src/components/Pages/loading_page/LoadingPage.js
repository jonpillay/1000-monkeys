import './LoadingPage.css'

import LoadingText from '../../loading-text/LoadingText';
import LoadingBlurb from '../../loading-blurb/LoadingBlurb';

const LoadingPage = () => {
  return (
    <div className="loading-page-container">
      <LoadingText/>
      <LoadingBlurb/>
    </div>
  )
}

export default LoadingPage;