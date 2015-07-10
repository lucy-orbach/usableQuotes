var Quote = React.createClass ({
  render: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="quote">
        <h2 className="quoteTxt">
          {this.props.txt}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var QuotesBox = React.createClass ({
  loadQuotesFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(){
        this.setState({data: data});
      }.bind(this),
      error: function(){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleQuoteSubmit: function(comment){
    var quotes = this.state.data;
    quotes.push(quote);
    this.setState( {data: quotes}, function(){
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: quote,
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
        <h1>Useful Quotes</h1>
        <QuoteList data={this.state.data} />
        <QuoteForm onQuoteSubmit={this.handleQuoteSubmit} />
      </div>
    );
  }
});//QuotesBox

var QuoteList = React.createClass ({
  render: function(){
    var quoteNodes = this.props.data.map( function(comment, index){
      return (
        <Quote txt={quote.txt} key={index}>
          {quote.text}
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
    if (!text || !author) {
      return;
    }
    this.props.onQuoteSubmit({txt: txt, character: character, movie: movie, img: img });
    React.findDOMNode(this.refs.txt).value = '';
    React.findDOMNode(this.refs.text).value = '';
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

React.render(
  <QuoteBox url="quotes.json" pollInterval={2000} />,
  document.getElementById('content')
);







































