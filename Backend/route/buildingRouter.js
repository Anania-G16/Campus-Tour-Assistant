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
buildingRouter.post('/', upload.single('images'), createBuilding);
buildingRouter.put('/:id', upload.single('images'), editBuilding);
buildingRouter.delete('/:id', removeBuilding);

module.exports = buildingRouter;