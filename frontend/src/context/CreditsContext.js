import { createContext, useReducer, useEffect } from 'react'

import { useAuthContext } from '../hooks/useAuthContext'

export const CreditsContext = createContext()

export const CreditsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      localStorage.setItem('credits', action.payload)
      return {credits: action.payload}
    default:
      return state
  }
}

export const CreditsContextProvider = ({ children }) => {

  const [state, creditDispatch] = useReducer(CreditsReducer, {
    credits: null
  })

  const { authUser } = useAuthContext();
  
  useEffect(() => {
    const credits = localStorage.getItem('credits')
    if (credits && authUser) {
      creditDispatch({ type: 'UPDATE', payload: credits })
    } 
  }, [])

  return (
    <CreditsContext.Provider value={{...state, creditDispatch}}>
      {children}
    </CreditsContext.Provider>
  )
}