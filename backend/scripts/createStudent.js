const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { Student, User, Hostel } = require('../models');

const createStudent = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hostel';
        await mongoose.connect(mongoUri);
        console.log('Connected to:', mongoUri);

        // Delete all existing students with this email
        const result = await Student.deleteMany({ email: 'ali.ahmed@hostel.com' });
        console.log('Deleted', result.deletedCount, 'existing student records');

        // Delete user
        const userResult = await User.deleteOne({ email: 'ali.ahmed@hostel.com' });
        console.log('Deleted user if existed');

        // Get the hostel
        const hostel = await Hostel.findOne({ name: 'Hostel' });
        if (!hostel) {
            console.log('✗ Hostel not found');
            await mongoose.connection.close();
            return;
        }
        console.log('✓ Hostel found:', hostel.name);

        // Student data with unique CMS ID
        const studentData = {
            name: 'Ali Ahmed',
            cms_id: 654321,
            room_no: 101,
            batch: 2024,
            dept: 'Computer Science',
            course: 'BS Engineering',
            email: 'ali.ahmed@hostel.com',
            father_name: 'Muhammad Ahmed',
            contact: '03001234567',
            address: '123 Main Street, Karachi, Pakistan',
            dob: '2002-05-15',
            cnic: '3520112345678',
            password: 'Student@123456'
        };

        // Check if student exists
        const existingStudent = await Student.findOne({ email: studentData.email });
        if (existingStudent) {
            console.log('Student already exists');
            await mongoose.connection.close();
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(studentData.password, salt);

        // Create user
        const user = new User({
            email: studentData.email,
            password: hashedPassword,
            isAdmin: false
        });
        await user.save();
        console.log('Created user');

        // Create student
        const student = new Student({
            name: studentData.name,
            cms_id: studentData.cms_id,
            room_no: studentData.room_no,
            batch: studentData.batch,
            dept: studentData.dept,
            course: studentData.course,
            email: studentData.email,
            father_name: studentData.father_name,
            contact: studentData.contact,
            address: studentData.address,
            dob: studentData.dob,
            cnic: studentData.cnic,
            user: user.id,
            hostel: hostel._id
        });
        await student.save();
        console.log('Created student');

        console.log('\n✓ Student Created Successfully!');
        console.log('==========================================');
        console.log('Name:', studentData.name);
        console.log('CMS ID:', studentData.cms_id);
        console.log('Email:', studentData.email);
        console.log('CNIC:', studentData.cnic);
        console.log('Room No:', studentData.room_no);
        console.log('Batch:', studentData.batch);
        console.log('Department:', studentData.dept);
        console.log('\n--- Login Credentials ---');
        console.log('ID (CMS ID or Email): 654321');
        console.log('Email: ali.ahmed@hostel.com');
        console.log('Password: Student@123456');
        console.log('==========================================\n');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
};

createStudent();
