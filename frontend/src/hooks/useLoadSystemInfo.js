import { useState } from "react"

export const useLoadSystemInfo = () => {

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

    const JSONres = await response.json()

    if (!response.ok) {
      setFetchingSysInfoError(JSONres.error)
      setFetchingSysInfo(false)
    }

    if (response.ok) {
      console.log(JSONres.sysInfo)
    }

  }

  return { loadSystemInfo, fetchingSysInfo }

}