import express from "express";
import { createServer } from 'http'
import { Server } from "socket.io"
const app = express();
const port = 5000;
import cors from "cors"
const server = createServer(app)

app.use(cors())
app.get('/', (req, res) => {
    res.send("Home route")
})

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173" ,
        methods: ["GET", "POST"],
        credentials: true, 
    },
});


io.on("connection", (socket) => {
    console.log(`Connected , User ID : ${socket.id}`,)
    socket.emit("hello", `hello user  ${socket.id} `)
    socket.broadcast.emit("hello",`${socket.id} has joined the server`)




    socket.on("disconnect", (socket) => {
        console.log(`${socket.id} Disconnected`)
    })

})




server.listen(port, () => {
    console.log(`Server is runnnig on port ${port}`);
})