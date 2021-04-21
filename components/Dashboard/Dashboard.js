import { useEffect, useState } from 'react'

export default function Dashboard({ session }) {
   const { state, logoutFromGoogle } = session

   return (
      <>
         Hello {JSON.stringify(state.user.name)}
         <button className="btn-primary" onClick={logoutFromGoogle}>
            Logout
         </button>
      </>
   )
}
