const {
    getBuildingById,
    addBuilding,
    updateBuilding,
    deleteBuilding,
} = require("../models/Building.js");
const supabase = require("../db/connector.js");
const path = require('path')
const fs = require("fs");

const getBuildings = async(req, res) => {
    try {
        const { search, category } = req.query;

        let query = supabase.from("buildings").select("*");

        if (search) {
            query = query.ilike("name", `%${search}%`);
        }

        if (category) {
            query = query.eq("category", category);
        }

        // Order alphabetically
        const { data, error } = await query.order("name", { ascending: true });

        if (error) throw error;

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch buildings" });
    }
};

// GET building by ID
const getBuilding = async(req, res) => {
    try {
        const { id } = req.params;
        const building = await getBuildingById(id);

        if (!building) {
            return res.status(404).json({ message: "Building not found" });
        }

        res.json(building);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch building" });
    }
};

// CREATE building
const createBuilding = async(req, res) => {
    try {
        const buildingData = req.body;
        if (!req.file) {
            return res
                .status(404)
                .json({ success: false, message: "image is required" });
        }
        buildingData.image_url = req.file.filename;
        const newBuilding = await addBuilding(buildingData);
        res.status(201).json(newBuilding);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create building" });
    }
};

// UPDATE building
const editBuilding = async(req, res) => {
    try {
        const { id } = req.params;
        const buildingData = req.body;
        if (req.file) {
            buildingData.image_url = req.file.filename;
        }

        const updatedBuilding = await updateBuilding(id, buildingData);
        res.json(updatedBuilding);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update building" });
    }
};

// DELETE building
const removeBuilding = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedBuilding = await deleteBuilding(id);
        if (deletedBuilding.image) {
            const filePath = path.join(
                __dirname,
                "../uploads/buildings",
                deletedBuilding.image_url
            );
            fs.unlink(filePath, (err) => {
                if (err) console.error("Failed to delete image file:", err);
            });
        }
        res.json({ message: "Building deleted", deletedBuilding });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete building" });
    }
};

module.exports = {
    getBuilding,
    editBuilding,
    getBuildings,
    createBuilding,
    removeBuilding,
};