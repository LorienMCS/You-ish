app.filter('reverse', function() {
  return function(input) {
    var reversed = "";
    var output = "";
    if(input !== undefined && input.length > 0) {
      for(var i = input.length-1; i >= 0; i--) {
        reversed += input.charAt(i);
      };
    };
    output = reversed.replace(/\w\S*/g, function(text) {
      return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
    });
    return output;
  };
});