import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { oauthRedirectUrl, jwt, handleGoogleLogout } from './utils'

export default function useSession(config = {}) {
   const [state, setState] = useState({ user: null, hasSession: false })
   const router = useRouter()
   const { authUrl = '/', unAuthUrl = '/' } = config

   useEffect(() => {
      console.log('user changed:', state)
      if (state.user) {
         if (window.location.pathname !== authUrl) {
            router.replace(authUrl)
         }
      } else {
         if (window.location.pathname !== authUrl) {
            router.replace(unAuthUrl)
         }
      }
   }, [state.user])

   useEffect(() => {
      const idToken = window.localStorage.getItem('id_token')
      const user = idToken ? jwt(idToken) : null
      const hasSession = user ? true : false
      setState((prev) => ({
         ...prev,
         user,
         hasSession,
      }))
   }, [])

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
            user: jwt(data.id_token),
            hasSession: true,
         }))
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

   async function logoutFromGoogle() {
      setState((prev) => ({ ...prev, user: null }))
      await handleGoogleLogout()
   }

   return {
      state,
      hasSession,
      loginWithGoogle,
      redirectUnauthenticated,
      oauthRedirectUrl,
      logoutFromGoogle,
   }
}
