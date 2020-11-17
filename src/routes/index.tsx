import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import RequestRefund from '../pages/RequestRefund';
import TrackRefund from '../pages/TrackRefund';
import ApproveRefund from '../pages/ApproveRefund';
import FinishRefund from '../pages/FinishRefund';
import RegisterUser from '../pages/RegisterUser';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/requestrefund" component={RequestRefund} isPrivate />
    <Route path="/trackrefund" component={TrackRefund} isPrivate />
    <Route path="/approverefund" component={ApproveRefund} isPrivate />
    <Route path="/finishrefund" component={FinishRefund} isPrivate />
    <Route path="/registeruser" component={RegisterUser} isPrivate />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
