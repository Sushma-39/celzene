const jwt=require('jsonwebtoken');// npm instal jsonwebtoken
// middleware happens between client and server
// next is a node js inbuilt function which trif=ggers the API flow is move forward. when our task is  complete successfully inside the middleware we call yhe next function triggering the API flow to move forward
const secretKey="celzene"
const protect=async(req,res,next)=>{
    let token;
    // the bearer token is generally stored as-"Bearer"
    if(req.headers.authorization&& req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decoded=jwt.verify(token,secretKey)
            req.user=decoded;
            next();
        }catch(error){
            res.status(401).json({
                success:false,
                message:'Token is invalid or expired'
            })
        }
    }
    if(!token){
        res.status(401).json({
            message:'Token is invalid or expired'
        })
    }
}
// error handling- it is basically trying to catch an error inside our application gracefully 