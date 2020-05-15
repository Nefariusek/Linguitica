import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Store from '../../Store';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useContext(Store);
  return <Route {...rest} render={(props) => (isLogged ? <Redirect to="/home" /> : <Component {...props} />)} />;
};

export default PublicRoute;
