import './InitialiseSystemPage.css'
import { useState, useEffect, useRef } from 'react'

const InitialiseSystemPage = (props) => {

  const fetchingSysInfo = props.fetchingSysInfo
  const fetchingSysInfoSuccess = props.fetchingSysInfoSuccess
  const setSysInfoLoading = props.setSysInfoLoading
  const loadSystemInfo = props.loadSystemInfo
  const sysInfoLoading = props.sysInfoLoading

  const sysInfoObj = props.sysInfoObj
  const setSysInfoObj = props.setSysInfoObj

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

    while (cursorBlinking && dot.current) {

      dot.current.textContent = dot.current.textContent ? '' : '.'

      await typePause(750)
    }

    cursorBlinkingRef.current = false;

  }

  useEffect(() => {

    if (!dot.current.textContent && sysInfoLoading) {
  
      dot.current.textContent = ''
  
      if (cursorBlinking == true) {
        toggleDot()
      }
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

  }

  const displayLabLine = async (text) => {
    // code for writing a single line of text.

    dot.current.textContent = ''

    consoleDisplay.current.textContent += "\nLAB\\>:"

    for (let i = 0; i < text.length; i++) {

      consoleDisplay.current.textContent += text[i]
      await typePause(35)

    }

    await typePause(300)

    setCursorBlinking(true)

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

    await typePause(300)

    setCursorBlinking(false)

    await typePause(200)

    await displayLabLine(" OH OH AH AH!")

    await typePause(200)

    cursorBlinkingRef.current = false

    setSysInfoLoading(false)

  }

  const displaySysInitFailMessage = async () => {

    await displayLine(" Sys Info Fetch Failed")
    
    await typePause(600)

    setCursorBlinking(false)

    await displayLine(" Lab Must Be Sleeping")
    
    await typePause(300)

    setCursorBlinking(false)

    await displayLine(" Retrying...")
    
    await typePause(5000)

    setCursorBlinking(false)

  }

  const retryLoadSystemInfo = async () => {
    consoleDisplay.current.textContent = " "
    loadSystemInfo()
    await displayIntro()
  }

  const displayIntro = async () => {

    await displayLine(" brrrrrr.... so cold!")
  
    await typePause(1000)

    setCursorBlinking(false)

    await displayLine(" System Initialising")
  
    await typePause(1500)

    setCursorBlinking(false)

    await typePause(100)

    await displayLine(" Contacting Lab")

    await typePause(2000)

    setCursorBlinking(false)

    await typePause(200)

    await displayLine(" Fetching Sys Info")

    setCursorBlinking(false)

    setIntroFinished(true)

  }

  useEffect(() =>{

    console.log("intro use Effect running")
    displayIntro()

  }, [])

  useEffect(() => {

    if (!introFinished) return;

    const checkSysInfoStatus = async () => {

      const { error, fetchingInfo, fetchSuccess  } = sysInfoObj

      if (introFinished) {
        if (fetchSuccess == true) {
          console.log("This is here")
          await displaySysInitSuccessMessage()
        } else if (fetchSuccess == false) {
          await displaySysInitFailMessage()
          setIntroFinished(false)
          await retryLoadSystemInfo()
        }
      }
    }


    checkSysInfoStatus()

  }, [sysInfoObj, introFinished])


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