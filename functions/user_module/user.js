const express = require('express');
const router = express.Router();

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const userRef = admin.database().ref("/sample/user");

const response = require('./../module_response/response.js')

router.get('/', function(req, res) {

    return userRef.once("value").then(function(snap) {

      const data = snapToArray(snap);
      return res.type('application/json')
        .status(200)
        .send(response.format(200, data));
    }, function(errorObject) {

      return res.type('application/json')
        .status(422)
        .send(response.format(422,  null));
    });

  })
  .post('/', function(req, res) {
    if (isAddUserValid(req)) {
      return userRef.push(req.body).then((snap) => {
        return res.type('application/json')
          .status(200)
          .send(response.format(200,null));
      });
    } else {
      return res.type('application/json')
        .status(422)
        .send(response.format(422, null));
    }

  });

//export this router to use in our index.js
module.exports = router;

function isNotEmpty(obj) {
  return obj && obj !== 'null' && obj !== 'undefined';
}

function snapToArray(snapshot) {
  var returnArr = [];
  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.val();
    item.id = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}

function isAddUserValid(req) {
  return isNotEmpty(req.body['email']) &&
    isNotEmpty(req.body['firstname']) &&
    isNotEmpty(req.body['lastname']) &&
    isNotEmpty(req.body['address'])
}
