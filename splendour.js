var url = 'http://localhost:5000/recent';

$.ajax({
    url: url,
    type : 'GET',
    dataType: 'jsonp',
    success: function(results){
        console.log(results);
    }
});
