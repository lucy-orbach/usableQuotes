var Quote = React.createClass ({
  render: function(){
     var converter = new Showdown.converter();
     var rawMarkup = converter.makeHtml(this.props.children.toString(), {sanitize: true});
     
    return (

      <div className="quote">
        <h2 className="quoteTxt">
          {this.props.txt}
          {this.props.character} | {this.props.movie}
        </h2>
        
        
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var QuoteBox = React.createClass ({

  loadQuotesFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleQuoteSubmit: function(quote){
    var quotes = this.state.data;
    quotes.push(quote);
    this.setState( {data: quotes}, function(){
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: {quote: quote},
        success: function(data){
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function(){
    this.loadQuotesFromServer();
    setInterval(this.loadQuotesFromServer, this.props.pollInterval);
  },
  render: function(){
    return (

      <div className="quoteBox">
        <aside>
        <h1>{this.state.data.length} Useful Quotes</h1>
        <h5 class="slogan">A Place to Keep Record of your Favorite Movie Quotes</h5>
        <QuoteForm onQuoteSubmit={this.handleQuoteSubmit} />
        </aside>
        <QuoteList data={this.state.data} />
        
      </div>
    );
  }
});//QuotesBox

var QuoteList = React.createClass ({
  render: function(){

    var quoteNodes = this.props.data.map( function(quote, index){
      
      return (
        <Quote character={quote.character} movie={quote.movie}  key={index}>
          {quote.txt}
        </Quote>
      );
    });
    return (
      <div className="quoteList">
        {quoteNodes}
      </div> 
      
    );
  }
});//QuotesLists

var QuoteForm = React.createClass ({
  handleSubmit: function(e){
    e.preventDefault();
    var txt = React.findDOMNode(this.refs.txt).value.trim();
    var character = React.findDOMNode(this.refs.character).value.trim();
    var movie = React.findDOMNode(this.refs.movie).value.trim();
    var img = React.findDOMNode(this.refs.img).value.trim();
    if (!txt || !character || !movie) {
      return;
    }
    this.props.onQuoteSubmit({txt: txt, character: character, movie: movie, img: img });
    React.findDOMNode(this.refs.txt).value = '';
    React.findDOMNode(this.refs.character).value = '';
  },
  render: function(){
    return (

      <form className="quoteForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Enter Quote" ref="txt" />
        <input type="text" placeholder="Enter Character" ref="character" />
        <input type="text" placeholder="Enter Movie" ref="movie" />
        <input type="text" placeholder="Enter Picture URL" ref="img" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

$(function (){
  var $content = $("#content");
  if ($content.length > 0) {
    React.render(
      <QuoteBox url="quotes.json" pollInterval={2000} />,
      document.getElementById('content')
    ); 
  }
});








































