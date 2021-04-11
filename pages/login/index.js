import { useEffect } from 'react'
import useSession from '../../utils/hooks/session'
export default function Login() {
   const { loginWithGoogle } = useSession()
   useEffect(() => {
      loginWithGoogle()
   }, [])
   return <>Logging In</>
}
