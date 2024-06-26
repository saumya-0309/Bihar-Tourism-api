const prisma = require("../prisma");
const CookieToken = require("../utils/cookieToken");
const { getuser } = require("../utils/jwtAuth");
const bcrypt = require('bcrypt');

const signup = async (req , res , next) => {
    const {name , email , password } = req.body;
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            error:"please enter all feilds"
        })
    }

    const data = await prisma.user.findUnique({
        where:{
            email:email,
        }
    })

    if(data){
        return res.json({
            success:false,
            error:"username already exist"
        })
    }

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hash,
        }
    });
    CookieToken(user , res , next);
}

const loginuser = async (req , res , next) => {
    const {email , password} = req.body;
    if(!email || !password){
        return res.json({
            "success":false,
            "error":"please enter all fields"
        });
    }

    const data = await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    if(!data){
        return res.json({
            success:false,
            error:"user not exist"
        });
    }

    const compare = bcrypt.compareSync(password, data.password);

    if(!compare){
        return res.json({
            success:false,
            error:"email or password wrong"
        })
    }

    CookieToken(data , res , next);
    next();
}


const authUser = (req , res , next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.headers.cookie.split('=')[1];
    if(!token) return res.json({success:false , "error":"user is not authourized"});
    const user = getuser(token);
    return res.json({success:true , user});
}

const authAdmin = (req , res , next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // const token = req.headers.cookie.split('=')[1];
    if(!token) return res.json({success:false , "error":"token is not Valid"});
    const user = getuser(token);
    if(user.role !== "ADMIN") return res.json({success:false , "error":"user is not admin"});
    req.user = user;
    next();
}

const addadmin = async (req, res , next) => { 
    const {name , email , password  , addadminPassword} = req.body;
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            error:"please enter all feilds"
        })
    }

    const data = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(data){
        return res.json({
            success:false,
            error:"username already exist"
        })
    }
    
    if(addadminPassword !== process.env.SECRET_KEY_TO_ADD_ADMIN) {
        return res.status(400).json({
            success:false,
            error:"invalid add admin password"
        })
    }

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hash,
            role:"ADMIN"
        }
    });
    CookieToken(user , res , next);
}


module.exports = {signup , authUser , loginuser , addadmin , authAdmin};