let users={};
const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
const port=4005
const mongourl="mongodb+srv://198r1a05a3:a6pi9eDJEn5OJcTM@cluster0.yrj9qq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongourl,{});
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb Successfully");
})

const userRoute=require('./routers/userRoute')
app.use('/api',userRoute)
app.listen(port,()=>{
    console.log("my server has started on the port"+port)
})