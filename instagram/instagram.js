
var env = require('../config/env'),
	https = require('https');

var interval = env.instagram.interval;
var returnMax = env.instagram.returnMax;

var clientId = env.instagram.clientId;
var clientSecret = env.instagram.clientsecret;

var host = 'https://api.instagram.com';

// start the image grabbing process
var tags = env.instagram.tags.split(',');
var tagIndex = 0;

// the internal post state
var posts = [];

// launch the initial loop process
loopProcess();

// external access to the current post set
exports.getPosts = function() {
	return posts;
};

// main timer loop process
function loopProcess() {

	// run the current tag through the retrieval
	processTag(tags[tagIndex], function(err, result){

		if(err){
			console.log('An error occurred trying to retrieve next image set: ');
			console.log(err);
		}else{
			// update the current url array state with the result
			updatePosts(result.data);
		}

		// update the tag index and reset if outside tag count
		if(++tagIndex >= tags.length) { tagIndex = 0; }

		// restart the process
		setTimeout(loopProcess, interval);
	});
}

// ask instagram for the latest set of pic urls for a specific tag via api url
function processTag(tag, _callback) {
	var url = host + '/v1/tags/' + tag + '/media/recent?count=33&client_id=' + clientId;

	https.get(url, function(res) {
		// check for any response errors
		if(res.statusCode !== 200){
			return _callback('Error requesting ' + url + ', statusCode: ' + res.statusCode);
		}

		// result content
		var body = '';

		res.on('data', function(chunk) {
		    body += chunk;
		});

		res.on('end', function(){
			return _callback(null, JSON.parse(body));
		});

	}).on('error', function(err){
		return _callback(err);
	});
}

// take an array of new image meta and update the internal state
function updatePosts(data) {
	posts = [];
	data.forEach(function(post){
		if(post.type == 'image'){
			posts.push(post.link);
		}
	});
}	
