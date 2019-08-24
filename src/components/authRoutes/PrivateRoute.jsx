import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ user, component: Comp, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        user ? (
          // if i have a user render a component(the component we are recieving 4rm d props in d route.jsx)
          // with d user information
          <Comp {...props} user={user} />
        ) : (
          // else redirect to signin page
          <Redirect to="/sign_in" />
        )
      }
    />
  );
};

export default PrivateRoute;
