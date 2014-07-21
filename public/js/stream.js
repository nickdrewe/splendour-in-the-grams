soundManager.setup({
	url: '/swf/', 
	onready: function() {
		var mySound = soundManager.createSound({
			id: 'triplej',
			url: 'http://shoutmedia.abc.net.au:10426/;',
			autoPlay: false
		});
		//mySound.play();
	},
	ontimeout: function() {
		// Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
	}
});



function play(){
	soundManager.play('triplej');
	$('.play').hide();
	$('.pause').show();
}

function pause(){
	soundManager.pause('triplej');
	$('.pause').hide();
	$('.play').show();
}