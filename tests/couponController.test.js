const mockDB = require('../config/mockDB');
const { generateCoupon, validateCoupon } = require('../controllers/couponController');

describe('Coupon Controller', () => {
    beforeEach(() => {
        mockDB.coupons = [];
    });

    test('should generate a coupon successfully', () => {
        const req = { body: { productId: '123', validDuration: 10 } };
        const res = {
            json: jest.fn(),
        };

        generateCoupon(req, res);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Coupon generated successfully',
                couponCode: expect.any(String),
                expiryTime: expect.any(Date),
            })
        );
    });

    test('should validate a valid coupon successfully', () => {
        const couponCode = 'valid-code';
        mockDB.coupons.push({
            productId: '123',
            couponCode,
            expiryTime: new Date(Date.now() + 60000),
            usedBy: null,
        });

        const req = {
            body: { couponCode, productId: '123', userId: 'user1' },
        };
        const res = {
            json: jest.fn(),
        };

        validateCoupon(req, res);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: 'Coupon validated successfully',
            })
        );
    });
});
