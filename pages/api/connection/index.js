import WebSocket from 'ws'
import connect from 'next-connect'

const handler = connect()
let connection = null

handler.post(async function (req, res) {
   try {
      const userId = req.body.userId
      connection = new WebSocket(
         'wss://ulf88o2ck7.execute-api.us-east-2.amazonaws.com/test',
         null,
         { headers: { userId } },
      )
      console.log('Successfully established connection')
      res.status(200).json({ success: true })
   } catch (err) {
      console.error('Error establishing connection:', err)
      res.status(500)
      res.send('Connection Error').json({ success: false })
   }
})

handler.delete(async function (req, res) {
   try {
      const userId = req.body.userId
      if (!connection) throw new Error('Connection not yet established')
      connection.send(JSON.stringify({ action: 'logout', data: { userId } }))
      console.log('Successfully removed connection')
      res.status(200).json({ success: true })
   } catch (err) {
      console.error('Error removing connection:', err)
      res.status(500)
      res.send('Connection Remove Error').json({ success: false })
   }
})

export default handler
