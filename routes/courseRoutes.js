const express = require('express');
const router = express.Router();

const courseContoller = require('../Controllers/courseController');
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');


router.get('/getAllCourses',authMiddleware,courseContoller.getAllCourses);

router.get('/:id', authMiddleware,courseContoller.getCourseById);


router.post('/', authMiddleware,adminMiddleware,courseContoller.createCourse);

router.put('/:id', authMiddleware,adminMiddleware,courseContoller.updateCourse);

router.delete('/:id', authMiddleware,adminMiddleware,courseContoller.deleteCourse);


module.exports = router;