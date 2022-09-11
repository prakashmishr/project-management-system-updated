module.exports.start = function () {


    var mongoose = require('mongoose');
    const url = "mongodb+srv://cqDB:1234567890@cluster0.drbse.mongodb.net/pms?retryWrites=true&w=majority"
    mongoose.connect(url).then(function () {
        console.log("db is live");
    }).catch(function (err) {
        //console.log(err);
        console.log("db is not live");
    })
}