require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getAdminByUsername, verifyPassword } =  require('../models/Admin.js');


export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await getAdminByUsername(username);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const validPassword = await verifyPassword(password, admin.password);
    if (!validPassword) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { admin_id: admin.admin_id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, admin: { admin_id: admin.admin_id, username: admin.username, email: admin.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
