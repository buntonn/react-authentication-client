import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions';

const form = reduxForm({
  form: 'Signin'
});

class Signin extends Component {

  handleFormSubmit({email, password }) {
    // Need to do something to log in the user
    this.props.signinUser({ email, password });

  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label htmlFor="email">Email</label>
          <Field className="form-control" name="email" component="input" type="email"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password</label>
          <Field className="form-control" name="password" component="input" type="password"/>
        </fieldset>
        {this.renderAlert()}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(form(Signin));