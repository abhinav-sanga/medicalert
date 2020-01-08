var router = require('express').Router();
var request = require('request')

var api_endpoint = "https://bg1r3kfui0.execute-api.us-east-1.amazonaws.com/dev";

router.get('/firstNamelastName', (req, res, next) => {
    request.get({
        url: api_endpoint + '/queryByFirstNameAndLastName/firstName/' + req.query.firstName + '/lastName/' + req.query.lastName,
        json: true
    }, (err, resp, body) => {
        if (err) {
            console.log("Error:", err);
        } else {
            let returnedArray = [...body];
            res.send(returnedArray);
        }
    });
});


router.get('/firstNameNoLastName', (req, res, next) => {
    request.get({
        url: api_endpoint + '/queryByFirstNameNoLastName/' + req.query.firstName,
        json: true
    }, (err, resp, body) => {
        if (err) {
            console.log("Error:", err);
        } else {
            let returnedArray = [...body];
            res.send(returnedArray);
        }
    });
})

router.get('/medicAlertMemberId', (req, res, next) => {
    request.get({
        url: api_endpoint + '/queryByMeidcAlertMemberId/' + req.query.memberId,
        json: true
    }, (err, resp, body) => {
        if (err) {
            console.log("Error:", err);
        } else {
            let returnedArray = [...body];
            res.send(returnedArray);
        }
    });
});

// router.get('/memberAsset', async function(req, res, next) {
//     request.get({
//         url: api_endpoint + '/queryMemberAsset/' + req.query.memberId,
//         json: true
//     }, (err, resp, body) => {
//         if (err) {
//             console.log("Error:", err);
//         } else {
//             let returnedArray = [...body];
//             res.send(returnedArray);
//         }
//     });
// });

module.exports = router;