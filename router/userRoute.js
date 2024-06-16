const { Router } = require("express");
const { signup, loginuser, authUser, addadmin } = require("../controllers/userControllers");

const router = Router();

router.get('/' , (req, res) => {
    res.status(200).json({success:true});
})

router.get('/auth' , authUser);

router.post('/signup' , signup , (req , res) => {
    res.status(200).json(res.data);
})

router.post('/login', loginuser , (req , res) => {
    res.status(200).json({success:true , data:res.data});
})

router.post('/addAdmin', addadmin , (req , res) => {
    res.status(200).json(res.data);
});

module.exports = router;