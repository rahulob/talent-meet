import express from 'express';
import {ENV} from "./lib/env.js";
import { connectDB } from './lib/db.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({msg: "Api is up and running"});
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, ()=>{
            console.log(`✅ Server started on port ${ENV.PORT}`);
        })
    } catch (error) {
        console.log("❌ Error starting server", error);
        process.exit(1);
    }
}

startServer(); 