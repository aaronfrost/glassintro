
/*
 * GET home page.
 */

module.exports = function(req, res){
  var options = { title: 'Glass Demo - HB Title' };
  if(req.session.access_token){
    options.access_token = req.session.access_token;
    options.refresh_token = req.session.refresh_token;
  }
  res.render('index', options);
};