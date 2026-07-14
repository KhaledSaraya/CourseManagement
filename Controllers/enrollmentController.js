const Enrollment = require('../Models/Enrollment');
const Course = require('../Models/Course');
const User =require('../Models/User');


exports.enrollCourse = async (req,res) => {

    try {

        const student_id = req.user.id;
        const { course_id } = req.body;

        const course = await Course.findByPk(course_id);

        if (!course) {

            return res.status(404).json({
                success: false,
                message: "Course not found."
            });

        }

        const exists = await Enrollment.findOne({
            where: {
                student_id,
                course_id
            }
        });


        if (exists) {

            return res.status(404).json({
                success: false,
                message: "User already enrolled."
            });

        }

        const enrollment = await Enrollment.create({
            student_id,
            course_id
        });

        return res.status(200).json({
            success: true,
            message: "Enrollment successful.",
            data: enrollment
        });

        
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            'success': false,
            'message': error.message
        });        
        
    }

}


exports.myCourses = async (req,res) => {

    try {

        const enrollments = await Enrollment.findAll({

            where: {
                student_id: req.user.id
            },

            include: Course

        });

        return res.status(200).json({

            success: true,
            data: enrollments

        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            'success': false,
            'message': error.message
        });
        
    }
}

exports.getAllEnrollments = async (req,res) => {

    try {

         const enrollments = await Enrollment.findAll({

            include: [User,Course]

        });

        return res.status(200).json({

            success: true,
            data: enrollments

        });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            'success': false,
            'message': error.message
        });
        
    }
    
}

exports.deleteEnrollment = async (req,res) => {

    try {

        const enrollment = await Enrollment.findByPk(req.params.id);

        if (!enrollment) {

            return res.status(404).json({

                success: false,
                message: "Enrollment not found."

            });

        }

        await enrollment.destroy();

        return res.status(200).json({

            success: true,
            message: "Enrollment deleted successfully."

        });
        
    } catch (error) {

        console.error(error);

        return res.status(500).json({
            'success': false,
            'message': error.message
        });
        
    }
    
}
