var url = 'http://localhost:5000/recent';
var interval = 30000;
var currentPosts = [];

requestPosts();

function requestPosts(){
	$.ajax({
	    url: url,
	    type : 'GET',
	    dataType: 'json',
	    success: function(results){
	        //console.log(results);

	        sortPosts(results);

	        setTimeout(function(){
	        	requestPosts();
	        }, interval);
	    }
	});
}

function sortPosts(posts){
	//on first sort, use the whole lot
	if(currentPosts.length == 0){
		currentPosts = posts;
		//console.log(currentPosts);
		quePosts(posts);

	//every other time, find the difference between current
	//posts and new posts
	}else{
		var allPosts = _.uniq(currentPosts.concat(posts));
		var newPosts = _.difference(allPosts, currentPosts);
		console.log(newPosts.length);
		currentPosts = newPosts.concat(currentPosts);
		if(newPosts.length > 0){
			quePosts(newPosts);
		}
	}
}

function quePosts(posts){
	var wait = interval / posts.length;

	var postsLength = posts.length;
	for (var i = 0; i < postsLength; i++) {
		var delay = i * wait;
		var post = posts[i];

		addPost(post, delay);
	}
}


function addPost(post, delay){
	setTimeout(function(){
		$('.posts').append('<img src="' + post +'media/?size=t"/>');
	}, delay);
}