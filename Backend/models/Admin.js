const supabase= require('../db/connector');
const bcrypt = require( 'bcrypt');

export const createAdmin = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('admins')
    .insert([{ username, email, password: hashedPassword }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAdminByUsername = async (username) => {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('username', username)
    .single();

  if (error) return null;
  return data;
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

