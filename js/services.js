app.factory('GiphyService', ["DataService", function(DataService) {
  var GiphyService = {};
  var baseUrl = "http://api.giphy.com/v1/gifs/search?q=";
  var rating = "&rating=g"
  var publicKey = "&api_key=dc6zaTOxFJmzC";
  var searchTerm = '';

  GiphyService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  GiphyService.getSearchTerm = function() {
    return decodeURIComponent(searchTerm);
  }

  GiphyService.search = function(term,cb) {
    if (term !== undefined) {
      GiphyService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + rating + publicKey;

    return DataService.getData(url);
  }

  return GiphyService;
}]);


app.factory('WaybackLAService', ["DataService", function(DataService) {
  var WaybackLAService = {};
  var baseUrl = "http://archive.org/wayback/available?callback=JSON_CALLBACK&url=latimes.com&timestamp=2005";
  var searchTerm = '';

  WaybackLAService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  WaybackLAService.getSearchTerm = function() {
    return decodeURIComponent(searchTerm);
  }

  WaybackLAService.search = function(term,cb) {
    if (term !== undefined) {
      WaybackLAService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm;

    return DataService.getData(url);
  }

  return WaybackLAService;
}]);


app.factory('WaybackIMDbService', ["DataService", function(DataService) {
  var WaybackIMDbService = {};
  var baseUrl = "http://archive.org/wayback/available?callback=JSON_CALLBACK&url=imdb.com&timestamp=2005";
  var searchTerm = '';

  WaybackIMDbService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  WaybackIMDbService.getSearchTerm = function() {
    return decodeURIComponent(searchTerm);
  }

  WaybackIMDbService.search = function(term,cb) {
    if (term !== undefined) {
      WaybackIMDbService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm;

    return DataService.getData(url);
  }

  return WaybackIMDbService;
}]);


app.factory('ITunesService', ["DataService", function(DataService) {
  var ITunesService = {};
  var baseUrl = "http://itunes.apple.com/search?callback=JSON_CALLBACK&term=";
  var searchTerm = '';
  var songSearch = "&entity=song&attribute=songTerm&explicit=no&limit=20";

  ITunesService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  ITunesService.getSearchTerm = function() {
    return decodeURIComponent(searchTerm);
  }

  ITunesService.search = function(term,cb) {
    if (term !== undefined) {
      ITunesService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + songSearch;

    return DataService.getData(url);
  }

  return ITunesService;
}]);


app.factory('ImdbService', ["DataService", function(DataService) {
  var ImdbService = {};
  var baseUrl = "http://www.omdbapi.com/?s=";
  var searchTerm = '';

  ImdbService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  ImdbService.getSearchTerm = function() {
    return decodeURIComponent(searchTerm);
  }

  ImdbService.search = function(term,cb) {
    if (term !== undefined) {
      ImdbService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm;

    return DataService.getData(url);
  }

  return ImdbService;
}]);


app.factory('MovieService', ["DataService", function(DataService) {
  var MovieService = {};
  var baseUrl = "http://www.omdbapi.com/?i=";
  var searchTerm = '';
  var tomatoes = "&tomatoes=true";

  MovieService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  MovieService.getSearchTerm = function() {
    return decodeURIComponent(searchTerm);
  }

  MovieService.search = function(term,cb) {
    if (term !== undefined) {
      MovieService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + tomatoes;

    return DataService.getData(url);
  }

  return MovieService;
}]);


app.factory('IBooksService', ["DataService", function(DataService) {
  var IBooksService = {};
  var baseUrl = "http://itunes.apple.com/search?callback=JSON_CALLBACK&term=";
  var searchTerm = '';
  var bookSearch = "&entity=ebook&attribute=allTrackTerm&explicit=no&limit=10";

  IBooksService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  IBooksService.getSearchTerm = function() {
    return decodeURIComponent(searchTerm);
  }

  IBooksService.search = function(term,cb) {
    if (term !== undefined) {
      IBooksService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + bookSearch;

    return DataService.getData(url);
  }

  return IBooksService;
}]);


// service used in all factories in this file
app.service('DataService', ["$http", "$q", function($http, $q) {
  var DataService = {};

  DataService.getData = function(url) {
    var deferred = $q.defer();

    $http.jsonp(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Failed to fetch: " + url);
    });

    return deferred.promise;
  }

  return DataService;
}]);
