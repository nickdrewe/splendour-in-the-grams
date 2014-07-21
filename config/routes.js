// route setup for instagram app

var inst = require('../instagram/instagram');

module.exports = function(app) {

	// get the primary site
	var templateLoc = app.get('templates');
	app.get('/', function(req, res){
		return res.render(templateLoc + '/index.def');
	});

	// retrieve the last image set buffer
	app.get('/recent', function(req, res){
		return res.json({ images: inst.getPosts() });
	});
};