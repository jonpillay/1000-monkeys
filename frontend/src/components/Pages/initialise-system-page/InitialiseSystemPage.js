import './InitialiseSystemPage.css'
import { useState, useEffect, useRef } from 'react'

const InitialiseSystemPage = (props) => {

  const fetchingSysInfo = props.fetchingSysInfo
  const fetchingSysInfoSuccess = props.fetchingSysInfoSuccess
  const setSysInfoLoading = props.setSysInfoLoading
  const retryLoadSystemInfo = props.retryLoadSystemInfo

  const consoleDisplay = useRef()
  const dot = useRef()

  const cursorBlinkingRef = useRef(false)

  const versionText = `The 1000m AI Mainframe\nVer 1.0.0. J. Pillay 2025`

  const [ cursorBlinking, setCursorBlinking ] = useState(false)
  const [ introFinished, setIntroFinished ] = useState(false)

  const typePause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const toggleDot = async () => {

    if (cursorBlinkingRef.current) return;

    cursorBlinkingRef.current = true;

    while (cursorBlinking) {

      dot.current.textContent = dot.current.textContent ? '' : '.'

      await typePause(750)
    }

    cursorBlinkingRef.current = false;

  }

  useEffect(() => {

    dot.current.textContent = ''

    if (cursorBlinking == true) {
      toggleDot()
    }

  }, [cursorBlinking])

  // code for writing a newline of text in console. Idea is to have a div and update the
  // htmlInnerText.

  const displayLine = async (text) => {
    // code for writing a single line of text.

    dot.current.textContent = ''

    consoleDisplay.current.textContent += "\nSYS\\>:"

    for (let i = 0; i < text.length; i++) {

      consoleDisplay.current.textContent += text[i]
      await typePause(35)

    }

    await typePause(300)

    setCursorBlinking(true)

    return

  }

  const displaySysInitSuccessMessage = async () => {

    await displayLine(" Sys Info Fetched")
    
    await typePause(1500)

    setCursorBlinking(false)

    await typePause(100)

    await displayLine(" System Initialised")

    await typePause(2000)

    setCursorBlinking(false)

    await typePause(200)

    await displayLine(" Lab Connection Made. Recieving Message")

    await typePause(2000)

    setCursorBlinking(false)

    await typePause(200)

    await displayLine(" OH OH AH AH!")

  }

  useEffect( async () =>{

    await displayLine(" System Initialising")
    
    await typePause(1500)

    setCursorBlinking(false)

    await typePause(100)

    await displayLine(" Contacting Lab")

    await typePause(2000)

    setCursorBlinking(false)

    await typePause(200)

    await displayLine(" Fetching Sys Info")

    setIntroFinished(true)

  }, [])

  useEffect(() => {

    if (fetchingSysInfoSuccess == true) {
      console.log("This is here")
      displaySysInitSuccessMessage()
    } else {
      consoleDisplay.current.textContent = ""
      retryLoadSystemInfo()
    }

  }, [introFinished])

  return (
    <>
    <div className='console-background'>
      <div className='version-container'>
        {versionText}
      </div>
      <div className='console-container' ref={consoleDisplay}>
      </div>
      <div className='dot-container' ref={dot}>
      </div>
    </div>
    </>

  )

}

export default InitialiseSystemPage