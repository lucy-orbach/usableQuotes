// @Quotes = React.createClass
//     getInitialState: ->
//       quotes: @props.data
//     getDefaultProps: ->
//       quotes: []
//     render: ->
//        `<div className="quotes">
//           <h2 className="title">Useful Quotes</h2>
//         </div>

//         `


 
var Quotes = React.createClass({displayName: 'Quotes',
  render: function() {
    return (
      React.createElement('div', {className: "quotes"},
        <h1 className="title">Useful Quotes</h1>
      )
    );
  }
});
React.render(
  React.createElement(Quotes, null),
  document.getElementById('content')
);

var QuotesList = React.createClass({
  render: function() {
    return (
      <li className="quoteList">
         <span><img src={this.props.img}/></span>
         <h3>{this.props.txt}</h3>
         <p>{this.props.character} - {this.props.movie}</p>
       </li>
    );
  }
});

var QuotesForm = React.createClass({
  render: function() {
    return (
      <div className="quotesForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});