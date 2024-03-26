import React, { useState, useEffect } from 'react'
import { BsCaretRightFill } from "react-icons/bs";

const Chat = ({ socket, roomId, username }) => {

    const [currentMsg, setcurrentMsg] = useState("")
    const [allMessages, setAllmessages] = useState([]);

    const sendMessage = async () => {

        if (currentMsg !== " ") {
            const Msgdata = {
                roomId: roomId,
                message: currentMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                author: username,
            };
            await socket.emit("send_message", Msgdata)
            setcurrentMsg('')
        }
    }

    useEffect(() => {

        socket.on("receive_message", (data) => {
            console.log("Front End ",data)
            // setAllmessages((list)=>{[...list,data]})
        })


    }, [socket])



    return (
        <>
            <div className='w-screen h-screen relative flex-col bg-slate-400  flex justify-center items-center '>
                <div className='font-bold text-xl  w-full text-center mb-5 '>Live Chat  </div>

                {/* Chat box  */}
                <div className='w-96 h-96 bg-blue-200 relative flex flex-col justify-center items-center'>
                    <div className='text-lg h-10 flex items-center justify-center  w-full bg-green-600 text-center top-0 absolute ' >{username}</div>
                    <div className='bg-blue-300 w-full h-5 '>
                        {
                            allMessages.map((item) => {
                                return <p>{item.message}</p>
                            })
                        }
                    </div>
                    <div className='footer absolute bottom-0 w-full flex justify-between text-center items-center h-12  overflow-hidden '>
                        <input
                            onChange={(e) => setcurrentMsg(e.target.value)}
                            className='w-3/4  h-full px-3 outline-none border-none text-xl'
                            value={currentMsg}
                            type="text" />
                        <button
                            onClick={sendMessage}
                            className=' w-1/4 h-full border-none outline-none  text-center  bg-green-500 '>
                            <div className='flex w-full justify-center items-center text-lg '>
                                <BsCaretRightFill />
                            </div>
                        </button>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Chat