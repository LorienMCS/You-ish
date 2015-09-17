app.controller('YouishController', ['$scope', 'GiphyService', 'ImdbService', '$http', function($scope, GiphyService, ImdbService, $http) {
	$scope.firstName = "";
	$scope.month = "";
	$scope.day = "";
	$scope.giphy = "";
	$scope.noGiphy = true;
	$scope.noGiphyError = true;
	$scope.giphyError = "";
	$scope.movies = [];
	$scope.noMovies = true;
	$scope.noMovieError = true;
	$scope.movieError = "";
	$scope.showMovie = false;

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
		$scope.showMovie = false;
		ImdbService.search($scope.firstName)
		.then(function(obj) {
			if(!obj.Error && obj.Search[0]!=undefined && obj.Search.length !== 0){
				$scope.noMovies = false;
				$scope.movies = [];
				var objArr = obj.Search;
				objArr.forEach(function(movie){
					$scope.movies.push({'title': movie.Title, 'year': movie.Year, 'id': movie.imdbID});
				});
			} else {
				$scope.noMovies = true;
				$scope.noMovieError = false;
				$scope.movieError = "Sorry, no movies for your name!"
			};
		});
	};

	$scope.searchAll = function() {
		$scope.getGiphy();
		$scope.searchImdb();
	};


	$scope.getMovieDetails = function(movie) {
		$scope.noMovies = true;
		$scope.details = {};
		$scope.searchResults = true;
		$scope.showMovie = true;
		$http.get('http://www.omdbapi.com/?i=' + this.movie.id + "&tomatoes=true").then(function(object){
			if(object.data.Error) {
				$scope.noMovieError = false;
				$scope.movieErr = "Sorry, no data available for this movie."
			};
			$scope.details = object.data;
		},function(data){
			if(data.status){
				$scope.noMovieError = false;
				$scope.movieErr = "Not able to get data";
			};
		});
	};


}]);







app.controller('AboutController', ['$scope', function($scope) {
}]);


app.controller('ContactController', ['$scope', function($scope) {
	$scope.firstName = "Lorien";
}]);