import express from 'express';
import {ENV} from "./lib/env.js";

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({msg: "Api is up and running"});
})

app.listen(ENV.PORT, ()=>{
    console.log(`Server started on port ${ENV.PORT}`);
})