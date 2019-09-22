const credentials = {
    client: {
      id: 'dj0yJmk9U1NxMXdDVnZHY01PJmQ9WVdrOWVsTTBVMWMxTlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTRh',
      secret: '09ab16d94a3ee0b50beaa59d66e2cc26e388d5fe'
    },
    auth: {
      tokenHost: 'https://api.login.yahoo.com/oauth2/request_auth'
    }
  };
const oauth2 = require('simple-oauth2').create(credentials);
var firebase = require("firebase/app");
require("firebase/database");
var firebaseConfig = {
  apiKey: "AIzaSyCP8kbFioeXzGFmHxbiin97M8DxRyuPwRg",
  authDomain: "next-man-up.firebaseapp.com",
  databaseURL: "https://next-man-up.firebaseio.com",
  projectId: "next-man-up",
  storageBucket: "next-man-up.appspot.com",
  messagingSenderId: "410835904274",
  appId: "1:410835904274:web:07f79556f50845d880f5cb",
  databaseURL: "https://next-man-up.firebaseio.com/"
};
  
module.exports = (req, res) => {

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var token;
  database().ref('/users/importer/accessToken').once('value').then(function(snapshot) {
    token = snapshot.val();
    if(token){
      let accessToken = oauth2.accessToken.create(token);
      if(accessToken.expired()){
        try {
          accessToken = await accessToken.refresh();
          database().ref('users/importer').set({
            accessToken: accessToken
          });
          return res.status(200);
        } catch (error) {
          console.log('Error refreshing access token: ', error.message);
        }
      } else {
        return res.status(200);
      }
    } else {
      // Authorization uri definition
      const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: callbackUrl,
        scope: 'User.Read',
      });
      res.status(302).send(authorizationUri);
    }
  });
  


};