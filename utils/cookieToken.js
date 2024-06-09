const { getToken } = require("./jwtAuth")


const CookieToken = (user , res , next) => {
    const token = getToken(user);
    const options = {
        httpOnly:true
    }
    user.password = undefined;
    res.cookie("token" , token , options);
    res.data = {
        success:true,
        token:token,
        ...user
    }
    next();
}

module.exports = CookieToken;
