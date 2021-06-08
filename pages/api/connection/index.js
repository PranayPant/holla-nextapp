import WebSocket from 'ws'
import connect from 'next-connect'
import AWS from 'aws-sdk'

const handler = connect()

async function getAWSParam(name) {
   const response = await new AWS.SSM({ region: process.env.AWS_REGION })
      .getParameter({ Name: name, WithDecryption: true })
      .promise()
   const param = response.Parameter.Value
   return param
}

handler.post(async function (req, res) {
   try {
      const userId = req.body.userId
      const apiKey = await getAWSParam('/ws-api-demo/api/key')
      global.connection = new WebSocket(process.env.CHAT_API_URL, null, {
         headers: { 'x-websocket-userid': userId, 'x-api-key': apiKey },
      })
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
      if (!global.connection) throw new Error('Connection not yet established')
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
