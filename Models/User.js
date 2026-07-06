const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const { Types } = require('mysql2');

const User= sequelize.define('User',
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM('admin', 'student'),
            defaultValue: 'student'
        },

        created_at: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'user',
        timestamps: false
    }

);

module.exports = User;