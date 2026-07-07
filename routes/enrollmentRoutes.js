const express = require('express');
const router = express.Router();

const enrollmentContoller = require('../Controllers/enrollmentController');
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');


router.post('/',authMiddleware,enrollmentContoller.enrollCourse);

router.get('/myCourses', authMiddleware,enrollmentContoller.myCourses);

router.get('/', authMiddleware,adminMiddleware,enrollmentContoller.getAllEnrollments);

router.delete('/:id', authMiddleware,adminMiddleware,enrollmentContoller.deleteEnrollment);

module.exports = router;