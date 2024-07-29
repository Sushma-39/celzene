const User=require('../models/userModel');
const jwt=require('jsonwebtoken')
// generate a token
const secretKey="celzene"
const generateToken=(id,role) => {
    return jwt.sign({id: id, role: role},secretKey,{
         expireIn:'24h'
    })
    
}
exports.createUser=async(req,res)=>{
    try{
        const{name,email,role,password}=req.body;
    //user is a mongodb document
        const user=new User({
            name:name,
            email:email,
            role:role,
            password:password
        });
    //save this user inside mongodb we are inserting the user mongodb document inside user mongodb collevtion
        await user.save();
    // generate the token of the user who has been register on library mangement system
        const token=generateToken(user._id,user.role)
        res.status(201).json({
            success:true,
            token: token,
            data:user
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }

    
}   




exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.frindOne({email: email})
        if(user && await user.matchPassword(password)){
            const token=genaerateToken(user._id,user.role);
            res.status(201).json({
                success:true,
                token:token,
                data:user
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
}
exports.getAllUsers=async(req,res)=>{
    try{
        const users=await User.find({})
        res.status(200).json({
            success:true,
            data:users
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
    
}
exports.updateUsers=async(req,res)=>{
    const{id}=req.params
    const{name,email}=req.body
    try{
        const user=await User.findByIdAndUpdate(id,{name:name,email:email})
        res.status(200).json({
            success:true,
            data:user
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
    
}
