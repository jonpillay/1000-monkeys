import './ReleaseLogDisplay.css'

import VersionUpdateDisplay from '../version-update-display/VersionUpdateDisplay'

const ReleaseLogDisplay = () => {

  const releaseList =  [
    {
      "version": "1.0.0",
      "releaseDate": "2025-04-03",
      "systemsUpdated": ["AI", "FRNT", "DB", "API"],
      "releaseNotes": [
        "Initial release after initial developement. System information is fetched from JSON. badWordsList is a collection of banned words that are used in sanitise functs.",
        "unifiedCategories is a structured collection of the characters, genres, and art styles that are available to the user to create from.",
        "This is used to both populate the frontend with the available choices and also supply the Ai Engine with relevant information to build prompts.",
        "Versioning is a Semantic numbering approach, with the three numbers (1.0.4) representing Major.Minor.Patch structure.",
        "In relation to the 1000m a PATCH can be a bug fix in the frontend/backend, but can also be a change in the prompt information stored for characters/genres/style.",
        "MINOR can be functionality added to the frontend/backend, but can also be an addition of choices for the creation engine, as more significant ways in which information is stored/retrieved (The adition of this new information structure itself signifies a MINOR update.",
        "MAJOR updates can be both frontend/backend, but also in major updates in the Ai Engine creation pipeline and how prompts/material is generated."
      ],
      "updatedBy": "JP"
    },
    {
      "version": "1.1.0",
      "releaseDate": "2025-04-10",
      "systemsUpdated": ["API"],
      "releaseNotes": [
        "Addition of this releaseLog list of objects to the systemAssets JSON. This allows for a centralised release log that can be displayed across the frontend and in dev environments (GitHub etc)"
      ],
      "updatedBy": "JP"
    },
    {
      "version": "1.1.1",
      "releaseDate": "2025-04-10",
      "systemsUpdated": ["AI"],
      "releaseNotes": [
        "Updated some of the starterStylePrompts for style. Adding 'depicting the scene of ' to the style starter makes a gramatical/prompt generation between any of the artists mentioned and image generated.",
        "This is to avoid the artists being either included in the final image/or their own image influencing how characters are depicted."
      ],
      "updatedBy": "JP"
    }
  ]

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