app.controller('YouishController', ['$scope', 'GiphyService', function($scope, GiphyService) {
	$scope.firstName = "";
	$scope.month = "";
	$scope.day = "";
	$scope.giphy = "";
	$scope.noGiphy = true;
	$scope.noError = true;
	$scope.error = "";

	$scope.getGiphy = function() {
		GiphyService.search($scope.firstName)
		.then(function(obj) {
			if(obj.data[0]!=undefined && obj.data.length !== 0){
				$scope.noGiphy = false;
				$scope.giphy = obj.data[0].images.fixed_height.url;
			} else {
				$scope.noGiphy = true;
				$scope.noError = false;
				$scope.error = "Sorry, no Giphy for your name!"
			}
		});
	};
}]);


app.controller('AboutController', ['$scope', function($scope) {
}]);


app.controller('ContactController', ['$scope', function($scope) {
	$scope.firstName = "Lorien";
}]);