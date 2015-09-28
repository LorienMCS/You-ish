app.filter('reverse', function() {
  return function(input) {
    var reversed = "";
    var output = "";
    for(var i = input.length-1; i >= 0; i--) {
        reversed += input.charAt(i);
    }
    output = reversed.charAt(0).toUpperCase() + reversed.substring(1).toLowerCase();
    return output;
  };
});