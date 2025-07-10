import {GumletPlayer} from '@gumlet/react-embed-player'

const GumletVideoPlayer = (props) => {

  const videoID = props.videoID

 return (

  <GumletPlayer
    videoID={videoID}
    title="Gumlet Player Example"
    // style={{height: "300%", width: "100%", position:"relative"}}
    schemaOrgVideoObject={{"@context":"https://schema.org","@type":"VideoObject","name":"Gumlet","description":""}}
    autoplay={false}
    preload={false}
    muted={false}
  />

 )

}

export default GumletVideoPlayer