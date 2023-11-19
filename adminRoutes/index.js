const router = require('express').Router();

const connectionResolver= require('../middlewares/connectionResolver');

router.use('/', connectionResolver.setAdminDb, require('./admin.route'));
router.use('/vendor', connectionResolver.setAdminDb,require('./vendor.route'));
router.use('/rewardify',require('./rewardify.route'));
router.use('/genuine',require('./genuinemark.route'));
router.use('/rewardifyUsage',require('./rewardifyUsage.route'));
router.use('/gmUsage',require('./genuineMarkUsage.route'));
router.use('/industry',require('./industry.route'));
router.use('/transactionStatus',require('./transactionStatus.route'));
router.use('/dwan',require('./dwan.route'));
router.use('/dwanUsage',require('./dwanUsage.route'));
router.use('/scanAndWin',require('./scanAndWin.route'));
router.use('/scanAndWinUsage',require('./scanAndWinUsage.route'));
router.use('/dynamicForm',require('./dynamicForm.route'));




module.exports = router;