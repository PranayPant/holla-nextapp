import axios from 'axios'
import connect from 'next-connect'

const handler = connect()

handler.post(async function (req, res) {
   try {
      const code = JSON.parse(req.body).code
      const { data } = await axios({
         method: 'post',
         url: `${process.env.GOOGLE_OAUTH_TOKEN_ENDPOINT}?client_id=${process.env.GOOGLE_OAUTH_CLIENT_ID}&client_secret=${process.env.GOOGLE_OAUTH_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.OAUTH_REDIRECT_URI}&grant_type=authorization_code`,
         data: {},
      })
      console.log('Successfully fetched google oauth token')
      res.status(200).json(data)
   } catch (err) {
      console.error('Error fetching google oauth token:', err)
      res.status(500)
      res.send('Oauth Error')
   }
})

export default handler
