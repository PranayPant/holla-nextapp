function oauthRedirect_google() {
   return `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI}&response_type=code&scope=openid profile email`
}

export function handleLogin(idp) {
   const oauthUrl = oauthRedirect_google()
   window.location.href = oauthUrl
}

export function jwt(token) {
   return JSON.parse(atob(token.split('.')[1]))
}
