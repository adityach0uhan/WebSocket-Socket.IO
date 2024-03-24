import express from "express"
import http from 'http'
import cors from 'cors';
import { Server } from 'socket.io'
import { cachedDataVersionTag } from "v8";

const app = express();
const server = http.createServer(app);
app.use(cors());


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`Socket : ${socket.id} Connected 👍 `);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ${socket.id} , joined the room : ${data}`)
    })

    socket.on("send_message", (data) => {
        console.log("backend", data);
        socket.to(data.room).emit("receive_message",data)
    })


    socket.on("disconnect", () => {
        console.log(`Socket : ${socket.id} Disconnected 👎 `);
    })

})


app.get("/", (req, res) => {

    res.send("Hello this is the home route")

})







server.listen(5000, () => {
    console.log(`server is live on port 5000`);
})