const router = require('express').Router();

router.use('/admin', require('./admin.route'));
router.use('/product', require('./product.route'));
router.use('/qr',require('./qr.route'));
router.use('/batch',require('./batch.route'));
router.use('/prodCategory',require('./productCategory.route'));
router.use('/prodSubCategory',require('./productSubCategory.route'));
router.use('/prodPoints',require('./productPoints.route'));
router.use('/categoryPoints',require('./categoryPoints.route'));
router.use('/vendorUser',require('./vendorUser.route'));
router.use('/userPermission',require('./userPermission.route'));
router.use('/rewardifyHistory',require('./rewardifyHistory.route'));
router.use('/gift',require('./gift.route'));
router.use('/giftRedemption',require('./giftRedemption.route'));
router.use('/setup',require('./companySetting.route'));


module.exports = router;