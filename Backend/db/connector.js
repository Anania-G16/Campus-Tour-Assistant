require('dotenv').config();
const mongoose = require('mongoose');
const mongodbUrl = process.env.Url;


mongoose.connect = mongoose.connect(mongodbUrl).then(()=>console.log("MongoDB connected")).catch((e)=>console.log("Error occured : ", e))

module.exports = mongoose;