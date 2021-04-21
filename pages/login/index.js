import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login({ session }) {
   const router = useRouter()
   useEffect(() => {
      session.loginWithGoogle()
   }, [])

   useEffect(() => {
      if (session.state.user) {
         router.replace('/')
      }
   }, [session.state.user])

   return <>Logging In</>
}
