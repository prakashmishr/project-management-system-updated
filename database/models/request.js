const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
    leaderId: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    },
    pt: {
        type: String,
        required: true
    },
    pd: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
   
    reqType: {
        type: Number,
        required: true
    },
   

}, {
    timestamps: true
})

const reqModel = mongoose.model('req', reqSchema);

module.exports = reqModel;