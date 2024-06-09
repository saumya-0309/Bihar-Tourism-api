const jwt = require('jsonwebtoken');

const getToken = (user) => {
    return jwt.sign({...user} , "amitkumar");
}

const getuser = (token) => {
    return jwt.verify(token , "amitkumar");
}

module.exports = {getToken , getuser};