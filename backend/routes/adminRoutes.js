const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');
const adminController = require('../controllers/adminController');

router.use(authenticate, roleCheck('admin'));

router.get('/analytics', adminController.getAnalytics);

module.exports = router;
