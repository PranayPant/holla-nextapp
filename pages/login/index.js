import { useEffect } from 'react'
export default function Login({ session }) {
   useEffect(() => {
      session.loginWithGoogle()
   }, [])

   return <>Logging In</>
}
