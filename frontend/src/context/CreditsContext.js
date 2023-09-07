import { createContext, useReducer, useEffect } from 'react'

import { useAuthContext } from '../hooks/useAuthContext'

export const CreditsContext = createContext()

export const CreditsReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {credits: action.payload}
    default:
      return state
  }
}

export const CreditsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(CreditsReducer, {
    credits: null
  })

  const { authUser } = useAuthContext();
  console.log(authUser);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if (user) {
      dispatch({ type: 'UPDATE', payload: user.credits })
    } 
  }, [])

  console.log(`CreditsContext state:`, state)

  return (
    <CreditsContext.Provider value={{...state, dispatch}}>
      {children}
    </CreditsContext.Provider>
  )
}