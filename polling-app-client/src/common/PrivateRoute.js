import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  
  
const PrivateRoute = ({ component: Component, authenticated, render, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated
        ? render
          ? render(props)
          : <Component {...props} />
        : <Redirect to="/login" />
    }
  />
); 

export default PrivateRoute