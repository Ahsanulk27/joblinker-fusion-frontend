const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { roleCheck } = require('../middlewares/roleMiddleware');

const employerController = require('../controllers/employerController');

router.use(authenticate, roleCheck('employer'));

router.post('/jobs', employerController.createJob);
router.get('/jobs', employerController.getMyJobs);

module.exports = router;
