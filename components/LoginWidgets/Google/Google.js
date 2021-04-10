import styles from '../styles.module.css'
export default function GoogleSignIn() {
   return (
      <button className={styles.widget}>
         <img height="40px" width="40px" src="/icons/googleSignInLogo.jpg" />
         <div>Sign In With Google</div>
      </button>
   )
}
