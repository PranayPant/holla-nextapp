import WebSocket from 'ws'
import connect from 'next-connect'
import AWS from 'aws-sdk'

const handler = connect()

function makeAWSConfig() {
   const config = { region: process.env.APP_AWS_REGION }
   if (process.env.ENV !== 'local') {
      config.accessKeyId = process.env.APP_AWS_ACCESS_KEY_ID
      config.secretAccessKey = process.env.APP_AWS_SECRET_ACCESS_KEY
   }
   return config
}

global.awsConfig = global.awsConfig || makeAWSConfig()

async function getAWSParam(name) {
   const response = await new AWS.SSM(global.awsConfig)
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
      console.log('Successfully established connection!', global.connection)
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
      console.log('Successfully removed connection!')
      res.status(200).json({ success: true })
   } catch (err) {
      console.error('Error removing connection:', err)
      res.status(500)
      res.send('Connection Remove Error').json({ success: false })
   }
})

export default handler
