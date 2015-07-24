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
  handleQuoteDelete: function(){
    console.log('in box');
  },
  render: function(){
    return (
      <div className="quoteBox">
        <aside>
        <h1>{this.state.data.length} Useful Quotes</h1>
        <h5>An App to Keep Record of my Favorite Movie Quotes</h5>
        <QuoteForm onQuoteSubmit={this.handleQuoteSubmit} />
        </aside>
        <main>
          <QuoteList data={this.state.data} />
        </main>
      </div>
    );
  }
});//QuotesBox


