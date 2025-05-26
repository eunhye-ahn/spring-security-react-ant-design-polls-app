import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, render, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        render ? render(props) : <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
