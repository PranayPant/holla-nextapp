const OAUTH_REDIRECT_URLS = {
   google: `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI}&response_type=code&scope=openid profile email`,
}

export function redirectToOauth(idp) {
   window.location.href = OAUTH_REDIRECT_URLS[idp]
}

export function validateToken(token) {
   return token !== null && token !== undefined
}
