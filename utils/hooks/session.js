import { useEffect, useState } from 'react'
import { redirectToOauth } from './utils'

export default function useSession() {
   const [state, setState] = useState({ user: {} })

   function hasSession() {
      return state.user.id_token !== null && state.user.id_token !== undefined
   }

   function loginWithGoogle() {}

   return { state, hasSession }
}
