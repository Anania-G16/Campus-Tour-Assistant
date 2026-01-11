require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getAdminByEmail, verifyPassword, createAdmin } = require('../models/Admin.js');


const loginAdmin = async(req, res) => {
    try {


        const { email, password } = req.body;
        // console.log(req.body);
        const admin = await getAdminByEmail(email);
        if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });

        const validPassword = await verifyPassword(password, admin.password);
        if (!validPassword) return res.status(401).json({ succces: false, smessage: 'Incorrect password' });

        const token = jwt.sign({ admin_id: admin.admin_id, username: admin.username },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        res.json({ success: true, token, admin: { admin_id: admin.admin_id, username: admin.username, email: admin.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
const registerAdmin = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1️⃣ Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Username, email, and password are required" });
        }

        // 2️⃣ Check if user already exists
        const existingUser = await getAdminByEmail(email);
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already taken" });
        }

        // 3️⃣ Create new admin
        const newAdmin = await createAdmin({ username, email, password });
        const token = jwt.sign({ admin_id: newAdmin.admin_id, username: newAdmin.username },
            process.env.JWT_SECRET, { expiresIn: '1h' }
        );

        // 4️⃣ Respond with success (omit password)
        const { password: _, ...adminData } = newAdmin; // remove password
        res.status(201).json({ success: true, message: "Admin registered successfully", token, admin: adminData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};


module.exports = { loginAdmin, registerAdmin }