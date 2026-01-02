const {Schema , model} = require('../db/connector');
const FeedBackSchema  = Schema({
    SubmittedDate : {
        type : Date,
        required : true
    },
    Comment : {
        type : String,
        required : true,
        trim : true,
        lowercase: true
    }

});
const FeedBack = model( 'FeedBacks',FeedBackSchema)
module.exports = FeedBack;