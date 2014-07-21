var express = require('express');
var app = express();

var http = require('http');
var https = require('https');
var request = ('request');
var _ = require('lodash');

var cors = require('cors');

var interval = 60000;
var returnMax = 33;

app.use(cors());

var port = Number(process.env.PORT || 5000);

//var host = '123.100.147.113:3450';

var clientId = 'c0c92ad4fc0043c29c1020d9266f23d6';
var clientSecret = '1229ceaa010c481991aeb61fa322d1b1';

//endpoint for recent media.
app.get('/recent', function(req, res){
	res.json(_.pluck(posts, 'link'));
});

app.get('/', function(req, res){
	res.send('hello world');
});

var posts = [];

igSearchTag('vegas');

//create server and lsiten on port
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});


function igSearchTag(tag){
	var host = 'api.instagram.com';
	var path = '/v1/tags/' + tag + '/media/recent?count=33&client_id=' + clientId;
	var url = 'https://' + host + path;

	https.get(url, function(res) {
	    var body = '';

	    res.on('data', function(chunk) {
	        body += chunk;
	    });

	    res.on('end', function() {
	        var igResponse = JSON.parse(body)
	        //console.log(igResponse);

	        //check status of response
	        if(igResponse.meta.code === 200){
	        	//200 status is good, sort response
	        	console.log(igResponse.meta.code + 'IG API Request Successful');
	        	sortPosts(igResponse.data, tag);
	        }else{
	        	//other status, something went wrong
	        	console.log('IG API ERROR');
	        	console.log(igResponse);

	        	//keep running anyway
	        	setTimeout(function(){
	        		igSearchTag(tag);
	        	}, interval);

	        }
	        
	    });
	}).on('error', function(e) {
	      console.log("Got error: ", e);
	});
}

function sortPosts(data, tag){
	posts = [];
	data.forEach(function(post){
		if(post.type == 'image'){
			var newPost = { 
				link: post.link,
				created: post.created_time
			};
			posts.push(newPost);
		}
	});

	//posts = _.sortBy(_.uniq(posts, 'link'), ['created']).reverse();

	//console.log(posts.length + '========');
	//console.log(posts);

	if(posts.length > returnMax){
		var j = posts.length - returnMax;
		var k = 0 - j;
		posts.splice(k, j)
		console.log(j + ' new posts');
	}
	setTimeout(function(){
		igSearchTag(tag);
	}, interval);

	
}


