import { LoadingContext } from "../context/LoadingContext"

import { useState } from "react";

export const useHideHeader = () => {

  const [hideHeader, setHideHeader] = useState(false)

  const headerScroll = () => {
    if (window.scrollY > 50) {
      setHideHeader(true)
    } else {
      setHideHeader(false)
    }
  };

  const headerMouse = (Mpos) => {
    if (Mpos.clientY < 70) {
      setHideHeader(false)
    } else {
      setHideHeader(true)
    }
  }

  window.addEventListener('scroll', headerScroll);

  document.addEventListener('mousemove', headerMouse);

  return {hideHeader}
}