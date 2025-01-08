import { createContext, useReducer, useEffect } from 'react'

export const WarningsContext = createContext()

export const WarningsReducer = (state, action) => {
  switch (action.type) {
    case 'WARN':
      return {warnings: state+1}
    case 'CLEARWARNINGS':
      return {warnings: 0}
  }
}

export const WarningsContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(WarningsReducer, {
    user: JSON.parse(localStorage.getItem('warnings'))
  })

  return (
    <WarningsContext.Provider value={{...state, dispatch}}>
      {children}
    </WarningsContext.Provider>
  )
}