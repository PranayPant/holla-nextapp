import styles from '../styles.module.css'
import { useRouter } from 'next/router'
import useSession from '../../../utils/hooks/session'

export default function GoogleSignIn() {
   const router = useRouter()
   const { redirectToGoogle } = useSession()
   return (
      <button className={styles.widget} onClick={redirectToGoogle}>
         <img height="40px" width="40px" src="/icons/googleSignInLogo.jpg" />
         <div>Sign In With Google</div>
      </button>
   )
}
