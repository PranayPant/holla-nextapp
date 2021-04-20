const OAUTH_REDIRECT_URLS = {
   google: `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI}&response_type=code&scope=openid profile email`,
}

export function oauthRedirectUrl(idp) {
   return OAUTH_REDIRECT_URLS[idp]
}

export function validateToken(token) {
   return token !== null && token !== undefined
}

export function jwt(token) {
   return JSON.parse(atob(token.split('.')[1]))
}

export async function handleGoogleLogout() {
   try {
      await fetch(
         `${
            process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REVOKE_ENDPOINT
         }?token=${window.localStorage.getItem('access_token')}`,
         {
            method: 'POST',
         },
      )
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('id_token')
   } catch (err) {
      console.log('Error revoking token:', err)
   }
}
