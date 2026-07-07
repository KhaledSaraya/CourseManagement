require('dotenv').config();

const express = require('express');
const sequelize = require('./config/db');
const AuthRoutes = require('./routes/authRoutes');
const authMiddleware = require('./Middleware/authMiddleware');
const CourseRoutes = require('./routes/courseRoutes');

const User = require('./Models/User');
const Course = require('./Models/Course');

const app = express();
app.use(express.json());

app.use('/api/auth',AuthRoutes);

app.use('/api/course',CourseRoutes);


app.get('/',(req,res)=>{
    res.send('Server is running correctly');
})

sequelize.authenticate().then(()=>{
    console.log('Connected Via Sequelize');

}).catch((err)=> {

    console.error('Error: ',err);

});


app.get('/profile',authMiddleware, (req,res)=>{

    res.json({
        'Success': true,
        'Message': 'access granted',
        'user': req.user
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
});

