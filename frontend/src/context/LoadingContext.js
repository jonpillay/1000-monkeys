import { createContext, useReducer, useEffect } from "react";

export const LoadingContext = createContext()

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      localStorage.setItem('isLoading', true)
      return { loading: true }
    case 'LOADED':
      localStorage.removeItem('isLoading')
      return { loading: null }
    default:
      return state
  }
}

export const LoadingContextProvider = ({ children }) => {
  const [state, loadingDispatch] = useReducer(loadingReducer, {
    loading: localStorage.getItem('isLoading') ? true : null
  })

  useEffect(() => {
    const loading = JSON.parse(localStorage.getItem('isLoading'))
    if (loading) {
      loadingDispatch({ type: 'BEGIN', payload: true })
    }
  }, [])

  return (
  <LoadingContext.Provider value={{...state, loadingDispatch}}>
    { children }
  </LoadingContext.Provider>
  )
}