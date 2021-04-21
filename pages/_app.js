import '../styles/globals.css'
import useSession from '../utils/hooks/session'

function MyApp({ Component, pageProps }) {
   const session = useSession()
   return <Component {...pageProps} session={session} />
}

export default MyApp
