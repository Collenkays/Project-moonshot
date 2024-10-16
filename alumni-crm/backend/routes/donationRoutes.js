const express = require('express');
const { makeDonation, getDonationStats } = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, makeDonation);
router.route('/stats').get(protect, getDonationStats);

module.exports = router;