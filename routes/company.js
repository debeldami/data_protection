const express = require('express');

const { registerCompany } = require('../controllers/company.js');

const router = express.Router();

router.post('/register', registerCompany);

module.exports = router;
