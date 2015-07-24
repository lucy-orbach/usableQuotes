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
});

