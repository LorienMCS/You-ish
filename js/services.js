app.factory('GiphyService', ["$http", "$q", function($http, $q) {
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

    var deferred = $q.defer();

    $http.get(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Cannot Get Giphy")
    });

    return deferred.promise;
  }

  return GiphyService;
}]);


app.factory('WaybackLAService', ["$http", "$q", function($http, $q) {
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

    var deferred = $q.defer();

    $http.jsonp(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Cannot Get LA Times Website");
    });

    return deferred.promise;
  }

  return WaybackLAService;
}]);


app.factory('WaybackIMDbService', ["$http", "$q", function($http, $q) {
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

    var deferred = $q.defer();

    $http.jsonp(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Cannot Get IMDb Website");
    });

    return deferred.promise;
  }

  return WaybackIMDbService;
}]);


app.factory('ITunesService', ["$http", "$q", function($http, $q) {
  var ITunesService = {};
  var baseUrl = "http://itunes.apple.com/search?callback=JSON_CALLBACK&term=";
  var searchTerm = '';
  var songSearch = "&entity=song&attribute=songTerm&explicit=no&limit=25";

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

    var deferred = $q.defer();

    $http.jsonp(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Cannot get songs")
    });

    return deferred.promise;
  }

  return ITunesService;
}]);


app.factory('ImdbService', ["$http", "$q", function($http, $q) {
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

    var deferred = $q.defer();

    $http.get(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Cannot Get Movies")
    });

    return deferred.promise;
  }

  return ImdbService;
}]);


app.factory('MovieService', ["$http", "$q", function($http, $q) {
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

    var deferred = $q.defer();

    $http.get(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Cannot Get Movie")
    });

    return deferred.promise;
  }

  return MovieService;
}]);


app.factory('IBooksService', ["$http", "$q", function($http, $q) {
  var IBooksService = {};
  var baseUrl = "http://itunes.apple.com/search?callback=JSON_CALLBACK&term=";
  var searchTerm = '';
  var bookSearch = "&entity=ebook&attribute=allTrackTerm&explicit=no&limit=20";

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

    var deferred = $q.defer();

    $http.jsonp(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Cannot get books")
    });

    return deferred.promise;
  }

  return IBooksService;
}]);