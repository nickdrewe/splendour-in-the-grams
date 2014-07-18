var express = require('express');
var app = express();

var http = require('http');
var https = require('https');
var request = ('request');
var _ = require('lodash');

var cors = require('cors');

app.use(cors());

var port = Number(process.env.PORT || 5000);

//var host = '123.100.147.113:3450';

var clientId = 'c0c92ad4fc0043c29c1020d9266f23d6';
var clientSecret = '1229ceaa010c481991aeb61fa322d1b1';

//endpoint for recent media.
app.get('/recent', function(req, res){
	res.json({ data : posts });
});

app.get('/', function(req, res){
	res.send('hello world');
});

var posts = [];

igSearchTag('chicago');

//create server and lsiten on port
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});


function igSearchTag(tag){
	var host = 'api.instagram.com';
	var path = '/v1/tags/' + tag + '/media/recent?client_id=' + clientId;
	var url = 'https://' + host + path;

	https.get(url, function(res) {
	    var body = '';

	    res.on('data', function(chunk) {
	        body += chunk;
	    });

	    res.on('end', function() {
	        var igResponse = JSON.parse(body)
	        //console.log(igResponse);
	        sortPosts(igResponse.data, tag);
	    });
	}).on('error', function(e) {
	      console.log("Got error: ", e);
	});
}

function sortPosts(data, tag){
	data.forEach(function(post){
		var newPost = { 
			link: post.link,
			created: post.created_time
		};
		posts.push(newPost);
	});

	posts = _.sortBy(_.uniq(posts, 'link'), ['created']).reverse();

	console.log(posts.length + '========');
	//console.log(posts);

	if(posts.length >= 105){
		posts = posts.slice(5);
	}
	setTimeout(function(){
		igSearchTag(tag);
	}, 60000);

	
}


