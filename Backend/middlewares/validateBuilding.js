const Joi = require("joi");

const buildingSchema = Joi.object({
    name: Joi.string().max(100).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    category: Joi.string().max(50).optional(),
    image_url: Joi.string().required(),
});

const validateBuilding = (req, res, next) => {
    const { error } = buildingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
};

module.exports = validateBuilding