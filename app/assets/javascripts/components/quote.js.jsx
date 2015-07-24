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


