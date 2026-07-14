const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Course = require('../Models/Course');


exports.getAllCourses = async (req,res) => {

    try {

        const courses = await Course.findAll();

        return res.status(200).json({
            'success': true,
            'data': courses
        });

        
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            'success': false,
            'message': error.message
        });
    }
};


exports.getCourseById = async (req,res) => {

    try {

        const course = await Course.findByPk(req.params.id)

        if (!course) {
            return res.status(404).json({

                'success': false,
                'message': 'Course not found'

            });
            
        }

        return res.status(200).json({
            'success': true,
            'data': course
        });

        
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            'success': false,
            'message': 'Server Error'
        });
    }    
    
};


exports.createCourse = async (req,res) => {

    try {
        const {title,description,instructor,duration,category} = req.body;


        if (!title || !instructor) {
        
            return res.status(400).json({
            'success': false,
            'message': 'Title and instructor are required.'
            });
    
        }

        const course = await Course.create({
            title,
            description,
            instructor,
            duration,
            category
        });
        

        return res.status(200).json({
            'success': true,
            'message': 'Course created successfully'
        });



    } catch (error) {

        console.error(error);

        return res.status(500).json({
            'success': false,
            'message': 'Server Error'
        });
    }    
    
};

exports.updateCourse = async (req,res) => {

    try {
        const course = await Course.findByPk(req.params.id);

        if (!course) {

            return res.status(404).json({

                'success': false,
                'message': 'Course not found'

            });   
        }

        await course.update(req.body);

        return res.status(200).json({
            'success': true,
            'message': 'Course updated successfully',
            'data': course
        });

        
    } catch (error) {

        return res.status(500).json({

            'success': false,
            'message': error.message
        });
        
    }
    
    
};

exports.deleteCourse = async (req,res) => {

    try {

        const course = await Course.findByPk(req.params.id);

        if (!course) {

            return res.status(404).json({

                'success': false,
                'message': 'Course not fousnd'

            });   
        }

        await course.destroy();

        return res.status(200).json({
            'success': true,
            'message': 'Course deleted successfully'
        });
        
        
    } catch (error) {

        return res.status(500).json({
            'success':false,
            'message': error.message
        });
        
    }  
};