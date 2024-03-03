import express from "express";
const app = express();
const port = 3000;


app.get('/',(req,res)=> {
    res.send("Server is live");
})

app.listen(port, () => {
    console.log(`Server is runnnig on port ${port}`);
})