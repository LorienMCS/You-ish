app.controller('YouishController', ['$scope', 'GiphyService', 'WaybackLAService', 'WaybackRSService', 'WaybackIMDbService', 'ImdbService', '$http', '$sce', '$timeout', function($scope, GiphyService, WaybackLAService, WaybackRSService, WaybackIMDbService, ImdbService, $http, $sce, $timeout) {
	$scope.firstName = "";
	$scope.month = "";
	$scope.day = "";
	$scope.giphy = "";
	$scope.showGiphy = false;
	$scope.noGiphy = false;
	$scope.giphyError = "";
	$scope.births = [];
	$scope.events = [];
	$scope.showWiki = false;
	$scope.wikiError = "";
	$scope.laTimes = "";
	$scope.showLATimes = false;
	$scope.latTimesError = "";
	$scope.rollingStone = "";
	$scope.showRolling = false;
	$scope.rollingError = "";
	$scope.imdb = "";
	$scope.showImdb = false;
	$scope.imdbError = "";
	$scope.movies = [];
	$scope.showMovies = false;
	$scope.moviesError = "";
	$scope.showMovie = false;
	$scope.movieError = "";

	$scope.getGiphy = function() {
		GiphyService.search($scope.firstName)
		.then(function(obj) {
			if(obj.data[0]!=undefined && obj.data.length !== 0){
				$scope.showGiphy = true;
				$scope.giphy = obj.data[0].images.fixed_height.url;
			} else {
				$scope.showGiphy = false;
				$scope.giphyError = "Sorry, not able to get a Giphy!"
			}
		});
	};

	$scope.toggleGiphy = function() {
		if($scope.showGiphy) {
			$scope.noGiphy = true;
			$scope.showGiphy = false;
		} else {
			$scope.noGiphy = false;
			$scope.showGiphy = true;
		};
	};

	$scope.getWiki = function() {
		$scope.showWiki = true;
		$http.jsonp('http://history.muffinlabs.com/date/' + $scope.month + '/' + $scope.day + '?callback=JSON_CALLBACK').then(function(obj){
			if(obj.data.data.Births[0]!=undefined && obj.data.data.Births.length !== 0){
				var birthArr = obj.data.data.Births;
				birthArr.forEach(function(birth){
					$scope.births.push({'info': birth.text, 'year': birth.year});
				});
			};
			if(obj.data.data.Events[0]!=undefined && obj.data.data.Events.length !== 0){
				var eventArr = obj.data.data.Events;
				eventArr.forEach(function(occasion){
					$scope.events.push({'info': occasion.text, 'year': occasion.year});
				});
			};
		 },function(data){
			 	if(data.status){
			 	console.log(data.status);
		 		$scope.showWiki = false;
		 		$scope.wikiError = "Sorry, not able to get data";
		 		};
		});
	};

	$scope.getLATimes = function() {
		$scope.showLATimes = true;
		var waybackObj = {};
		var date = $scope.month + $scope.day;
		WaybackLAService.search(date)
		.then(function(obj) {
			waybackObj = obj.archived_snapshots.closest;
			if(waybackObj!=undefined && waybackObj.available){
				$scope.laTimes = $sce.trustAsResourceUrl(waybackObj.url);
			} else {
				$scope.showLATimes = false;
				$scope.laTimesError = "Sorry, not able to get data"
			};
		});
	};

	$scope.getRollingStone = function() {
		$scope.showRolling = true;
		var waybackObj = {};
		var date = $scope.month + $scope.day;
		WaybackRSService.search(date)
		.then(function(obj) {
			waybackObj = obj.archived_snapshots.closest;
			if(waybackObj!=undefined && waybackObj.available){
				$scope.rollingStone = $sce.trustAsResourceUrl(waybackObj.url);
			} else {
				$scope.showRolling = false;
				$scope.rollingError = "Sorry, not able to get data"
			};
		});
	};

	$scope.getIMDb = function() {
		$scope.showImdb = true;
		var waybackObj = {};
		var date = $scope.month + $scope.day;
		WaybackIMDbService.search(date)
		.then(function(obj) {
			waybackObj = obj.archived_snapshots.closest;
			if(waybackObj!=undefined && waybackObj.available){
				console.log(waybackObj.url);
				$scope.bbc = $sce.trustAsResourceUrl(waybackObj.url);
			} else {
				$scope.showImdb = false;
				$scope.imdbError = "Sorry, not able to get data"
			};
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
				$scope.showMovies = false;
				$scope.moviesError = "Sorry, not able to get movies!"
			};
		});
	};

	$scope.searchAll = function() {
		$scope.giphyError = "";
		$scope.wikiError = "";
		$scope.laTimesError = "";
		$scope.rollingError = "";
		$scope.imbdError = "";
		$scope.moviesError = "";
		$scope.movieError = "";
		$scope.births = [];
		$scope.events = [];
		$scope.movies = [];
		$scope.showGiphy = false;
		$scope.noGiphy = false;
		$scope.showWiki = false;
		$scope.showLATimes = false;
		$scope.showRolling = false;
		$scope.showImdb = false;
		$scope.showMovies = false;
		$scope.getGiphy();
		$scope.getWiki();
		$scope.getLATimes();
		$timeout( function(){ $scope.getRollingStone(); }, 3000);
		$timeout( function(){ $scope.getIMDb(); }, 6000);
		$scope.searchImdb();
	};

	$scope.getMovieDetails = function(movie) {
		$scope.details = {};
		$scope.showMovie = true;
		$http.get('http://www.omdbapi.com/?i=' + movie.id + "&tomatoes=true").then(function(object){
			if(object.data.Error) {
				$scope.showMovie = false;
				$scope.movieError = "Sorry, no data available for this movie."
			};
			$scope.details = object.data;
		},function(data){
			if(data.status){
				$scope.showMovie = false;
				$scope.movieError = "Sorry, not able to get data";
			};
		});
	};

}]);



app.controller('AboutController', ['$scope', function($scope) {
}]);


app.controller('ContactController', ['$scope', function($scope) {
	$scope.firstName = "Lorien";
}]);