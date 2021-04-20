import { useEffect, useState } from 'react'
import useSession from '../../utils/hooks/session'

export default function Dashboard({ session }) {
   const { state, logoutFromGoogle } = session

   return (
      <>
         Hello {JSON.stringify(state.user.name)}
         <button onClick={logoutFromGoogle}>Logout</button>
      </>
   )
}
