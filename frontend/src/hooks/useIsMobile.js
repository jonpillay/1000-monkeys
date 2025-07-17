import { useState, useEffect } from "react";

export const useIsMobile = () => {

  const [isMobile, setIsMobile] = useState()

  useEffect(() =>{

    console.log("mobile check running")
    const uaMobile = navigator.userAgentData?.mobile
    const vpMobile = window.matchMedia("(max-width: 767px)").matches
    setIsMobile(uaMobile ?? vpMobile)

  })

  return isMobile

}