import React from "react";
import { Route } from "react-router-dom";

//Used to pass property value from router to the routes
export default ({ component: C, props: cProps, ...rest }) =>
  <Route {...rest} render={props => <C {...props} {...cProps} />} />;