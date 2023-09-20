import { useContext } from "react"
import { LoadingContext } from "../context/LoadingContext"

export const useLoading = () => {

  const {dispatch} = useContext(LoadingContext)

  const clearLocalLoading = () => {
    localStorage.removeItem('isLoading')
  }

  const loading = async () => {
    await localStorage.setItem('isLoading', 'yes')
    dispatch({type: 'LOADING'}) 
  }

  const loaded = async () => {
    await clearLocalLoading()
    dispatch({type: 'LOADED'}) 
  }

  return {loading, loaded}

}