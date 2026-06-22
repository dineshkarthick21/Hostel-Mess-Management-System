const mongoose = require('mongoose');
require('dotenv').config();
const { Admin } = require('../models');

const checkAdminInBothDatabases = async () => {
    console.log('=== Checking Admin in Both Databases ===\n');
    
    // Check in the configured database
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hostel';
        await mongoose.connect(mongoUri);
        console.log('Connected to:', mongoUri);
        
        const admin = await Admin.findOne({ email: 'admin@hostel.com' });
        if (admin) {
            console.log('✓ Admin FOUND in configured database:');
            console.log('  Name:', admin.name);
            console.log('  Email:', admin.email);
        } else {
            console.log('✗ Admin NOT FOUND in configured database');
        }
        
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

checkAdminInBothDatabases();
