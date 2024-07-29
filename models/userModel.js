const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');//npm install bcryptjs
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true// if this value is not present the entry wont be stored inside the database and it will throw an error
    },
    email:{
        type:String,
        require:true,
        unique:true//if a duplicate email comes to the db for storing or updating it will throw an error
    },
    role:{
        type:String,
        require:true,
        enum:['Admin','Student','Teacher']//if i pass any value inside the role other than admin,student,teacher it will throw an error
    },
    password:{
        type:String,
        require:true
    }
})
// write a function to that encrypt the password before saving it inside the database
userSchema.pre('save',async function(next){
    // call this function to do the operation of encrypting my pwd befor saving it inside db
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();// acts as middleware
})
// write a function that decrypts my pwd while comparing basically comparethe values of user actual password against its encrypted password stored by db
userSchema.methods.matchPassword=async function(enteredPassword){//entered pwd comng from req body
    return await bcrypt.compare(enteredPassword,this.password)
}
const User=mongoose.model('User',userSchema)
module.exports=User;