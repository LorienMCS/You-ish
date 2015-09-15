app.filter('reverse', function() {
  return function(input) {
    input = input || '';
    var reversed = "";
    var output = "";
    var wordArray = input.split("");
    wordArray.reverse();
    reversed = wordArray.join("");
    output = reversed.charAt(0).toUpperCase() + reversed.substring(1).toLowerCase();
    return output;
  };
});