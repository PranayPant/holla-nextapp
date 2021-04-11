import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { redirectToOauth, jwt, handleGoogleLogout } from './utils'

export default function useSession() {
   const [state, setState] = useState({ user: null })
   const router = useRouter()

   function hasSession() {
      return state.user && state.user.id_token
   }

   async function loginWithOauth(client) {
      try {
         const code = router.asPath.split('?')[1].split('&')[0].split('=')[1]
         const response = await fetch(
            `${window.location.origin}/api/oauth/${client}`,
            {
               method: 'POST',
               body: JSON.stringify({
                  code,
               }),
            },
         )
         const data = await response.json()
         window.localStorage.setItem('id_token', data.id_token)
         window.localStorage.setItem('access_token', data.access_token)
         setState((prev) => ({
            ...prev,
            user: jwt(window.localStorage.getItem('id_token')),
         }))
         router.replace('/dashboard')
      } catch (err) {
         console.error('Error fetching oauth token:', err)
      }
   }

   async function loginWithGoogle() {
      await loginWithOauth('google')
   }

   function redirectUnauthenticated() {
      router.replace('/')
   }

   function redirectToGoogle() {
      redirectToOauth('google')
   }

   async function logoutFromGoogle() {
      setState((prev) => ({ ...prev, user: null }))
      await handleGoogleLogout()
   }

   return {
      state,
      hasSession,
      loginWithGoogle,
      redirectUnauthenticated,
      redirectToGoogle,
      logoutFromGoogle,
   }
}
