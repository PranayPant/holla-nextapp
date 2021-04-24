import '../styles/globals.css'
import useSession from '../utils/hooks/session'
import useConnection from '../utils/hooks/connection'

function MyApp({ Component, pageProps }) {
   const session = useSession()
   const {connection} = useConnection()
   return <Component {...pageProps} session={session} connection={connection} />
}

export default MyApp
