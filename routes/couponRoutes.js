const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const mockDB = require("../config/mockDB");

router.post('/generate', couponController.generateCoupon);
router.post('/validate', couponController.validateCoupon);

router.get("/logs", (req, res) => {
    res.status(200).json({
        message: "Request logs retrieved successfully",
        logs: mockDB.logs
    });
});

module.exports = router;
