import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { anAction } from '../actions/index';

class Template extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    // In case we do not use arrow function for <input onChange=...>
    // as below, we need to bind it to the "this".
    // E.g. onChange={event => this.onInputChage(event.target.value)}
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();

    this.props.anAction(this.state.term);
    this.setState({ term: '' }); // Clear the inputed data.
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Get a five-day forecast"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}

function mapStateToProps(state) {
  // Whatever returned from here will be showed up as props
  // inside the Template
  return {
    // The state.books points to a function defined in the
    // reducers/index.js
    books: state.books,
  };
}

// Anything returned from this function will end up as props
// inside the Template.
function mapDispatchToProps(dispatch) {
  // Whenever anAction is called, the result will be passed
  // to all reducers.
  return bindActionCreators({ anAction }, dispatch);
}

// Promote Template from a component to a container - it needs to know
// about this new dispatch method, "anAction". Make it available
// as a prop inside the Template.
export default connect(mapStateToProps, mapDispatchToProps)(Template);
