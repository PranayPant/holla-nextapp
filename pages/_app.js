import '../styles/globals.css'
import useSession from '../utils/hooks/session'

function MyApp({ Component, pageProps }) {
   const config = { authUrl: '/', unAuthUrl: '/' }
   const session = useSession(config)
   return <Component {...pageProps} session={session} />
}

export default MyApp
