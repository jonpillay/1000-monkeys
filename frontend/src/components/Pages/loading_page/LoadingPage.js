import './LoadingPage.css'

import LoadingText from '../../LoadingPageParts/loading-text/LoadingText';
import LoadingBlurb from '../../LoadingPageParts/loading-blurb/LoadingBlurb';

const LoadingPage = () => {
  return (
    <div className="loading-page-container">
      <LoadingText/>
      <LoadingBlurb/>
    </div>
  )
}

export default LoadingPage;