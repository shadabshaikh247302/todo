const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const morgan=require("morgan");
const dotenv=require("dotenv");
const { connectDB } = require("./config/db");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
dotenv.config({path:"./config/config.env"})
connectDB()
const app=express();
app.use(cors());
app.use(bodyParser.json({
    limit:"30mb"
}))
app.use(morgan("dev"));
app.get("/",(req,res)=>{
    try {
        res.send("Hello!")
    } catch (error) {
        console.log(error);
    }
})
app.use("/auth",authRouter);
app.use("/todo",todoRouter);
app.listen(process.env.PORT,()=>{
    console.log("Server is connected");
})