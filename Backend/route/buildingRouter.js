const express = require('express');
const upload = require('../middlewares/upload')
const {
    getBuildings,
    getBuilding,
    createBuilding,
    editBuilding,
    removeBuilding
} = require('../controller/buildingController');
const validateBuilding = require('../middlewares/validateBuilding');

const buildingRouter = express.Router();

buildingRouter.get('/', getBuildings);
buildingRouter.get('/:id', getBuilding);
buildingRouter.post('/', validateBuilding, upload.single('image_url'), createBuilding);
buildingRouter.put('/:id', validateBuilding, upload.single('image_url'), editBuilding);
buildingRouter.delete('/:id', removeBuilding);

module.exports = buildingRouter;