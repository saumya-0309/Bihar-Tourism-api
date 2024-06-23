const {Router} = require('express');
const { authAdmin } = require('../controllers/userControllers');
const { addBlog, getAllBlog, getBlogBySlug } = require('../controllers/blogControllers');

const router = Router();

router.post('/addblog' , [authAdmin , addBlog]);

// router.post('/updateblog' , [authAdmin , approvedTour]);

router.get('/getallblog' , [authAdmin , getAllBlog]);

router.get('/getblogbyslug/:slug' , getBlogBySlug);

module.exports = router;