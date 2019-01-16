import {Redirect, Route} from "react-router-dom";
import React from "react";

const isAuth = false
const REDIRECT_HOME = "/"

function NotAuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => !isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: REDIRECT_HOME,
            state: { from: props.location }
          }}
        />
      )
      }
    />
  );
}

export default NotAuthRoute
