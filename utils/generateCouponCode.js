const crypto = require('crypto');

const generateCouponCode = () => {
    return crypto.randomBytes(8).toString('hex');
};

module.exports = generateCouponCode;
