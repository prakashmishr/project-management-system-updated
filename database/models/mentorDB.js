const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPwd: {
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
    userteacherID: {
        type: String,
        required: true
    },
    userContactNo:{
        type: String,
        required:true
    },
    userDomain: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const TeacherModel = mongoose.model('teacher', teacherSchema);

module.exports = TeacherModel;

