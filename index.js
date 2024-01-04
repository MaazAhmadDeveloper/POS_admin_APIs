import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import usersRouter from "./routes/users.js";
import userDataRouter from "./routes/data.js";

//Connect with MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/adminFivePOSdb").then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    // console.log(err.message);
});

const app = express();

app.get("/",(req, res)=>{
    res.send("hello world");
})

//middlewares
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));


app.use('/api/users/', usersRouter);
app.use('/api/userdata/', userDataRouter);

app.listen(3001, ()=>{
    console.log("server is running on port 3001");
})