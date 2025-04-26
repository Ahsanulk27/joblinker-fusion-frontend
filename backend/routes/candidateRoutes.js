const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');
const candidateController = require('../controllers/candidateController');

router.use(authenticate, roleCheck('candidate'));

router.get('/profile', candidateController.getProfile);
router.patch('/profile', candidateController.updateProfile);
router.post('/apply/:jobId', candidateController.applyToJob);

module.exports = router;
