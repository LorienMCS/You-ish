app.controller('YouishController', ['$scope', 'GiphyService', 'WaybackLAService', 'WaybackIMDbService', 'ITunesService', 'ImdbService', 'MovieService', 'IBooksService', '$http', '$sce', '$timeout', function($scope, GiphyService, WaybackLAService, WaybackIMDbService, ITunesService, ImdbService, MovieService, IBooksService, $http, $sce, $timeout) {
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
	$scope.imdb = "";
	$scope.showImdb = false;
	$scope.imdbError = "";
	$scope.songs = [];
	$scope.iTunes = "";
	$scope.showITunes = false;
	$scope.iTunesError = "";
	$scope.movies = [];
	$scope.showMovies = false;
	$scope.moviesError = "";
	$scope.showMovie = false;
	$scope.movieError = "";
	$scope.books = [];
	$scope.iBooks = "";
	$scope.showIBooks = false;
	$scope.iBooksError = "";

	$scope.getGiphy = function() {
		GiphyService.search($scope.firstName)
		.then(function(obj) {
			if(obj.data[0]!=undefined && obj.data.length !== 0){
				$scope.showGiphy = true;
				$scope.giphy = obj.data[0].images.fixed_height.url;
			} else {
				$scope.showGiphy = false;
				$scope.giphyError = "Sorry, not able to get Giphy"
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
				for(var i = birthArr.length-1; i > birthArr.length-201; i--) {
					$scope.births.push({'info': birthArr[i].text, 'year': birthArr[i].year});
				};
			};
			if(obj.data.data.Events[0]!=undefined && obj.data.data.Events.length !== 0){
				var eventArr = obj.data.data.Events;
				for(var i = eventArr.length-1; i >= 0; i--) {
					$scope.events.push({'info': eventArr[i].text, 'year': eventArr[i].year});
				};
			};
		 },function(data){
			 	if(data.status){
		 		$scope.wikiError = "Sorry, not able to get data";
		 		};
		});
	};

	$scope.searchITunes = function() {
		$scope.showITunes = true;
		ITunesService.search($scope.firstName)
		.then(function(obj) {
			if(obj.results.length!==0){
				var objArr = obj.results;
				objArr.forEach(function(song){
					$scope.songs.push({'artist': song.artistName, 'title': song.trackName, 'album': song.collectionName, 'image': song.artworkUrl100, 'date': song.releaseDate, 'id': song.trackId, 'preview': $sce.trustAsResourceUrl(song.previewUrl), 'itunes': song.trackViewUrl});
				});
			} else {
			 	$scope.iTunesError = "Sorry, not able to get songs"
		 	};
		});
	};

	$scope.play = function(song) {
		$scope.songs.forEach(function(otherSong){
			$scope.pause(otherSong);
		});
		document.getElementById(song.id).play();
	};

	$scope.pause = function(song) {
		document.getElementById(song.id).pause();
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
				$scope.moviesError = "Sorry, not able to get movies"
			};
		});
	};

	$scope.getMovieDetails = function(movie) {
		$scope.details = {};
		$scope.showMovie = true;
		MovieService.search(movie.id)
		.then(function(object){
			if(object) {
			$scope.details = object;
			} else {
				$scope.movieError = "Sorry, not able to get movie details";
			};
		});
	};

	$scope.searchIBooks = function() {
		$scope.showIBooks = true;
		IBooksService.search($scope.firstName)
		.then(function(obj) {
			if(obj.results.length!==0){
				var objArr = obj.results;
				objArr.forEach(function(book){
				 $scope.books.push({'artist': book.artistName, 'title': book.trackName, 'image': book.artworkUrl100, 'date': book.releaseDate, 'itunes': book.trackViewUrl});
				});
			} else {
			 	$scope.iBooksError = "Sorry, not able to get books"
		 	};
		});
	};

	$scope.getLATimes = function() {
		$scope.showLATimes = true;
		var waybackObj = {};
		var date = $scope.month + $scope.day;
		if($scope.month && $scope.day) {
			WaybackLAService.search(date)
			.then(function(obj) {
				waybackObj = obj.archived_snapshots.closest;
				if(waybackObj!=undefined && waybackObj.available){
					$scope.laTimes = $sce.trustAsResourceUrl(waybackObj.url);
					waybackObj = {};
				} else {
					$scope.laTimesError = "Sorry, not able to get LA Times website"
				};
			});
		} else {
			$scope.laTimesError = "Sorry, not able to get LA Times website"
		};
	};

	$scope.getIMDb = function() {
		$scope.showImdb = true;
		var waybackObj = {};
		var date = $scope.month + $scope.day;
		if($scope.month && $scope.day) {
			WaybackIMDbService.search(date)
			.then(function(obj) {
				waybackObj = obj.archived_snapshots.closest;
				if(waybackObj!=undefined && waybackObj.available){
					$scope.imdb = $sce.trustAsResourceUrl(waybackObj.url);
					waybackObj = {};
				} else {
					$scope.imdbError = "Sorry, not able to get IMDb Website"
				};
			});
		} else {
			$scope.imdbError = "Sorry, not able to get IMDb website"
		};
	};

	$scope.searchAll = function() {
		if ($scope.entry.$valid) {
			$scope.giphyError = "";
			$scope.wikiError = "";
			$scope.iTunesError = "";
			$scope.laTimesError = "";
			$scope.imbdError = "";
			$scope.iBooksError = "";
			$scope.moviesError = "";
			$scope.movieError = "";
			$scope.births = [];
			$scope.events = [];
			$scope.movies = [];
			$scope.songs = [];
			$scope.books = [];
			$scope.showGiphy = false;
			$scope.noGiphy = false;
			$scope.showWiki = false;
			$scope.showLATimes = false;
			$scope.showImdb = false;
			$scope.showITunes = false;
			$scope.showMovies = false;
			$scope.showIBooks = false;
			 $scope.getGiphy();
			$scope.getWiki();
			$scope.searchITunes();
			$scope.searchImdb();
			$timeout(function(){ $scope.searchIBooks() }, 2000);
			$scope.getLATimes();
			$timeout(function(){ $scope.getIMDb() }, 2000);
		};
	};

}]);


app.controller('AboutController', ['$scope', function($scope) {
}]);


app.controller('ContactController', ['$scope', function($scope) {
	$scope.firstName = "Lorien";
}]);