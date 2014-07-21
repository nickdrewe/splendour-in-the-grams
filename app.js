// primary app file

var express = require('express'),
	cors = require('cors'),
	morgan = require('morgan'),
	errorhandler = require('errorhandler'),
	compression = require('compression'),
	env = require('./config/env'),
	path = require('path'),
	app = express();

app.set('public', path.join(__dirname, env.public));
app.set('templates', path.join(__dirname, 'templates'));
app.engine('def', require('dot-emc').init({app: app, options: { templateSettings: { cache: app.get('env') != 'development' }}}).__express);
app.set('view engine', 'def');
app.use(cors());
app.use(morgan('dev')); 
app.use(require('less-middleware')(app.get('public')));
app.use(compression());
app.use(express.static(app.get('public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// enforce starting the instagram stuff
require('./instagram/instagram');

//setup routes
require('./config/routes')(app);

//create server and lsiten on port
var server = app.listen(env.port, function() {
    console.log('Listening on port %d', server.address().port);
});
