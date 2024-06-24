const {Router} = require('express');
const { authAdmin } = require('../controllers/userControllers');
const { addBlog, getAllBlog, getBlogBySlug, getBlogByCityOrReligion } = require('../controllers/blogControllers');

const router = Router();

router.post('/addblog' , [authAdmin , addBlog]);

// router.post('/updateblog' , [authAdmin , approvedTour]);

router.get('/getallblog' , getAllBlog);

router.get('/getblogbyslug/:slug' , getBlogBySlug);

router.get('/suggestblog/:city/:religion/:id' , getBlogByCityOrReligion);

module.exports = router;