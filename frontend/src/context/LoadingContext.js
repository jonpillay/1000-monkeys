import { createContext, useReducer, useEffect } from "react";

export const LoadingContext = createContext()

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      localStorage.setItem('isLoading', JSON.stringify(true))
      return { loading: true }
    case 'LOADED':
      localStorage.removeItem('isLoading')
      return { loading: false }
    default:
      return state
  }
}

export const LoadingContextProvider = ({ children }) => {
  const [state, loadingDispatch] = useReducer(loadingReducer, {
    loading: JSON.parse(localStorage.getItem('isLoading')) || false
  })

  useEffect(() => {
    const loading = JSON.parse(localStorage.getItem('isLoading'))
    if (loading == true) {
      loadingDispatch({ type: 'LOADING' })
    } else {
      loadingDispatch({ type: 'LOADED' })
    }
  }, [])

  return (
  <LoadingContext.Provider value={{...state, loadingDispatch}}>
    { children }
  </LoadingContext.Provider>
  )
}