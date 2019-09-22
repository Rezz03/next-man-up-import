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
module.exports = (req, res) => {
const options = {
    authCode,
    redirect_uri: callbackUrl,
};

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


try {
    const result = await oauth2.authorizationCode.getToken(options);

    console.log('The resulting token: ', result);

    const token = oauth2.accessToken.create(result);
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    database().ref('users/importer').set({
        accessToken: token
      });
    
    return res.status(200);
} catch(error) {
    console.error('Access Token Error', error.message);
    return res.status(500).json('Authentication failed');
}
};
