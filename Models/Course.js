const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course',
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },

        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
        },

        instructor: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        duration: {
            type: DataTypes.STRING(50),
        },

        category: {
            type: DataTypes.STRING(50),
        },

        created_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'course',
        timestamps: false
    }

);

module.exports = Course;