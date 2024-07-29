let users={};
const express=require('express');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
const port=4005
const mongourl="mongodb+srv://198r1a05a3:a6pi9eDJEn5OJcTM@cluster0.yrj9qq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongourl,{});
mongoose.connection.on('connected',()=>{
    console.log("conneced to mongodb Successfully");
})
app.post('/users',(req,res)=>{
    const{id,name,age}=req.body;
    users[id]={name,age}
    res.status(201).json({
        success:true,
        data:users
    })
})
app.put('/update/:id',(req,res)=>{
    const{id}=req.params
    const{name,age}=req.body
    users[id]={name,age}
    res.status(200).json({
        success:true,
        data:users
    })
})
app.get('/data',(req,res)=>{
    try{
        res.status(201).json({
            success:true,
            data:users
    
        })
    }
    catch(err){
        res.status(500).json({
            success:true,
            data:users
    
        })
    }
    
})
app.listen(port,()=>{
    console.log("my server has started on the port"+port)
})