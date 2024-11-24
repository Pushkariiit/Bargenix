const mockDB = require("../config/mockDB");
const generateCouponCode = require("../utils/generateCouponCode");

// Generate Coupon
exports.generateCoupon = (req, res) => {
    const { productId, validDuration } = req.body;

    if (!productId || !validDuration || validDuration <= 0) {
        return res.status(400).json({ error: "Invalid product ID or valid duration" });
    }

    const couponCode = generateCouponCode();
    const expiryTime = new Date(Date.now() + validDuration * 60 * 1000);

    // Save coupon to mock DB
    mockDB.coupons.push({
        productId,
        couponCode,
        expiryTime
    });

    // Log the request
    mockDB.logs.push({
        endpoint: "/api/coupons/generate",
        method: "POST",
        timestamp: new Date(),
        data: { productId, validDuration }
    });

    res.status(201).json({
        message: "Coupon generated successfully",
        couponCode,
        expiryTime
    });
};

// Validate Coupon
exports.validateCoupon = (req, res) => {
    const { couponCode, productId, userId } = req.body;

    if (!couponCode || !productId || !userId) {
        return res.status(400).json({ error: "Invalid input parameters" });
    }

    const coupon = mockDB.coupons.find(
        (c) => c.couponCode === couponCode && c.productId === productId
    );

    if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
    }

    if (coupon.usedBy) {
        return res.status(400).json({ error: "Coupon already used" });
    }

    if (new Date() > new Date(coupon.expiryTime)) {
        return res.status(400).json({ error: "Coupon has expired" });
    }

    // Mark coupon as used
    coupon.usedBy = userId;

    // Log the request
    mockDB.logs.push({
        endpoint: "/api/coupons/validate",
        method: "POST",
        timestamp: new Date(),
        data: { couponCode, productId, userId }
    });

    res.status(200).json({
        message: "Coupon validated successfully",
        coupon
    });
};
