import { WarningsContext } from "../context/WarningsContext"
import { useContext } from "react";

export const useWarningsContext = () => {
  const context = useContext(WarningsContext)

  if (!context) {
    throw Error('must be inside warningsContextProvider to use')
  }

  return context
}