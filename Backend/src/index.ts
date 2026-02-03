import express from 'express'
import dotenv from "dotenv";
import cors from "cors";


const app = express();
app.use(express.json());
const PORT = 5000;
app.get('/', (req, res)=>{
    res.send("hello from server")
})

app.listen(PORT, ()=>{
    console.log(`🚀 Server running on port ${PORT}`)
})