import GoogleSignIn from '../LoginWidgets/Google'
export default function UnAuthenticated({ session }) {
   return (
      <div>
         <GoogleSignIn session={session} />
      </div>
   )
}
