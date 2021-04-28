
import {useState, useEffect} from 'react'
import axios from 'axios'

export default async function useConnection(){
   const [state, setState] = useState({connection: null})
   async function connect(){
      const {data:{connection}} = await axios.get('/api/connect')
      setState(prev => ({...prev, connection}))

   }
   useEffect(()=>{
      connect()
   }, [])

   return state

}
