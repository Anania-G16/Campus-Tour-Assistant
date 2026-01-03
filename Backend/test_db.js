// we will delete this later
const supabase = require ('./db/connector.js');

async function testConnection() {
  try {
    const { data, error } = await supabase.from('admins').select('*').limit(1);

    if (error) throw error;

    console.log(' Connected to Supabase successfully!');
    console.log('Sample admin row:', data);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

testConnection();
