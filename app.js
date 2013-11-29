
/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , path = require('path')
  , Handlebars = require('handlebars')
  ;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.set('view engine', 'html');
app.set('view options', {layout:false});
app.engine('html', function(path, data, fn) {
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    var template = Handlebars.compile(str);
    fn(null, template(data));
  });
});
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('majorsecretthatno1willguess_asdegh4uw9cz02r8f5aqqwp'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', require('./routes'));
app.get('/test', require('./routes/test'));
app.get('/auth', require('./routes/auth'));
app.get('/send1', require('./routes/send1').get);
app.post('/send1', require('./routes/send1').post);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
