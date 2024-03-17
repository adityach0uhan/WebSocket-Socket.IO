import React, { useState } from 'react'
import { useEffect } from 'react'
import io from 'socket.io-client'

const App = () => {

  const [userName, setuserName] = useState("")

  const handelSubmit = () => {
    alert(userName)
    setuserName("")
  }

  const socket = io("http://localhost:5000/")
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected 🙂 ")
    })
    socket.on("hello", (s) => {
      console.log(s)
    })


  }, [])


  return (
    <>
      <div className='h-screen w-screen bg-blue-200 flex justify-center items-center flex-col gap-4'>
        <input type="text" value={userName} onChange={(e)=>setuserName(e.target.value)} className='border-none outline-none border-2 rounded-lg p-4 m-2 w-60 h-8 ' />
        <button className=' outline-none rounded-lg bg-blue-500 w-60 h-8 ' onClick={()=>handelSubmit()}>Join Chat</button>
        
      </div>
    </>
  )
}

export default App