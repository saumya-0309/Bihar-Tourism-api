const express = require('express');
const userRoute = require('./router/userRoute');
const tourRoute = require('./router/tourRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;
require('dotenv').config();
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use('api/user' , userRoute);
app.use('api/tour' , tourRoute);

app.get('/' , (req , res) => {
    res.json({success:true});
})

app.listen(port , () => {
    console.log("app is listen at port 8000");
})