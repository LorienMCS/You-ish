app.factory('GiphyService', ["DataService", function(DataService) {
  var GiphyService = {};
  var baseUrl = "http://api.giphy.com/v1/gifs/search?q=";
  var rating = "&rating=g"
  var publicKey = "&api_key=dc6zaTOxFJmzC";
  var searchTerm = '';

  GiphyService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  GiphyService.search = function(term) {
    if (term !== undefined) {
      GiphyService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + rating + publicKey;

    return DataService.getData(url);
  }

  return GiphyService;
}]);


app.factory('WikiService', ["JSONPDataService", function(JSONPDataService) {
  var WikiService = {};
  var baseUrl = "http://history.muffinlabs.com/date/";
  var jsonp = "?callback=JSON_CALLBACK";
  var searchMonth = '';
  var searchDay = '';

  WikiService.setSearchTerm = function(month, day) {
    searchMonth = encodeURIComponent(month);
    searchDay = encodeURIComponent(day);
  }

  WikiService.search = function(month, day) {
    if (month !== undefined) {
      WikiService.setSearchTerm(month);
    };
    if (day !== undefined) {
      WikiService.setSearchTerm(day);
    };

    var url = baseUrl + month + "/" + day + jsonp;

    return JSONPDataService.getData(url);
  }

  return WikiService;
}]);


app.factory('WaybackLAService', ["JSONPDataService", function(JSONPDataService) {
  var WaybackLAService = {};
  var baseUrl = "http://archive.org/wayback/available?callback=JSON_CALLBACK&url=latimes.com&timestamp=2005";
  var searchTerm = '';

  WaybackLAService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  WaybackLAService.search = function(term) {
    if (term !== undefined) {
      WaybackLAService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm;

    return JSONPDataService.getData(url);
  }

  return WaybackLAService;
}]);


app.factory('WaybackIMDbService', ["JSONPDataService", function(JSONPDataService) {
  var WaybackIMDbService = {};
  var baseUrl = "http://archive.org/wayback/available?callback=JSON_CALLBACK&url=imdb.com&timestamp=2005";
  var searchTerm = '';

  WaybackIMDbService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  WaybackIMDbService.search = function(term) {
    if (term !== undefined) {
      WaybackIMDbService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm;

    return JSONPDataService.getData(url);
  }

  return WaybackIMDbService;
}]);


app.factory('ImdbService', ["DataService", function(DataService) {
  var ImdbService = {};
  var baseUrl = "http://www.omdbapi.com/?s=";
  var searchTerm = '';

  ImdbService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  ImdbService.search = function(term) {
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

  MovieService.search = function(term) {
    if (term !== undefined) {
      MovieService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + tomatoes;

    return DataService.getData(url);
  }

  return MovieService;
}]);


app.factory('ITunesService', ["JSONPDataService", function(JSONPDataService) {
  var ITunesService = {};
  var baseUrl = "http://itunes.apple.com/search?callback=JSON_CALLBACK&term=";
  var searchTerm = '';
  var songSearch = "&entity=song&attribute=songTerm&explicit=no&limit=10";

  ITunesService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  ITunesService.search = function(term) {
    if (term !== undefined) {
      ITunesService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + songSearch;

    return JSONPDataService.getData(url);
  }

  return ITunesService;
}]);


app.factory('IBooksService', ["JSONPDataService", function(JSONPDataService) {
  var IBooksService = {};
  var baseUrl = "http://itunes.apple.com/search?callback=JSON_CALLBACK&term=";
  var searchTerm = '';
  var bookSearch = "&entity=ebook&attribute=allTrackTerm&explicit=no&limit=10";

  IBooksService.setSearchTerm = function(term) {
    searchTerm = encodeURIComponent(term);
  }

  IBooksService.search = function(term) {
    if (term !== undefined) {
      IBooksService.setSearchTerm(term);
    }

    var url = baseUrl + searchTerm + bookSearch;

    return JSONPDataService.getData(url);
  }

  return IBooksService;
}]);

// service used in all factories in this file that call $http.get
app.service('DataService', ["$http", "$q", function($http, $q) {
  var DataService = {};

  DataService.getData = function(url) {
    var deferred = $q.defer();
    $http.get(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Failed to fetch: " + url);
    });

    return deferred.promise;
  }

  return DataService;
}]);


// service used in all factories in this file that call $http.jsonp
app.service('JSONPDataService', ["$http", "$q", function($http, $q) {
  var JSONPDataService = {};

  JSONPDataService.getData = function(url) {
    var deferred = $q.defer();
    $http.jsonp(url).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject("Failed to fetch: " + url);
    });

    return deferred.promise;
  }

  return JSONPDataService;
}]);
