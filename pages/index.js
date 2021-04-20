import Head from 'next/head'
import styles from '../styles/Home.module.css'
import UnAuthenticated from '../components/UnAuthenticated'
import Dashboard from '../components/Dashboard'

export default function Home({ session }) {
   return (
      <div className={styles.container}>
         <Head>
            <title>Holla</title>
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            {session.state.user && <Dashboard session={session} />}
            {!session.state.user && <UnAuthenticated session={session} />}
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
