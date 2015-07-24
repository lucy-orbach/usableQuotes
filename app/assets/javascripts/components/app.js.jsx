$(function (){
  var $content = $("#content");
  if ($content.length > 0) {
    React.render(
      <QuoteBox url="quotes.json" pollInterval={2000} />,
      document.getElementById('content')
    ); 
  }
});

