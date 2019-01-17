import {Redirect, Route} from "react-router-dom";
import React from "react";
import Auth from '../services/Auth';

const REDIRECT_PAGE = "/login"

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => Auth.isLogged() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: REDIRECT_PAGE,
            state: { from: props.location }
          }}
        />
      )
      }
    />
  );
}

export default AuthRoute
