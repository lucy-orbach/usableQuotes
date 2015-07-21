'use strict'
var Quote = React.createClass ({
  render: function(){  
    return (
      <div className="quote" id={this.props.quoteId} >
        <h2 className="quoteTxt">{this.props.children}</h2>
        <h6 className="quoteDet">{this.props.character} | {this.props.movie}</h6>
      </div>
    );
  }
});

var QuoteBox = React.createClass ({
  getInitialState: function() {
    return {data: []};
  },
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
  componentDidMount: function(){
    this.loadQuotesFromServer();
    setInterval(this.loadQuotesFromServer, this.props.pollInterval);
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
  render: function(){
    return (
      <div className="quoteBox">
        <aside>
        <h1>{this.state.data.length} Useful Quotes</h1>
        <h5>A Space to Keep Record of my Favorite Movie Quotes</h5>
        <QuoteForm onQuoteSubmit={this.handleQuoteSubmit} />
        </aside>
        <main>
          <QuoteList data={this.state.data} />
        </main>
      </div>
    );
  }
});//QuotesBox

var QuoteList = React.createClass ({
  render: function(){
    var quoteNodes = this.props.data.map( function(quote, index){ 
      return (
        <Quote quoteId = {quote.id} character={quote.character} movie={quote.movie}  key={index} onDelete = {this.handleQuoteDelete}>
          {quote.txt}
        </Quote>
      );
    }.bind(this));
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
    React.findDOMNode(this.refs.movie).value = '';
    React.findDOMNode(this.refs.img).value = '';
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

