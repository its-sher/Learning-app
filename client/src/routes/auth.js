import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const OneTimePass = lazy(() => import('../container/profile/authentication/overview/OneTimePassword'));
const ResetPass = lazy(() => import('../container/profile/authentication/overview/ResetPassword'));
console.log('AUTH');
const NotFound = () => {
  console.log('not found');
  return <Redirect to="/" />;
};

const FrontendRoutes = () => {
  console.log('frontend route');
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/forgotPassword" component={ForgotPass} />
        <Route exact path="/oneTimePassword" component={OneTimePass} />
        <Route exact path="/resetPassword/:id" component={ResetPass} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/" component={Login} />
        <Route exact path="*" component={NotFound} />
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
