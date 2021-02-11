const express = require('express');

const { registerCompany, signinCompany } = require('../controllers/company.js');

const router = express.Router();

router.post('/register', registerCompany);
router.post('/signin', signinCompany);

module.exports = router;
