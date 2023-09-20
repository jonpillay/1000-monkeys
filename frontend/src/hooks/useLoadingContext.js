import { LoadingContext } from "../context/LoadingContext";
import { useContext } from "react";

export const useLoadingContext = () => {
  const context = useContext(LoadingContext)

  if (!context) {
    throw Error('must be inside authContextProvider to use')
  }

  return context
}