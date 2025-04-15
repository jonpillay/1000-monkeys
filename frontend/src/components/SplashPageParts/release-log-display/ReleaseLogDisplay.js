import './ReleaseLogDisplay.css'

import VersionUpdateDisplay from '../version-update-display/VersionUpdateDisplay'

import { useSelector } from 'react-redux'
import { selectAllReleaseLog } from '../../app/systemInfoSlice'

const ReleaseLogDisplay = () => {

  const releaseList = useSelector(selectAllReleaseLog)

  const releaseLog = releaseList.map(release => {

    return (
      <li key={(release.version)}>
        <VersionUpdateDisplay
          version={release.version}
          releaseDate={release.releaseDate}
          systemsUpdated={release.systemsUpdated}
          releaseNotes={release.releaseNotes}
          updatedBy={release.updatedBy}
        />
      </li>
    )
  })

  return (
    <div className='release-log-container'>
      <ul className='release-log-list'>
        {releaseLog}
      </ul>
    </div>
  )
}

export default ReleaseLogDisplay