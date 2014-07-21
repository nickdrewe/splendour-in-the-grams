$(document).ready(respond);
$(window).on('resize',respond);


function respond(){
	var height = $(window).height();
	var width = $(window).width();

	if(width > 1024){
		respondTo('33.33%', 5, width);
	}else if(600 < width && width < 1024){
		respondTo('25%', 4, width);
	}else if(600 > width){
		respondTo('20%', 3, width);
	}
}

function respondTo(height, row, windowWidth){
	$('.square').height(height);
	$('.square').width($('.square').height());
	$('.logo').width($('.square').height() * row);

	var margin = (windowWidth - (row * $('.square').height()))/2;
	$('.logo').css( { marginLeft : margin, marginRight : margin } );

}