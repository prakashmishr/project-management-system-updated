const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    userUniversityRollNo: {
        type: String,
        required: true
    },
    userCollegeName: {
        type: String,
        required: true
    },
    userContactNo:{
        type: String,
        required:true
    },

}, {
    timestamps: true
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

