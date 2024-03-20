import React, { useState, useEffect, useMemo } from 'react'
import io from 'socket.io-client'

const App = () => {
  const socket = io.connect("http://localhost:5000/")
 

  return (
    <>
      <div className='w-screen h-screen flex-col flex justify-center items-center '>
        <div className='font-bold text-xl'>Live Chat  </div>
        <div className='w-96 h-96 bg-blue-200 flex flex-col justify-center items-center'>


          <div className='text-lg' >Header</div>
          <div>Messages</div>
          <div>Footer</div>
          

        </div>

     </div>
    </>
  )
}

export default App