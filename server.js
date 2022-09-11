const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.use(session({
    secret: "this is secreat"
}));

app.set('view engine', 'ejs');

//database

const db = require('./database');
const studentUsersDB = require("./database/models/studentUsersDB.js");
const {
    static
} = require('express');
const teamMemberDB = require("./database/models/teamMemberDB.js");
const teacherDB = require("./database/models/mentorDB.js");
const reqDB = require("./database/models/request");
db.start();



app.get("/", function (req, res) {
    res.render("homepage");
})


app.get("/login", function (req, res) {
    res.render("login", {
        msg: ''
    });
})
app.post("/login", function (req, res) {
    const email = req.body.email;
    const pwd = req.body.pwd;
    console.log(req.body);
    console.log(req.body.pwd);
    studentUsersDB.findOne({
        userEmail: email,
        userPwd: pwd
    }).then(function (user) {
        if (user) {
            console.log("==========>" + user._id);
            req.session.Auth = true,
                req.session.ID = user._id;
            req.session.user = user;
            console.log(req.session.ID);
            console.log(user);
            teamMemberDB.find({
                leaderID: req.session.ID
            }).then(function (member) {
                console.log(member);
                req.session.member = member;

                res.render('StudentTeamDetail', {
                    user: user,
                    member: member,
                    err: ""
                });
            });
        } else {
            console.log(user);
            res.render("login", {
                msg: 'User not Found'
            })
        }
    })

})




app.get("/optionRegistration", function (req, res) {
    res.render('optionRegistration');
})

app.get("/teacherRegister", function (req, res) {
    res.render("teacherRegister");
})


app.get("/StudentTeamDetail", (req, res) => {
    studentUsersDB.findOne({
        _id: req.session.ID
    }).then(function (user) {
        if (user) {

            teamMemberDB.find({
                leaderID: req.session.ID
            }).then(function (member) {
                console.log(member);
                req.session.member = member;

                res.render('StudentTeamDetail', {
                    user: user,
                    member: member,
                    err: ""
                });
            });
        } else {
            console.log(user);
            res.render("login", {
                msg: 'User not Found'
            })
        }
    })
})


// ============Teacher Registration =====================//


app.post("/teacherRegister", function (req, res) {
    console.log(req.body);
    var name = req.body.firstName + " " + req.body.lastName;

    const teacherID = req.body.teacherID;
    const collegeName = req.body.collegeName;
    const pic = req.body.pic;
    const contactNo = req.body.contactNo;
    const emailId = req.body.emailId;
    const pwd = req.body.pwd;
    const domain = req.body.domain;

    teacherDB.find({
        userEmail: emailId
    }).then(function (user) {
        if (user.length > 0)
            res.render("teacherRegister", {
                // err: "alredy registered"
            })

        else {


            teacherDB.create({

                userName: name,
                userEmail: emailId,
                userPwd: pwd,
                // userpic: pic,
                userVerified: false,
                userType: 0,
                userteacherID: teacherID,
                userCollegeName: collegeName,
                userContactNo: contactNo,
                userDomain: domain




            }).then(function (user) {
                console.log("sucessful");
                res.render("adminLogin", {
                    msg: "User Registered sucessfull"
                })

            })
        }

    });

})
















app.get("/studentRegister", function (req, res) {
    res.render("studentRegister");
})

// =======================student detail ===================
app.get("/studentTeamDetail", function (req, res) {
    console.log("========>" + req.session.Auth);
    if (req.session.Auth) {
        teamMemberDB.find({
            leaderID: req.session.ID
        }).then(function (member) {
            console.log(member);
            req.session.member = member;

            res.render('StudentTeamDetail', {
                user: req.session.user,
                member: member,
                err: ""
            });

        });
    } else {

        res.render("login", {
            msg: 'User not Found'
        })
    }
})


app.post("/studentRegister", function (req, res) {
    console.log(req.body);
    var name = req.body.firstName + " " + req.body.lastName;

    const universityRollNo = req.body.universityRollNo;
    const enrolmentNo = req.body.enrolmentNo;
    const collegeName = req.body.collegeName;
    const pic = req.body.pic;
    const contactNo = req.body.contactNo;
    const emailId = req.body.emailId;
    const pwd = req.body.pwd;

    studentUsersDB.find({
        userEmail: emailId
    }).then(function (user) {
        if (user.length > 0)
            res.render("studentRegister", {
                // err: "alredy registered"
            })

        else {


            studentUsersDB.create({

                userName: name,
                userEmail: emailId,
                userPwd: pwd,
                // userpic: pic,
                userVerified: false,
                userType: 0,
                userUniversityRollNo: universityRollNo,
                userEnrolmentNo: enrolmentNo,
                userCollegeName: collegeName,
                userContactNo: contactNo,




            }).then(function (user) {
                console.log("sucessful");
                res.render("login", {
                    msg: "registration sucessfull"
                });
            })
        }

    });
});

app.route("/adminLogin")
    .get(function (req, res) {
        res.render("adminLogin", {
            msg: ""
        })

    }).post((req, res) => {
        console.log(req.body);
        const user = req.body.user;
        const pwd = req.body.pwd;
        teacherDB.findOne({
            userEmail: user,
            userPwd: pwd
        }).then((user) => {
            req.session.teacherID = user._id;
            req.session.teacherAuth = true;
            console.log(user);
            if (user) {
                const teacher = user;
                res.render("TeacherMyAccount", {
                    teacher: teacher
                });
            } else {
                res.render("adminLogin", {
                    msg: "no user found!"
                })
            }

        }).catch((err) => {
            console.log(err);
            res.render("adminLogin", {
                msg: "no user found!"
            })
        })
    })

app.get("/teacherRegister", function (req, res) {
    res.render("teacherRegister");
})

app.get("/teacherHome", (req, res) => {

    console.log(req.session.teacherID);
    teacherDB.findOne({
        _id: req.session.teacherID,
    }).then((user) => {
        console.log(user);
        if (user) {
            const teacher = user;
            res.render("TeacherMyAccount", {
                teacher: teacher
            });
        } else {
            res.render("adminLogin", {
                msg: "no user found!"
            })
        }

    }).catch((err) => {
        console.log(err);
        res.render("adminLogin", {
            msg: "no user found!"
        })
    })
})

app.get("/teamRegister", function (req, res) {
    res.render("teamRegister");
})


app.post("/teamRegister", function (req, res) {
    console.log(req.body);
    console.log(req.session.Auth);
    console.log(req.session.ID);
    var name = req.body.firstName + " " + req.body.lastName;
    const universityRollNo = req.body.universityRollNo;
    const enrolmentNo = req.body.enrolmentNo;
    const collegeName = req.body.collegeName;
    const pic = req.body.pic;
    const contactNo = req.body.contactNo;
    const emailId = req.body.emailId;
    const leaderID = req.session.ID;

    teamMemberDB.find({
        userEmail: emailId
    }).then(function (user) {
        if (user.length > 0)
            res.render("studentTeamDetail", {
                err: "alredy registered"
            })

        else {


            teamMemberDB.create({

                userName: name,
                userEmail: emailId,
                // userpic: pic,
                userVerified: false,
                userType: 0,
                userUniversityRollNo: universityRollNo,
                userEnrolmentNo: enrolmentNo,
                userCollegeName: collegeName,
                userContactNo: contactNo,
                leaderID: leaderID


            }).then(function (user) {
                console.log("sucessful");
                // ----------------------------
                teamMemberDB.find({
                    leaderID: req.session.ID
                }).then(function (member) {
                    console.log(member);
                    req.session.member = member;

                    res.render('StudentTeamDetail', {
                        user: req.session.user,
                        member: member,
                        err: ""
                    });

                });
                // ----------------
            })
        }

    });
})



app.get("/sendReq/:mentorID", function (req, res) {
    const userId = req.params.mentorID;
    console.log(userID);
    console.log(req.session.ID);

    var url = "<h1>To Verify user </h1> " + '<a href="http://localhost:3000/verify/' + userId + '">Click Here</a>'
    sendMail(user.userEmail, user.userName, "verify user", url);



})



app.route("/apply").get((req, res) => {

    if (req.session.Auth) {

        teacherDB.find({}).then((mentor) => {

            console.log(mentor);

            res.render("apply", {
                mentor: mentor,
                msg: ""
            })
        })
    } else {
        res.render("login", {
            msg: "PLZ LOGIN"
        })
    }
}).post((req, res) => {
    console.log(req.body)
    const teamLeaderId = req.session.ID;
    const teacherID = req.body.teacherId;
    const pt = req.body.pt;
    const pd = req.body.pd;
    const teamName = req.body.teamName;

    reqDB.create({
        leaderId: teamLeaderId,
        teacherId: teacherID,
        pt: pt,
        pd: pd,
        teamName: teamName,
        reqType: 0
    }).then((data) => {
        res.render("apply", {
            msg: "request sent to Mentor"
        })
    }).catch((err) => {
        res.redirect("/login")
    })
})

app.route("/teacherStuRequest").get((req, res) => {
    if (req.session.teacherAuth) {
        reqDB.find({
            teacherId: req.session.teacherID
        }).then((data) => {
            console.log(data);
            res.render("teacherStuRequest", {
                requests: data
            });

        })
    }
})

app.route("/teacherStuProDetail").get((req, res) => {
    if (req.session.teacherAuth) {
        reqDB.find({
            teacherId: req.session.teacherID
        }).then((data) => {
            console.log(data);
            res.render("teacherStuProDetail", {
                requests: data
            });

        })
    }
})


app.get("/studentMentorDtail", function (req, res) {

    console.log(req.session.ID);

    reqDB.findOne({
        leaderId: req.session.ID
    }).then((data) => {
        console.log(">>>>>>>>>>", data);
        if (!data) {

            teacherDB.find({}).then(function (mentor) {
                console.log(mentor);
                res.render("studentMentorDtail", {
                    mentor: mentor,
                    msg: 0
                });
            })
        }

        teacherDB.find({
            _id: data.teacherId
        }).then(function (mentor) {
            console.log(mentor);

            if (data.reqType == 1) {
                res.render("studentMentorDtail", {
                    mentor: mentor,
                    msg: "Congrats request Accepted"

                });

            } else if (data.reqType == 2) {

                res.render("studentMentorDtail", {
                    mentor: mentor,
                    msg: "OOPs request rejectd PLZ apply again"
                });
            } else if (data.reqType == 0) {

                res.render("studentMentorDtail", {
                    mentor: mentor,
                    msg: "Request Pending"
                });
            }



        })


    })

})

app.post("/viewDetail", (req, res) => {

    console.log("-------->", req.body);
    studentUsersDB.findOne({
        _id: req.body.leaderId
    }).then(function (user) {
        if (user) {
            console.log("==========>" + user._id);
            req.session.Auth = true,
                req.session.ID = user._id;
            req.session.user = user;
            console.log(req.session.ID);
            console.log(user);
            teamMemberDB.find({
                leaderID: req.session.ID
            }).then(function (member) {
                console.log(member);
                req.session.member = member;

                res.render('TeacherTeamDetail', {
                    user: user,
                    member: member,
                    err: ""
                });
            });
        } else {
            console.log(user);
            res.render("login", {
                msg: 'User not Found'
            })
        }
    })


})

app.post("/teacherRespose", (req, res) => {
    console.log(req.body);
    const filter = {
        _id: req.body.reqId
    };
    const update = {
        reqType: req.body.reqType
    };
    reqDB.findOneAndUpdate(filter, update).then((data) => {
        res.redirect("/teacherStuRequest")
    })
})


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

app.listen(3000, function () {
    console.log('server is started at: 3000');
});