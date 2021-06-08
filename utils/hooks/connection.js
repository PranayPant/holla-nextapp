import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useConnection() {
   async function connect(userId) {
      const {
         data: { success },
      } = await axios.post('/api/connection', { userId })
   }
   async function disconnect(userId) {
      const {
         data: { success },
      } = await axios.delete('/api/connection', { data: { userId } })
   }
   return { connect, disconnect }
}
