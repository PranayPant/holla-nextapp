
import WebSocket from 'ws'
import connect from 'next-connect'

const handler = connect()

handler.get(async function (req, res) {
   try {
      const ws = new WebSocket('wss://ulf88o2ck7.execute-api.us-east-2.amazonaws.com/test', null, {headers:{'userId':'ppant'}})
      console.log('Successfully established connection')
      res.status(200).json({connection: ws})
   } catch (err) {
      console.error('Error establishing connection:', err)
      res.status(500)
      res.send('Connection Error')
   }
})

export default handler
