import './IntroVideoPage.css'
import VideoContainer from '../video-container/VideoContainer'
import IntroVideoDescription from './IntroVideoDescript.json'

const IntroVideoPage = () => {

  return (
    <>
      <div className='video-tab-container'>
        <VideoContainer title={"Chapter 1: "} description={IntroVideoDescription.Ch1} videoID="6845738d2ea48d13d4629744"/>
        <VideoContainer title={"Chapter 2: "} description={IntroVideoDescription.Ch2} videoID="686ed3f2ecbeed6c556d4f87"/>
        <VideoContainer title={"Chapter 3: "} description={IntroVideoDescription.Ch3} videoID="6845750ced94500acc4a74a8"/>
        <VideoContainer title={"Chapter 4: "} description={IntroVideoDescription.Ch4} videoID="6845753aed94500acc4a75be"/>
        <VideoContainer title={"Chapter 5: "} description={IntroVideoDescription.Ch5} videoID="684575862ea48d13d462a1d4"/>
        <VideoContainer title={"Chapter 6: "} description={IntroVideoDescription.Ch6} videoID="684575e40f8d7a0518531378"/>
      </div>
    </>

  )

}

export default IntroVideoPage