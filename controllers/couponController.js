const mockDB = require('../config/mockDB');
const generateCouponCode = require('../utils/generateCouponCode');

exports.generateCoupon = (req, res) => {
    const { productId, validDuration } = req.body;

    if (!productId || !validDuration || validDuration <= 0) {
        return res.status(400).json({ error: 'Invalid productId or validDuration' });
    }

    const couponCode = generateCouponCode();
    const expiryTime = new Date(Date.now() + validDuration * 60000);

    mockDB.coupons.push({ productId, couponCode, expiryTime, usedBy: null });

    res.json({ message: 'Coupon generated successfully', couponCode, expiryTime });
};

exports.validateCoupon = (req, res) => {
    const { couponCode, productId, userId } = req.body;

    if (!couponCode || !productId || !userId) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    const coupon = mockDB.coupons.find(
        (c) => c.couponCode === couponCode && c.productId === productId
    );

    if (!coupon) return res.status(404).json({ error: 'Coupon not found' });
    if (coupon.usedBy) return res.status(400).json({ error: 'Coupon already used' });
    if (new Date() > new Date(coupon.expiryTime)) return res.status(400).json({ error: 'Coupon expired' });

    coupon.usedBy = userId;
    res.json({ message: 'Coupon validated successfully', coupon });
};
