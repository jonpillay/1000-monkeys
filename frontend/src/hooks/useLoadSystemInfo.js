import { useState } from "react"
import { useDispatch } from "react-redux";
import { initiliseSystemInfo } from "../components/app/systemInfoSlice"

export const useLoadSystemInfo = () => {

  const reduxDispatch = useDispatch()

  const [ fetchingSysInfoError, setFetchingSysInfoError ] = useState()
  const [ fetchingSysInfo, setFetchingSysInfo ] = useState(true)

  const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

  const loadSystemInfo = async () => {

    setFetchingSysInfo(true)

    const response = await fetch(`${baseUrl}/initialise-sys`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // check her is response is 500 (server down/uncontactable)
    console.log(response)

    if (response.ok == false) {
      console.log("This fired though")
    }

    const JSONres = await response.json()

    if (!response.ok) {
      console.log("Response server down fired")
      console.log(JSONres)
      setFetchingSysInfoError(JSONres.error)
      setFetchingSysInfo(false)
    }

    if (response.ok) {
      console.log(JSONres)

      console.log(JSONres.sysInfo.AiEngineVer)

      const AiEngineVer = JSONres.sysInfo.AiEngineVer
      const characters = JSONres.sysInfo.characters
      const genres = JSONres.sysInfo.genres
      const artStyles = JSONres.sysInfo.artStyles

      reduxDispatch(initiliseSystemInfo(AiEngineVer, characters, genres, artStyles))
      
    }

  }

  return { loadSystemInfo, fetchingSysInfo }

}