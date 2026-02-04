import express from 'express'
import cors from "cors";
import todoRoutes from './routes/todoRoutes';
import connectDB from './config/db';


const app = express();
app.use(express.json());
app.use(cors())
const PORT = process.env.PORT || 5000;
connectDB()

app.use('/todo', todoRoutes )

app.listen(PORT, ()=>{
    console.log(`🚀 Server running on port ${PORT}`)
})
