import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import 'antd/dist/antd.css';

export default function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <RouteWithSubRoutes key={index}  {...route} />
        ))}
      </Switch>
    </Router>
  );
}

function RouteWithSubRoutes(route) {
  // console.log(route);
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={
        props => <route.component routes={route.routes} {...props} />}
    />
  )
}
