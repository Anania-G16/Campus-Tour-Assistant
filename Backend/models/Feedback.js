const supabase = require ('../db/connector.js')

export const addFeedback = async ({ subject, comment }) => {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{ subject, comment }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAllFeedback = async () => {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('date_submitted', { ascending: false });

  if (error) throw error;
  return data;
};

export const getFeedbackById = async (id) => {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('feedback_id', id)
    .single();

  if (error) return null;
  return data;
};

export const deleteFeedback = async (id) => {
  const { data, error } = await supabase
    .from('feedback')
    .delete()
    .eq('feedback_id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
