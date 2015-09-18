app.factory('GiphyService', ["$http", "$q", function($http, $q) {
  var GiphyService = {};
  var baseUrl = "http://api.giphy.com/v1/gifs/search?q=";
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

    var url = baseUrl + searchTerm + publicKey;

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
