var OAuth = require('google-oauth');
console.log("___________________", process.env.client_id);
console.log("___________________", process.env.client_secret);
var oauth = new OAuth.OAuth2(
  'asdf',                      //client_id
  'asdfasdf',                  //client_secret
  'http://fierce-sierra-2412.herokuapp.com/auth'//redirecturl, point back to this route on your public hosted server
);

module.exports = function(req, res){
  if(!req.query.code){

    //Redirect the user to Authentication From,
    // Set authentication scope to google glass and profile
    oauth.getGoogleAuthorizeTokenURL(
      [
        'https://www.googleapis.com/auth/glass.timeline',
        'https://www.googleapis.com/auth/glass.location',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      function(err, redirecUrl) {
        console.log('redirecUrl', redirecUrl);

        if(err) return res.send(500,err);
      return res.redirect(redirecUrl);
    });

  }else{
    //Get access_token from the code
    oauth.getGoogleAccessToken(req.query, function(err, access_token, refresh_token) {
      if(err) return res.send(500,err);
      console.log('access_token, refresh_token', access_token, refresh_token);
      
      req.session.access_token = access_token;
      req.session.refresh_token = refresh_token;
      return res.redirect('/');
    });
  }
}