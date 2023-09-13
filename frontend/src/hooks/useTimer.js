export const useTimer = () => {

  const setTimer = (setState, duration, localClear) => {

    // also needs a clear timeout

    setTimeout(() => {
      localStorage.removeItem(localClear)
      setState(false)
    }, duration);
    
  }

  return { setTimer }
}

// note to self, not sure if I needed to right this as a deconstructured hook