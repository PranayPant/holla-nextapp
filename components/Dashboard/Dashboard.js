import { useEffect, useState } from 'react'

export default function Dashboard({ session, connFns }) {
   const { state, logoutFromGoogle } = session
   const { connect, disconnect, send } = connFns
   useEffect(() => {
      connect(state.user.email)
      return () => disconnect(state.user.email)
   }, [])
   return (
      <>
         Hello {JSON.stringify(state.user.name)}
         <div>
            <label>Send:</label>
            <input type="text" />
            <button
               className="btn-secondary"
               type="submit"
               onClick={() =>
                  send({
                     to: state.user.email,
                     message: 'Hey Man!',
                  })
               }
            >
               Send
            </button>
         </div>
         <button className="btn-primary" onClick={logoutFromGoogle}>
            Logout
         </button>
      </>
   )
}
