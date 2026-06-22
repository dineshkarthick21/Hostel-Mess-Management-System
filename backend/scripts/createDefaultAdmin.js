const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User, Admin, Hostel } = require('../models');

const createDefaultAdmin = async () => {
    try {
        // Connect to MongoDB using the SAME URI as the backend
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hostel';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB at:', mongoUri);

        // Default admin credentials
        const adminEmail = 'admin@hostel.com';
        const adminPassword = 'Admin@123456';
        const adminName = 'Hostel Administrator';

        // Check if admin already exists
        const existingUser = await User.findOne({ email: adminEmail });
        const existingAdmin = await Admin.findOne({ email: adminEmail });
        
        if (existingUser || existingAdmin) {
            console.log('Admin already exists with email:', adminEmail);
            await mongoose.connection.close();
            return;
        }

        // Get or create default hostel
        const defaultHostelName = process.env.DEFAULT_HOSTEL_NAME || 'Hostel';
        let hostel = await Hostel.findOne({ name: defaultHostelName });

        if (!hostel) {
            hostel = await Hostel.create({
                name: defaultHostelName,
                location: 'Default Location',
                rooms: 0,
                capacity: 0,
                vacant: 0
            });
            console.log('Created default hostel');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        // Create user
        const user = new User({
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true
        });
        await user.save();
        console.log('Created user:', adminEmail);

        // Create admin with CNIC to avoid null unique constraint issue
        const admin = new Admin({
            name: adminName,
            email: adminEmail,
            cnic: '1234567890123', // Default CNIC for admin
            user: user.id,
            hostel: hostel.id
        });
        await admin.save();
        console.log('Created admin:', adminName);

        console.log('\n=== Default Admin Created Successfully ===');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);
        console.log('=========================================\n');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error creating default admin:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

createDefaultAdmin();
