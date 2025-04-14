import './VersionUpdateDisplay.css'

import reactLogo from '../../../img/tech-badges/react-badge.svg'
import mongoLogo from '../../../img/tech-badges/mongo-badge.svg'
import expressLogo from '../../../img/tech-badges/express-badge.svg'
import nodeLogo from '../../../img/tech-badges/node-badge.svg'
import AiEngineLogo from '../../../img/favpng_infinite-monkey-theorem2.png'

const VersionUpdateDisplay = (props) => {

  const updatedSysList = props.systemsUpdated
  const releaseNotes = props.releaseNotes
  
  const renderBadges = (abrList) => {

    const renderedBadges = []

    for (let i = 0; i < abrList.length; i++) {
       
      switch(abrList[i]) {
        case "AI":
          const AIEngineUpdate = <div className='update-badge'><img className='tech-badge' src={AiEngineLogo}/></div>
          renderedBadges.push(AIEngineUpdate)
          break
  
        case "API":
          const APIUpdate = <div className='update-badge'><img className='tech-badge' src={expressLogo}/></div>
          renderedBadges.push(APIUpdate)
          break
  
        case "DB":
          const DBUpdate = <div className='update-badge'><img className='tech-badge' src={mongoLogo}/></div>
          renderedBadges.push(DBUpdate)
          break
  
        case "FRNT":
          const FRNTUpdate = <div className='update-badge'><img className='tech-badge' src={reactLogo}/></div>
          renderedBadges.push(FRNTUpdate)
          break
      }
    }
    return renderedBadges
  }

  const renderNoteParas = (releaseNotesUnformatted) => {

    const releaseNotesList = []

    for (let i = 0; i < releaseNotesUnformatted.length; i++) {

      const releaseNotesLi = <li className='release-note-li'>{releaseNotesUnformatted[i]}</li>

      releaseNotesList.push(releaseNotesLi)

    }

    return releaseNotesList

  }

  const systemsUpdatedFormattedList = renderBadges(updatedSysList)
  const formattedReleaseNotes = renderNoteParas(releaseNotes)

  return (

    <div className='version-update-container'>
      <div className='ver-date-container'>
        <div className='release-ver'>v{props.version}</div>
        <div className='release-date'>Released on: {props.releaseDate}</div>
      </div>
      <div className='updated-tech-container'>
        <div className='sys-updated-title'>Updated: </div>
        <div className='updated-tech-badges-container'>
          {systemsUpdatedFormattedList}
        </div>
      </div>
      <ul className='release-notes-list'>{formattedReleaseNotes}</ul>
      <div className='updated-by'>{props.updatedBy}</div>
    </div>

  )

}

export default VersionUpdateDisplay