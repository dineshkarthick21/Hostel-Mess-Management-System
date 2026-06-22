const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User } = require('../models');

const debugLogin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hostel_management');
        console.log('Connected to MongoDB');

        const email = 'admin@hostel.com';
        const password = 'Admin@123456';

        // Get user from database
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found in database');
            await mongoose.connection.close();
            return;
        }

        console.log('\n=== User Data ===');
        console.log('Email:', user.email);
        console.log('Is Admin:', user.isAdmin);
        console.log('Password Hash:', user.password);
        console.log('Password Length:', user.password.length);

        // Test password comparison
        console.log('\n=== Testing Password Comparison ===');
        console.log('Attempting to match password:', password);
        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password matches:', isMatch);

        if (isMatch) {
            console.log('\n✓ Login should succeed!');
        } else {
            console.log('\n✗ Password does not match!');
            console.log('Hash seems corrupted or password is wrong');
        }

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

debugLogin();
