// routes/users.js
const express = require('express');
const router = express.Router();
const { User } = require('../models/index'); // Ensure correct import
const { authenticate } = require('../middleware/auth');



module.exports = router;