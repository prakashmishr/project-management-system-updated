const mailjet = require('node-mailjet')



const transpoter = mailjet.connect('f5ea49aec11cf41abf33c50ac77c1ef4', 'ff8ae0eed07b01d47dcd43874038625c')



module.exports = function (receiverMail,username, title, body) {

    const request = transpoter.post("send", {
            'version': 'v3.1'
        })
        .request({
            "Messages": [{
                "From": {
                    "Email": "pkm181020@gmail.com",
                    "Name": "Prakash Mishra"
                },
                "To": [{
                    "Email": receiverMail,
                    "Name": username,
                }],
                "Subject": title,
                "TextPart": "",
                "HTMLPart": body,
                "CustomID": "AppGettingStartedTest"
            }]
        })



    request.then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
            console.log(err)
        })
}