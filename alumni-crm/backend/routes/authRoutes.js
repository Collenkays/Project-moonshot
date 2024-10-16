const express = require('express');
const { registerAlumni, loginAlumni } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerAlumni);
router.post('/login', loginAlumni);

module.exports = router;