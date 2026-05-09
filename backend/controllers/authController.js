const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateToken, verifyToken } = require('../utils/auth');
const User = require('../models/User');
const { Student, Admin, Hostel } = require('../models');

const getOrCreateDefaultHostel = async () => {
    const defaultName = process.env.DEFAULT_HOSTEL_NAME || 'Default Hostel';
    let hostel = await Hostel.findOne({ name: defaultName });

    if (!hostel) {
        hostel = await Hostel.create({
            name: defaultName,
            location: 'Default Location',
            rooms: 0,
            capacity: 0,
            vacant: 0
        });
    }

    return hostel;
};

exports.login = async (req, res, next) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({success, errors: [{ msg: 'Invalid credentials' }] });
            }
            const token = generateToken(user.id, user.isAdmin);
            res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                },
            });

        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    } catch (error) {
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    let success = false;
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        const { email, password, newPassword } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, errors: [{ msg: 'Invalid credentials' }] });
            }

            const oldPassword = await bcrypt.compare(password, user.password);

            if (!oldPassword) {
                return res.status(400).json({success, errors: [{ msg: 'Invalid credentials' }] });
            }

            const salt = await bcrypt.genSalt(10);
            const newp = await bcrypt.hash(newPassword, salt);

            user.password = newp;
            await user.save();

            success = true;
            res.status(200).json({ success, msg: 'Password changed successfully' });

        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    } catch (error) {
        next(error);
    }
}

exports.verifySession = async (req, res, next) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), success});
    }
    try {
        const { token } = req.body;
        const decoded = verifyToken(token);
        if (decoded) {
            success = true;
            return res.status(200).json({success, data: decoded});
        }
        return res.status(400).json({success, "message": "Invalid token"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({success, "message": "Server Error"});
    }
}

exports.signupStudentLite = async (req, res, next) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success, errors: [{ msg: 'User already exists' }] });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ success, errors: [{ msg: 'Student already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword,
            isAdmin: false
        });
        await user.save();

        const defaultHostel = await getOrCreateDefaultHostel();

        const student = new Student({
            name,
            email,
            user: user.id,
            hostel: defaultHostel.id
        });
        await student.save();

        success = true;
        return res.status(200).json({ success, message: 'Student signup successful' });
    } catch (error) {
        if (error && error.code === 11000) {
            return res.status(400).json({ success, errors: [{ msg: 'User already exists' }] });
        }
        return res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
}

exports.signupAdminLite = async (req, res, next) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success, errors: [{ msg: 'User already exists' }] });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success, errors: [{ msg: 'Admin already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword,
            isAdmin: true
        });
        await user.save();

        const defaultHostel = await getOrCreateDefaultHostel();

        const admin = new Admin({
            name,
            email,
            user: user.id,
            hostel: defaultHostel.id
        });
        await admin.save();

        success = true;
        return res.status(200).json({ success, message: 'Admin signup successful' });
    } catch (error) {
        if (error && error.code === 11000) {
            return res.status(400).json({ success, errors: [{ msg: 'User already exists' }] });
        }
        return res.status(500).json({ success, errors: [{ msg: 'Server error' }] });
    }
}
