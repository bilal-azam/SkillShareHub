import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
