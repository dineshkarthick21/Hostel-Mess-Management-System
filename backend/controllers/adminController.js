const {generateToken, verifyToken} = require('../utils/auth');
const {validationResult} = require('express-validator');
const {Admin, User, Hostel} = require('../models');
const bcrypt = require('bcryptjs');

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

const registerAdmin = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {name, email, father_name, contact, address, dob, cnic, hostel, password} = req.body;

        try {
            let admin = await Admin.findOne({email});

            if (admin) {
                return res.status(400).json({success, errors: [{msg: 'Admin already exists'}]});
            }

            let shostel = null;
            if (hostel) {
                shostel = await Hostel.findOne({name: hostel});
            }
            
            // If no hostel specified or found, use default
            if (!shostel) {
                shostel = await getOrCreateDefaultHostel();
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let user = new User({
                email,
                password: hashedPassword,
                isAdmin: true
            });

            await user.save();

            admin = new Admin({
                name,
                email,
                father_name,
                contact,
                address,
                dob,
                cnic,
                user: user.id,
                hostel: shostel._id
            });

            await admin.save();

            const token = generateToken(user.id, user.isAdmin);

            success = true;
            res.json({success, token, admin});

        } catch (error) {
            console.error('registerAdmin error:', error);
            res.status(500).json({success, errors: [{msg: 'Server error'}]});
        }
    } catch (err) {
        console.error('registerAdmin outer error:', err);
        res.status(500).json({success: false, errors: [{msg: 'Server error'}]});
    }
}

const updateAdmin = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {name, email, father_name, contact, address, dob, cnic} = req.body;

        try {
            let admin = await Admin.findOne({email});

            if (!admin) {
                return res.status(400).json({success, errors: [{msg: 'Admin does not exists'}]});
            }

            admin.name = name;
            admin.email = email;
            admin.father_name = father_name;
            admin.contact = contact;
            admin.address = address;
            admin.dob = dob;
            admin.cnic = cnic;

            await admin.save();

            success = true;
            res.json({success, admin});

        } catch (error) {
            res.status(500).send('Server error');
        }
    } catch (err) {
        res.status(500).json({success, errors: [{msg: 'Server error'}]});
    }
}

const getHostel = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {id} = req.body

        let admin = await Admin.findById(id);
        
        if (!admin) {
            return res.status(400).json({success, errors: [{msg: 'Admin does not exists'}]});
        }

        let hostel = null;
        if (admin.hostel) {
            hostel = await Hostel.findById(admin.hostel);
        }

        if (!hostel) {
            try {
                const defaultHostel = await getOrCreateDefaultHostel();
                admin.hostel = defaultHostel._id;
                await admin.save();
                hostel = defaultHostel;
            } catch (err) {
                console.error('Error creating/assigning default hostel:', err);
                return res.status(500).json({success, errors: [{msg: 'Failed to assign hostel'}]});
            }
        }
        success = true;
        res.json({success, hostel});
    } catch (error) {
        console.error('getHostel error:', error);
        return res.status(500).json({success: false, errors: [{msg: 'Server error'}]});
    }
}

const getAdmin = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array()});
    }
    try {
        const {isAdmin} = req.body;
        if (!isAdmin) {
            return res.status(401).json({success, errors: [{msg: 'Not an Admin, authorization denied'}]});
        }
        const {token} = req.body;
        if (!token) {
            return res.status(401).json({success, errors: [{msg: 'No token, authorization denied'}]});
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({success, errors: [{msg: 'Token is not valid'}]});
        }
        
        let admin = await Admin.findOne({user:decoded.userId}).select('-password');
        
        if (!admin) {
            return res.status(401).json({success, errors: [{msg: 'Token is not valid'}]});
        }

        success = true;
        res.json({success, admin});
    } catch (error) {
        res.status(500).send('Server error');
    }
}

const deleteAdmin = async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()});
        }

        const {email} = req.body

        let admin = await Admin.findOne({email});

        if (!admin) {
            return res.status(400).json({success, errors: [{msg: 'Admin does not exists'}]});
        }

        const user = await User.findById(admin.user);

        await User.deleteOne(user);

        await Admin.deleteOne(admin);

        success = true;
        res.json({success, msg: 'Admin deleted'});
    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    registerAdmin,
    updateAdmin,
    getAdmin,
    getHostel,
    deleteAdmin
}
