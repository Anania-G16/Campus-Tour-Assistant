const supabase = require('../db/connector.js')
const addFeedback = async({ email, subject, comment }) => {
    const { data, error } = await supabase
        .from('feedback')
        .insert([{ email, subject, comment }])
        .select()


    if (error) throw error;
    return data;
};
const getAllFeedback = async() => {
    const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};
const getFeedbackById = async(id) => {
    const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('id', id)


    if (error) return null;
    return data;
};
const deleteFeedback = async(id) => {
    const { data, error } = await supabase
        .from('feedback')
        .delete()
        .eq('id', id)
        .select()


    if (error) throw error;
    return data;
};

module.exports = { deleteFeedback, addFeedback, getAllFeedback, getFeedbackById, }