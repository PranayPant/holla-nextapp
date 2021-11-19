import connect from 'next-connect'

const handler = connect()

handler.post(async function (req, res) {
   try {
      const { to, message } = req.body
      if (!global.connection) throw new Error('Connection not yet established')
      global.connection.send(
         JSON.stringify({ action: 'send', data: { to, message } }),
      )
      console.log('Successfully sent message!')
      res.status(200).json({ success: true })
   } catch (err) {
      console.error('Error sending message:', err)
      res.status(500)
      res.send('Message Send Error').json({ success: false })
   }
})

export default handler
