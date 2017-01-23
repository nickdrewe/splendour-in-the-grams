
angular.module('splendour', ['ngAnimate'])
	.controller('SplendourCtrl', function($scope, $timeout, $http){

		$scope.images = []
		for(var i=0; i<30; i++){
			$scope.images.push({});
		}

		var url = 'http://localhost:5000/recent';
		$http.get(url).success(function(result){
			for(var i=0; i<result.images.length; i++){
				$scope.images[i].url = result.images[i] + 'media/?size=m';
			}
		});

		/*
		$scope.images = [
			//{url: 'http://scienceblogs.com/gregladen/files/2012/12/Beautifull-cat-cats-14749885-1600-1200.jpg'},
			{url: 'http://scienceblogs.com/gregladen/files/2012/12/Beautifull-cat-cats-14749885-1600-1200.jpg'}
		];

		$timeout(function(){
			$scope.images[0].url = 'http://disabledgrappler.com/wp-content/uploads/2014/05/pig.jpg';
		}, 2000)
*/
		$scope.test = function() {
			$scope.images[7].url = 'http://www.konicaminolta.com/kids/endangered_animals/library/field/img/m-tapir_img01-l.jpg';
		};
	})
	.directive('fadeChangeImage', function($timeout){
		return {
			scope: { url: '=fadeChangeImage' },
			template: '<img class="inimage" ng-src="{{actualUrl}}" ng-show="showImage"/>',
			link: function(scope, elem, attrs) {
				scope.showImage = false;

				$timeout(function(){
					scope.$watch('url', function(newVal){
						if(newVal && newVal !== scope.actualUrl){
							if(!scope.actualUrl){
								scope.actualUrl = newVal;
								scope.showImage = true;
							}else{
								scope.showImage = false;
								$timeout(function(){
									scope.actualUrl = newVal;
									scope.showImage = true;
								}, 2000);
							}
						}
					});
				});
			}
		};
	})
	.directive('imageSet', function($timeout, $window){
		return {
			link: function(scope, elem, attrs) {

				// optimum number of images to show for average screen
				var optimum = 20;
				// minimum image size before reducing image count
				var minSize = 130;

				function updateLayout() {
					var parent = elem.parent();
					var x = parent[0].clientWidth;
					var y = parent[0].clientHeight;

					// calculate the image dimensions, margins, etc
					var ratio = x/y;
					var yCount = Math.floor(Math.sqrt(optimum / ratio));
					var imgDim = Math.ceil(y / yCount);

					// alter if the image dim gets too small
					if(imgDim < minSize) {				
						yCount = Math.ceil(y / minSize);
						imgDim = Math.ceil(y / yCount);
					}

					var xCount = Math.ceil(x / imgDim);

					var totalImages = xCount * yCount;

					var children = elem.children();
					for(var i=0; i<children.length; i++){
						var img = angular.element(children[i]);
						//img.css('top', 50);
						//img.css('left', 100*i);
						img.css('width', imgDim);
						img.css('height', imgDim);
					}
					
					// calculate the side margins for the frame
					var margin = ((xCount * imgDim) - x) / 2;			

					var mtxt = '-' + margin + 'px';
					elem.css('left', mtxt);

					// size the main area to fill the parent
					elem.css('width', x + (margin*2));
					elem.css('height', y);
				}

				$timeout(function(){
					updateLayout();
				});

				angular.element($window).bind('resize', updateLayout);
			}
		};
	});
