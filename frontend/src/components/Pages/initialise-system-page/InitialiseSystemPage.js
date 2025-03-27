import './InitialiseSystemPage.css'
import { useState, useEffect, useRef } from 'react'

const InitialiseSystemPage = (props) => {

  const fetchingSysInfo = props.fetchingSysInfo
  const fetchSysInfoSuccess = props.fetchSysInfoSuccess
  const setSysInfoLoading = props.setSysInfoLoading

  const consoleDisplay = useRef()
  const dot = useRef()

  const cursorBlinkingRef = useRef(false)

  const versionText = `The 1000m AI Mainframe\nVer 1.0.0. Est 2025`

  const [ cursorBlinking, setCursorBlinking ] = useState(false)

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

  const displayLoadingResults = async () => {



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

  }, [])

  useEffect(() => {

    if (fetchSysInfoSuccess == true) {
      // print sys info success and exit screen
    } else {
      // print retrying info and reset consoleDisplay
    }

  }, [fetchSysInfoSuccess])

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