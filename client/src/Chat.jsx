import React, { useState, useEffect } from 'react'
import { BsCaretRightFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
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
            setAllmessages((newMessage) => [...newMessage, Msgdata])
            setcurrentMsg('')
        }
    }

    useEffect(() => {

        socket.on("receive_message", (data) => {

            setAllmessages((newMessage) => [...newMessage, data])


        })


    }, [socket])



    return (
        <>

            <div className='w-screen h-screen relative flex-col  flex justify-center items-center '>
                <div className='font-bold text-xl  w-full text-center mb-5 '>Live Chat  </div>

                {/* Chat box  */}
                <div className='w-80 h-96 border-black border p-2 overflow-hidden border-1 relative flex flex-col justify-center items-center'>
                    <div className='text-lg h-8 flex items-center justify-center  w-full bg-black text-white text-center top-0 absolute capitalize ' >{username}</div>
                    <div className=' overflow-y-scroll w-full h-80 p-1 m-2  '>
                        {
                            allMessages.map((item, index) => {
                                return (
                                    <div key={index} className=
                                        {
                                            (username !== item.author) ?
                                                'p-2 bg-green-300 min-w-min flex flex-col rounded overflow-hidden min-h-10 my-1'
                                                :
                                                'p-2 bg-blue-300 min-w-min flex flex-col rounded overflow-hidden min-h-10 my-1'
                                        }>
                                        <div className='message p-0 m-0 min-w-min '>
                                            <p className='messageText p-0 m-0 min-w-min' >{item.message}</p>
                                        </div>
                                        <div className=' mb-1 block min-w-min'>
                                            <p className='extraSmallText capitalize min-w-min flex justify-end gap-1 items-center'><FaUser />{item.author} : <IoIosTime />{item.time}</p>
                                        </div>
                                    </div>
                                )

                            })
                        }
                    </div>
                    <div className='footer absolute bottom-0 w-full flex justify-between text-center items-center h-8  overflow-hidden '>
                        <input
                            onChange={(e) => setcurrentMsg(e.target.value)}
                            className='w-3/4  h-full px-3 outline-none border-none '
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