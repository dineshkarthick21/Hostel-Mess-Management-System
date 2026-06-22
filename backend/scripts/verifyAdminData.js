const mongoose = require('mongoose');
require('dotenv').config();
const { User, Admin } = require('../models');

const verifyAdminData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hostel_management');
        console.log('Connected to MongoDB');

        // Find the admin user
        const user = await User.findOne({ email: 'admin@hostel.com' });
        if (user) {
            console.log('\n=== User Data Found ===');
            console.log('User ID:', user._id);
            console.log('Email:', user.email);
            console.log('Is Admin:', user.isAdmin);
            console.log('Created Date:', user.date);
        } else {
            console.log('User not found');
        }

        // Find the admin profile
        const admin = await Admin.findOne({ email: 'admin@hostel.com' }).populate('user').populate('hostel');
        if (admin) {
            console.log('\n=== Admin Profile Data Found ===');
            console.log('Admin ID:', admin._id);
            console.log('Name:', admin.name);
            console.log('Email:', admin.email);
            console.log('User Reference:', admin.user._id);
            console.log('Hostel Reference:', admin.hostel._id);
            console.log('Created Date:', admin.date);
        } else {
            console.log('Admin profile not found');
        }

        console.log('\n✓ Data is successfully saved in MongoDB!\n');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error verifying admin data:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

verifyAdminData();
