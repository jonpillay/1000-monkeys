import { CreditsContext } from "../context/CreditsContext";
import { useContext } from "react";

export const useCreditsContext = () => {
  const context = useContext(CreditsContext)

  if (!context) {
    throw Error('must be inside creditsContextProvider to use')
  }

  return context
}