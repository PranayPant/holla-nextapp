import { useRouter } from 'next/router'
import { useEffect } from 'react'
export default function Login() {
   const router = useRouter()
   async function fetchOauthToken() {
      try {
         //const code = router.asPath.split('?')[1].split('&')[0].split('=')[1]
         const code = router.query['code']
         const response = await fetch(
            `${window.location.origin}/api/oauth/google`,
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
         router.replace('/dashboard')
      } catch (err) {
         console.error('Error fetching oauth token:', err)
      }
   }
   useEffect(() => {
      fetchOauthToken()
   }, [])
   return <>Logging In</>
}
