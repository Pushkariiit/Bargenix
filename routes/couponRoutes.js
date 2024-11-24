const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

router.post('/generate', couponController.generateCoupon);
router.post('/validate', couponController.validateCoupon);

module.exports = router;
