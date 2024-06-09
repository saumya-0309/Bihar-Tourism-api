const {Router} = require('express');
const { bookTour, approvedTour, cancelTour } = require('../controllers/tourControllers');
const { authUser, authAdmin } = require('../controllers/userControllers');

const router = Router();

router.post('/booktour' , [authUser , bookTour]);

router.post('/approvedTour' , [authAdmin , approvedTour]);

router.post('/cancelTour' , [authUser , cancelTour]);

module.exports = router;

