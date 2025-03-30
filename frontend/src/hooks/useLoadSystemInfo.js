import { useState } from "react"
import { useDispatch } from "react-redux";
import { initiliseSystemInfo } from "../components/app/systemInfoSlice"

export const useLoadSystemInfo = () => {

  const retryPause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const reduxDispatch = useDispatch()

  const [ fetchingSysInfoError, setFetchingSysInfoError ] = useState()
  const [ fetchingSysInfo, setFetchingSysInfo ] = useState()
  const [ fetchingSysInfoSuccess, setFetchingSysInfoSuccess ] = useState()

  const [ sysInfoObj, setSysInfoObj ] = useState({ 
                                          error: null,
                                          fetchingInfo: false,
                                          fetchSuccess: false
                                        })

  const baseUrl = process.env.NODE_ENV === 'production' ? window.env.API_URL : '';

  const loadSystemInfo = async () => {

    setFetchingSysInfo(true)

    const response = await fetch(`${baseUrl}/initialise-sys`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // check here is response is 500 (server down/uncontactable)
    console.log(response)

    if (response.ok == false) {
      console.log("server not responding")
      setSysInfoObj({ 
        error: "Server Not Responding",
        fetchingInfo: false,
        fetchSuccess: false
      })
      setFetchingSysInfo(false)
    }

    const JSONres = await response.json()

    if (!response.ok) {
      console.log("Sys Info Data Fetch Failed")
      console.log(JSONres)
      setSysInfoObj({ 
        error: "Server Not Responding",
        fetchingInfo: false,
        fetchSuccess: false
      })
      setFetchingSysInfo(false)
    }

    if (response.ok) {

      console.log(JSONres)

      const AiEngineVer = JSONres.sysInfo.AiEngineVer
      const characters = JSONres.sysInfo.characters
      const genres = JSONres.sysInfo.genres
      const artStyles = JSONres.sysInfo.artStyles

      reduxDispatch(initiliseSystemInfo(AiEngineVer, characters, genres, artStyles))

      setSysInfoObj({ 
        error: "Sys Info Data Fetched",
        fetchingInfo: false,
        fetchSuccess: true
      })
      setFetchingSysInfo(false)
    }
  }

  // const retryLoadSystemInfo = async () => {

  //   // await retryPause(5000)
  //   loadSystemInfo()

  // }

  return { loadSystemInfo, fetchingSysInfo, fetchingSysInfoSuccess, fetchingSysInfoError, sysInfoObj, setSysInfoObj }

}