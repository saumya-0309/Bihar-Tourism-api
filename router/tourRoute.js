const {Router} = require('express');
const { bookTour, approvedTour, cancelTour, addTour } = require('../controllers/tourControllers');
const { authUser, authAdmin } = require('../controllers/userControllers');

const router = Router();

router.post('/booktour' , [authUser , bookTour]);

router.post('/approvedTour' , [authAdmin , approvedTour]);

router.post('/cancelTour' , [authUser , cancelTour]);

router.post('/addTour' , [authAdmin , addTour]);

module.exports = router;

