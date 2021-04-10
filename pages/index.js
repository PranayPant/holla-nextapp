import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import useSession from '../utils/hooks/session'
import UnAuthenticated from '../components/UnAuthenticated'

export default function Home() {
   const { hasSession } = useSession()
   const router = useRouter()
   if (hasSession()) {
      router.replace('/dashboard')
   }
   return (
      <div className={styles.container}>
         <Head>
            <title>Holla</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            <UnAuthenticated />
         </main>

         <footer className={styles.footer}>
            <a
               href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
               target="_blank"
               rel="noopener noreferrer"
            >
               Powered by{' '}
               <img
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className={styles.logo}
               />
            </a>
         </footer>
      </div>
   )
}
