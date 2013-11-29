
/*
 * GET home page.
 */

module.exports = function(req, res){
  var options = { title: 'Glass Demo - HB Title' };
  res.render('index', options);
};