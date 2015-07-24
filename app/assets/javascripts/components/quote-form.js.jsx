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
        <h4>Feel free to submit your favorite quote,<br />I might keep it...</h4>
        <input type="text" placeholder="Enter Quote" ref="txt" />
        <input type="text" placeholder="Enter Character" ref="character" />
        <input type="text" placeholder="Enter Movie" ref="movie" />
        <input type="text" placeholder="Enter Picture URL" ref="img" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

