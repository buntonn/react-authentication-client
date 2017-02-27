import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const signupForm = reduxForm({
  form: 'Signup',
  validate
});

const renderField = field => (
  <div>
    <input {...field.input} className="form-control" type={field.type}/>
    { field.meta.touched && 
      field.meta.error && 
      <span className="error">{field.meta.error}</span>}
  </div>
);

class Signup extends Component{

  handleFormSubmit(formProps) {
    // Call action creator to signup the user.
    this.props.signupUser(formProps);

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
          <Field className="form-control" name="email" type="email" component={renderField} />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="password">Password</label>
          <Field className="form-control" name="password" type="password" component={renderField} />
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <Field className="form-control" name="passwordConfirm" type="password" component={renderField} />
        </fieldset>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>
		)
	}
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Required email address'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = 'Invalid email address'
  }

  if (!formProps.password) {
    errors.password = 'Required password'
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Required password to confirm'
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Entered passwords do not match!'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(signupForm(Signup));