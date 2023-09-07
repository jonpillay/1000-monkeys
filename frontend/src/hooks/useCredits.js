// import { useAuthContext } from '../../hooks/useAuthContext';
// import { useEffect, useState } from "react"

// export const useCredits = () => {
//   const user = useAuthContext()

//   const [ credits, setCredits ] = useState(user.credits)

//   useEffect(()=> {
//     if (user) {
//       setCredits(user.credits)
//     }
//   }, [])

//   return { credits, setCredits }
// }