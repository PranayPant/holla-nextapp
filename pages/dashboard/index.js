import { useEffect, useState } from 'react'
import { jwt } from '../../utils'

export default function Dashboard() {
   const [state, setState] = useState({ user: null })

   useEffect(() => {
      setState((prev) => ({
         ...prev,
         user: jwt(window.localStorage.getItem('id_token')),
      }))
   }, [])

   return <>Hello {JSON.stringify(state.user)}</>
}
