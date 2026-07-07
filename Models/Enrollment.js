const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Course = require('./Course');

const Enrolllment = sequelize.define('Enrollment',
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },

        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false

        },

        enrolled_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'enrollment',
        timestamps: false
    }

);

Enrolllment.belongsTo(User,{
    foreignKey: 'student_id'
});

Enrolllment.belongsTo(Course,{
    foreignKey: 'course_id'
});

module.exports = Enrolllment;