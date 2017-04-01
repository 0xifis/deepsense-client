$(function() {
  $.ajax({
  url: "http://deepsense.herokuapp.com/realtime",
  cache: false
})
  .done(function( html ) {
    $( "body" ).append( JSON.stringify(html) );
  });
})