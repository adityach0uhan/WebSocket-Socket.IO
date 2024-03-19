import express from "express"
import http from 'http'
import cors from 'cors';
import {Server} from 'socket.io'

const app = express();
const server = http.createServer(app);
app.use(cors());


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173/",
        methods:['POST','GET'],
    }
})

io.on("connection", (socket) => {
    
    console.log(`Socket ${socket.id} is just connected`);

    socket.on("disconnect", () => {
        console.log(`User : ${socket.id} Disconnected`);
    })
    
})








server.listen(5000, () => {
    console.log(`server is live on port 5000`);
})