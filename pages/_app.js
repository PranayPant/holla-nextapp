import { useState } from 'react'

import '../styles/globals.css'
import useSession from '../utils/hooks/session'
import useConnection from '../utils/hooks/connection'

function MyApp({ Component, pageProps }) {
   const session = useSession()
   const connFns = useConnection()
   return <Component {...pageProps} session={session} connFns={connFns} />
}

export default MyApp
