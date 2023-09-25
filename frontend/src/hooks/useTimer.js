import { useEffect } from "react";

export const useTimer = () => {

  const setTimer = (setState, endTime, localClear) => {

    // also needs a clear timeout

    const duration = endTime - Date.now()

    setTimeout(() => {
      console.log("This did fire")
      localStorage.removeItem(localClear)
      setState(false)
    }, duration);
    
  }

  return { setTimer }
}

// note to self, not sure if I needed to right this as a deconstructured hook