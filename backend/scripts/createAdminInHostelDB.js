const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User, Admin, Hostel } = require('../models');

const createAdminInHostelDB = async () => {
    try {
        // Connect to the correct database
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hostel';
        await mongoose.connect(mongoUri);
        console.log('Connected to:', mongoUri);

        const adminEmail = 'admin@hostel.com';
        const adminPassword = 'Admin@123456';
        const adminName = 'Hostel Administrator';

        // Delete existing admin/user if they exist (to start fresh)
        await User.deleteOne({ email: adminEmail });
        await Admin.deleteOne({ email: adminEmail });
        console.log('Cleaned up existing records');

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
        } else {
            console.log('Using existing hostel:', hostel.name);
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

        // Create admin with proper CNIC
        const admin = new Admin({
            name: adminName,
            email: adminEmail,
            cnic: '1111111111111',  // Unique CNIC
            user: user.id,
            hostel: hostel.id
        });
        await admin.save();
        console.log('Created admin profile:', adminName);

        console.log('\n✓ Admin created successfully in hostel database!');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

createAdminInHostelDB();
