var rest = require('restler');
var mirrorurl = 'https://www.googleapis.com/mirror/v1/timeline';

module.exports = {
  get: function(req, res){
    res.render('send2', {title: 'Send2'});
  },
  post: function(req, res){

    //here is what the post.request needs to look like
    //https://developers.google.com/glass/v1/reference/timeline/insert

    var token = req.session.access_token ||'ya29.AHES6ZQf3cD570cqVM0pBTKnywAnZRHGEmz1a19p8BCtgt5hldiKPA';
    var message = {
      text: req.body.message,
      menuItems:[
        {action: 'REPLY'}
      ],
      callbackUrl: 'http://fast-forest-8131.herokuapp.com/send2callback'
    }
    var options = {
      headers:{
        'Host':'www.googleapis.com',
        'Authorization':'Bearer '+token,
        'Content-Type': 'application/json',
        'Content-Length': JSON.stringify(message).length
      },
      data: JSON.stringify(message)
    };
    rest.post(mirrorurl, options).on('complete', function(data, response){
      if(response.statusCode == 201){
        console.log('SUCCESS RESPONSE FROM MIRROR',data, response);
      }
    }).on('success', function(data, response){
      console.log('success post');
    }).on('fail', function(data, response){
      console.log('failed post', data.error.errors);
    }).on('error', function(err, response){
      console.log('error on post');
    });
  }
}