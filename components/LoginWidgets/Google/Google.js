import styles from '../styles.module.css'
import { useRouter } from 'next/router'

export default function GoogleSignIn({ session }) {
   const { oauthRedirectUrl } = session
   const router = useRouter()
   function handleLogin() {
      router.replace(oauthRedirectUrl('google'))
   }
   return (
      <button className={styles.widget} onClick={handleLogin}>
         <img height="40px" width="40px" src="/icons/googleSignInLogo.jpg" />
         <div>Sign In With Google</div>
      </button>
   )
}
