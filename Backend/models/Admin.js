const supabase = require('../db/connector');
const bcrypt = require('bcrypt');

const createAdmin = async({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
        .from('admins')
        .insert([{ username, email, password: hashedPassword }])
        .select()


    if (error) throw error;
    return data;
};

const getAdminByEmail = async(email) => {
    const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)


    if (error) return null;
    return data;
};

const verifyPassword = async(plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};



module.exports = { createAdmin, verifyPassword, getAdminByEmail }