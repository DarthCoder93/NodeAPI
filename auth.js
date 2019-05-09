import admin from 'firebase-admin'


module.exports = {
   isAutheticated = (req, res, next) => {

    let token = req.params.id

    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      // ...
    }).catch(function(error) {
      // Handle error
    });
   }


  }