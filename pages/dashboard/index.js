import { useEffect, useState } from 'react'
import useSession from '../../utils/hooks/session'

export default function Dashboard() {
   const {
      hasSession,
      state,
      redirectUnauthenticated,
      logoutFromGoogle,
   } = useSession()
   useEffect(() => {
      console.log(state)
   }, [state.user])

   return (
      <>
         Hello {JSON.stringify(state.user)}
         <button onClick={logoutFromGoogle}>Logout</button>
      </>
   )
}
