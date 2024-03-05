import express from "express";
import { createServer } from 'http'
import {Server} from "socket.io"
const app = express();
const port = 3000;
const server= createServer(app)

app.get('/',(req,res)=> {
    res.send("Server is live");
})

const io = new Server(server);


server.listen(port, () => {
    console.log(`Server is runnnig on port ${port}`);
})