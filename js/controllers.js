app.controller('YouishController', ['$scope', 'GiphyService', 'ImdbService', '$http', function($scope, GiphyService, ImdbService, $http) {
	$scope.firstName = "";
	$scope.month = "";
	$scope.day = "";
	$scope.giphy = "";
	$scope.showGiphy = false;
	$scope.giphyError = "";
	$scope.movies = [];
	$scope.showMovies = false;
	$scope.moviesError = "";
	$scope.showMovie = false;
	$scope.movieError = "";$scope.movieError = "";

	$scope.getGiphy = function() {
		GiphyService.search($scope.firstName)
		.then(function(obj) {
			if(obj.data[0]!=undefined && obj.data.length !== 0){
				$scope.showGiphy = true;
				$scope.giphy = obj.data[0].images.fixed_height.url;
			} else {
				$scope.showGiphy = false;
				$scope.noGiphy = true;
				$scope.giphyError = "Sorry, no Giphy for your name!"
			}
		});
	};

	$scope.searchImdb = function() {
		$scope.showMovie = false;
		$scope.showMovies = true;
		ImdbService.search($scope.firstName)
		.then(function(obj) {
			if(!obj.Error && obj.Search[0]!=undefined && obj.Search.length !== 0){
				var objArr = obj.Search;
				objArr.forEach(function(movie){
					$scope.movies.push({'title': movie.Title, 'year': movie.Year, 'id': movie.imdbID});
				});
			} else {
				$scope.moviesError = "Sorry, no movies for your name!"
			};
		});
	};

	$scope.searchAll = function() {
		$scope.giphyError = "";
		$scope.moviesError = "";
		$scope.movieError = "";
		$scope.movies = [];
		$scope.showGiphy = false;
		$scope.showMovies = false;
		$scope.getGiphy();
		$scope.searchImdb();
	};

	$scope.getMovieDetails = function(movie) {
		$scope.details = {};
		$scope.showMovie = true;
		$http.get('http://www.omdbapi.com/?i=' + movie.id + "&tomatoes=true").then(function(object){
			if(object.data.Error) {
				$scope.movieErr = "Sorry, no data available for this movie."
			};
			$scope.details = object.data;
		},function(data){
			if(data.status){
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