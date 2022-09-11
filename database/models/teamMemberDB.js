const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    // userPic: {
    //     type: String,
    //     required: true
    // },
    userVerified: {
        type: Boolean,
        required: true
    },
    userType:{
        type:Number,
        required:true
    },
    userUniversityRollNo: {
        type: String,
        required: true
    },
    userContactNo:{
        type: String,
        required:true
    },
    leaderID:{
        type: String,
        required:true 
    }
})

const teamMemberModel = mongoose.model('TEAM', teamMemberSchema);

module.exports = teamMemberModel;
