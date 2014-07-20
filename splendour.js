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
		quePosts(posts, true);

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

function quePosts(posts, first){
	var wait = interval / posts.length;

	var postsLength = posts.length;
	for (var i = 0; i < postsLength; i++) {
		var delay = i * wait;
		var post = posts[i];


		if(first && i < 16){
			//for the first 16 posts, add in order
			addPost(post, delay, i + 1);
		}else{
			//everything else, do at random
			addPost(post, delay);
		}
	}
}


function addPost(post, delay, square){
	setTimeout(function(){

		if(square){
			var squareId = square;
		}else{
			var squareId = randomIntFromInterval(1, 15);
		}

		$('#' + squareId).fadeOut(300, function(){
			$(this).attr('src',post +'media/?size=m').bind('onreadystatechange load', function(){
				if (this.complete) $(this).fadeIn(300);
			});
		});

		//handle img errors
		$('img').error(function(){
		        $(this).attr('src', 'img/logo-tile.jpg');
		});
	}, delay);
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
