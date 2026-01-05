const supabase = require('../db/connector.js')



const getBuildingById = async(id) => {
    const { data, error } = await supabase
        .from('buildings')
        .select('*')
        .eq('building_id', id)
        .single();

    if (error) return null;
    return data;
};

const addBuilding = async(building) => {
    const { data, error } = await supabase
        .from('buildings')
        .insert([building])
        .select()
        .single();

    if (error) throw error;
    return data;
};

const updateBuilding = async(id, building) => {
    const { data, error } = await supabase
        .from('buildings')
        .update(building)
        .eq('building_id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

const deleteBuilding = async(id) => {
    const { data, error } = await supabase
        .from('buildings')
        .delete()
        .eq('building_id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};


module.exports = {
    addBuilding,
    updateBuilding,
    // getAllBuildings,
    deleteBuilding,
    getBuildingById
}