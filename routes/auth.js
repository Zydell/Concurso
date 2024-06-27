// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register/estudiante', authController.registerEstudiante);
router.post('/register/profesor', authController.registerProfesor);
router.post('/register/personaladmin', authController.registerAdmin);
router.post('/login', authController.login);

module.exports = router;
