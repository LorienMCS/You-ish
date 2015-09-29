app.filter('reverse', function() {
  return function(input) {
    var reversed = "";
    var output = "";
    if(input !== undefined && input.length > 0) {
      for(var i = 0; i < input.length; i++) {
        reversed = input[i] + reversed;
      };
    };
    output = reversed.replace(/\w\S*/g, function(text) {
      return text[0].toUpperCase() + text.substring(1).toLowerCase();
    });
    return output;
  };
});
