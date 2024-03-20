import React, { useState, useEffect, useMemo } from 'react'
import io from 'socket.io-client'

const App = () => {
  
  const socket = io.connect("http://localhost:5000/")
  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")
 
  const joinRoom = () => {
    setUsername("")
    setRoomId("")
  }



  return (
    <>
      <div className='flex justify-center items-center flex-col w-screen h-screen'>


        <div className='w-70 flex justify-center items-center flex-col w-80 border-spacing-1 rounded-lg h-80 gap-3 bg-blue-500'>

          <input type="text" className='p-2 m-1 text-lg border-none outline-none rounded' placeholder='Username....' value={username} onChange={(e)=>setUsername(e.target.value)}/>

          <input type="text" className='p-2 m-1 text-lg border-none outline-none rounded' placeholder='Room Id.....' value={roomId} onChange={(e)=>{setRoomId(e.target.value)}}/>

          <button className='p-1 bg-green-500 w-40 m-1 text-lg border-none outline-none rounded' onClick={joinRoom}>Join Room</button>


        </div>

      </div>
    </>
  )
}

export default App