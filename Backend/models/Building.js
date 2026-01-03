const supabase = require ('../db/connector.js')

export const getAllBuildings = async () => {
  const { data, error } = await supabase
    .from('buildings')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
};

export const getBuildingByName = async (name) => {
  const { data, error } = await supabase
    .from('buildings')
    .select('*')
    .eq('name', name)
    .single();

  if (error) return null;
  return data;
};

export const addBuilding = async (building) => {
  const { data, error } = await supabase
    .from('buildings')
    .insert([building])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBuilding = async (id, building) => {
  const { data, error } = await supabase
    .from('buildings')
    .update(building)
    .eq('building_id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteBuilding = async (id) => {
  const { data, error } = await supabase
    .from('buildings')
    .delete()
    .eq('building_id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
