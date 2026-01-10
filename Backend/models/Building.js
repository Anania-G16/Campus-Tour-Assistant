const supabase = require("../db/connector.js");

const getBuildingById = async(id) => {
    const { data, error } = await supabase
        .from("buildings")
        .select("*")
        .eq("id", id)


    if (error) return null;
    return data;
};

const addBuilding = async(building) => {
    const { data, error } = await supabase
        .from("buildings")
        .insert([building])
        .select()


    if (error) throw error;
    return data;
};

const updateBuilding = async(id, building) => {
    const { data, error } = await supabase
        .from("buildings")
        .update(building)
        .eq("id", id)
        .select()


    if (error) throw error;
    return data;
};

const deleteBuilding = async(id) => {
    const { data, error } = await supabase
        .from("buildings")
        .delete()
        .eq("id", id)
        .select()


    if (error) throw error;
    return data;
};

module.exports = {
    addBuilding,
    updateBuilding,
    // getAllBuildings,
    deleteBuilding,
    getBuildingById,
};