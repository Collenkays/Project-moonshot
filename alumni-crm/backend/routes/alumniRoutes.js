const express = require('express');
const { getAlumniProfile, updateAlumniProfile, getAllAlumni } = require('../controllers/alumniController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/profile').get(protect, getAlumniProfile).put(protect, updateAlumniProfile);
router.route('/').get(protect, admin, getAllAlumni);

module.exports = router;