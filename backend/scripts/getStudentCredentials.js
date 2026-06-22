const mongoose = require('mongoose');
require('dotenv').config();
const { Student, User } = require('../models');

const getStudentCredentials = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hostel';
        await mongoose.connect(mongoUri);
        console.log('Connected to:', mongoUri);

        // Find the student by email
        const student = await Student.findOne({ email: 'ali.ahmed@hostel.com' }).populate('user');
        
        if (student) {
            console.log('\n✓ Student Found!');
            console.log('==========================================');
            console.log('Name:', student.name);
            console.log('Email:', student.email);
            console.log('CMS ID:', student.cms_id);
            console.log('CNIC:', student.cnic);
            console.log('Contact:', student.contact);
            console.log('Room No:', student.room_no);
            console.log('Department:', student.dept);
            console.log('Batch:', student.batch);
            console.log('\n--- Login Credentials ---');
            console.log('Email (ID):', student.email);
            console.log('Password: Student@123456');
            console.log('==========================================\n');
        } else {
            console.log('✗ Student not found');
        }

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

getStudentCredentials();
