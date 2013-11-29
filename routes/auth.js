var OAuth = require('google-oauth');
var oauth = new OAuth.OAuth2(
  process.env.client_id,                      //client_id
  process.env.client_secret,                  //client_secret
  'http://fast-forest-8131.herokuapp.com/auth'//redirecturl, point back to this route on your public hosted server
);

module.exports = function(req, res){
  if(!req.query.code){

    //Redirect the user to Authentication From,
    // Set authentication scope to google glass and profile
    oauth.getGoogleAuthorizeTokenURL(
      [
        'https://www.googleapis.com/auth/glass.timeline',
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