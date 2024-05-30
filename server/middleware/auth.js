const jwt = require("jsonwebtoken");

exports.auth = async(req,res,next) => {
    try {
        //fetch data
        const token = req.cookies.token 
            || req.body.token 
            || req.header("Authorization").replace("Bearer ", ""); //as header automatically adds "Bearer " in the start of token
        
        //if token not found
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
        
        //verify token
        try {
            const payload = jwt.verify(token,process.env.JWT_KEY_SECRET);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();


    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }


}

exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.role !== "admin") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for admin',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}
