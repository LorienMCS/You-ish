app.controller('YouishController', ['$scope', 'GiphyService', 'ImdbService', function($scope, GiphyService, ImdbService) {
	$scope.firstName = "";
	$scope.month = "";
	$scope.day = "";
	$scope.giphy = "";
	$scope.noGiphy = true;
	$scope.noGiphyError = true;
	$scope.giphyError = "";
	$scope.movies = [];
	$scope.noMovie = true;
	$scope.noMovieError = true;
	$scope.movieError = "";

	$scope.getGiphy = function() {
		GiphyService.search($scope.firstName)
		.then(function(obj) {
			if(obj.data[0]!=undefined && obj.data.length !== 0){
				$scope.noGiphy = false;
				$scope.giphy = obj.data[0].images.fixed_height.url;
			} else {
				$scope.noGiphy = true;
				$scope.noGiphyError = false;
				$scope.giphyError = "Sorry, no Giphy for your name!"
			}
		});
	};

	$scope.searchImdb = function() {
		ImdbService.search($scope.firstName)
		.then(function(obj) {
			if(!obj.Error && obj.Search[0]!=undefined && obj.Search.length !== 0){
				$scope.noMovie = false;
				$scope.movies = [];
				var objArr = obj.Search;
				objArr.forEach(function(movie){
					$scope.movies.push({'title': movie.Title, 'year': movie.Year, 'id': movie.imdbID});
				});
			} else {
				$scope.noMovie = true;
				$scope.noMovieError = false;
				$scope.movieError = "Sorry, no movies for your name!"
			};
		});
	};

	$scope.searchAll = function() {
		$scope.getGiphy();
		$scope.searchImdb();
	}


}]);







app.controller('AboutController', ['$scope', function($scope) {
}]);


app.controller('ContactController', ['$scope', function($scope) {
	$scope.firstName = "Lorien";
}]);