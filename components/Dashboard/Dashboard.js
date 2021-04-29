import { useEffect, useState } from 'react'

export default function Dashboard({ session, connFns }) {
   const { state, logoutFromGoogle } = session
   const { connect, disconnect } = connFns
   useEffect(() => {
      connect(state.user.name)
      return () => disconnect(state.user.name)
   }, [])
   return (
      <>
         Hello {JSON.stringify(state.user.name)}
         <button className="btn-primary" onClick={logoutFromGoogle}>
            Logout
         </button>
      </>
   )
}
