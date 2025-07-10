import './VideoContainer.css'
import GumletVideoPlayer from "../GumletVideoPlayer/GumletVideoPlayer"

const VideoContainer = (props) => {

  const title = props.title
  const description = props.description
  const videoID = props.videoID

  return (

    <div className='intro-video-page-container'>
      <div className="video-descript-container">
        <div className='video-title'>{title}</div>
        <div className='video-description'>
          {description}
        </div>
      </div>
      <div className='video-container'>
        <GumletVideoPlayer videoID={videoID}/>
      </div>
    </div>

  )

}

export default VideoContainer