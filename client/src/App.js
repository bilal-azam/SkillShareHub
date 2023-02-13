import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundry from './helpers/ErrorBoundary';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import Search from './components/Search';
import SkillExchange from './components/SkillExchange';
import Notifications from './components/Notifications';

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/skill-exchange" component={SkillExchange} />
          <PrivateRoute path="/notifications" component={Notifications} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
