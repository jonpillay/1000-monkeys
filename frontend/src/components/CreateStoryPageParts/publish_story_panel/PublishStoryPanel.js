import "./PublishStoryControlPanel.css"

import { useState, useRef } from "react";
import { useCreateStory } from "../../../hooks/useCreateStory";
import { useSanitiseInput } from "../../../hooks/useSanitiseInput";

import ForbiddenLogo from "../../../img/forbidden.png"

const PublishStoryControlPanel = () => {

  const [error, setError] = useState("")

  const {sanitiseInput} = useSanitiseInput()

  const title = useRef()

  const handleSubmit = async (e) => {

    e.preventDefault()

    const cleanCheck = await sanitiseInput(prompt.current.value)

    if (cleanCheck == true) {

      console.log("Passed")

      // Needs to be a usePublishStory hook
      // await userPromtNextChapter(prompt.current.value)

    } else {
      setError("Please Check Our Community Standards")
      setTimeout(() => {
        setError("")
      }, 1500)
      console.log("Invlaid input")

    }

  }

  return (
    <>
      <div className="publish-story-input-container">
        <form className="publish-story-input-form" onSubmit={handleSubmit}>
          <div className="publish-story-input-title-container">
            <div className="publish-story-input-title">Publish Your Story?</div>
          </div>
          <div className="publish-story-text-input-container">
            <div>
              <input type="text" className="publish-story-input-box" ref={title} placeholder="Give it a title..."/>
            </div>
            <>
            {! error ? 
              <div className="publish-story-input-submit-container">
                <button disabled={isLoading} className="publish-story-input-button" id="publish-story-input-submit-button" type="submit">Publish</button>
              </div>
              :
              <div className="publish-story-input-submit-container">
                <img className="forbidden" src={ForbiddenLogo}/>
              </div>
              }
            </>
          </div>
        </form>
      </div>
    </>
  )
}

export default PublishStoryControlPanel