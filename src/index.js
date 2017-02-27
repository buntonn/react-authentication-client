import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import RequireAuth from './components/auth/require_auth';
import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//If we have a token, consider the user to be signed in
if (token) {
  // Update app state
  store.dispatch({ type: AUTH_USER });
}

// NOTE - we could do more here to check if the token has expired etc
/*

const token = localStorage.getItem('token');
if (token) {  
  const decoded = jwtDecode(token);  
  const exp = decoded.exp;
  // check to see if expired and dispatch accordingly
  
  const role = decoded.role;
  // store the role in the state maybe or check it where necessary
  store.dispatch({ type: AUTH_USER });

}

*/

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="/feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
