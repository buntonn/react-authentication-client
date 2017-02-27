import axios from 'axios';
import { auth_server_url } from '../config';
import { browserHistory } from 'react-router';
import { 
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

// URL to your Authentication server
const ROOT_URL = auth_server_url; //'http://localhost:3090';

export function signinUser({ email, password}) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER }); //Redux Thunk, direct access to the dispatcher

        // Save the JWT token to local storage
        localStorage.setItem('token', response.data.token);

        // Redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // Show an error to the user
        dispatch(authError('Bad login info'));
      });

  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token');
        browserHistory.push('/feature');
      })
      .catch(({response}) => 
        dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}