const supabase = require('../db/connector.js')
const addFeedback = async({ subject, comment }) => {
    const { data, error } = await supabase
        .from('feedback')
        .insert([{ subject, comment }])
        .select()
        .single();

    if (error) throw error;
    return data;
};
const getAllFeedback = async() => {
    const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('date_submitted', { ascending: false });

    if (error) throw error;
    return data;
};
const getFeedbackById = async(id) => {
    const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .eq('feedback_id', id)
        .single();

    if (error) return null;
    return data;
};
const deleteFeedback = async(id) => {
    const { data, error } = await supabase
        .from('feedback')
        .delete()
        .eq('feedback_id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

module.exports = { deleteFeedback, addFeedback, getAllFeedback, getFeedbackById, }