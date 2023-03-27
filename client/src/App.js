import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Axios from 'axios';

import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Admin from './routes/admin'; //calling admin


import Auth from './routes/auth'; //calling auth
import './static/css/style.css';
import config from './config/config'; //config-------------------------------1
import store from './redux/store'; //calling store---------------------------2
import ProtectedRoute from './components/utilities/protectedRoute';
// //Additions by khush================================================================================================
// import Axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { alreadyloggedin } from './redux/authentication/actionCreator';
// import { useHistory } from 'react-router-dom';
Axios.defaults.withCredentials = true;
// //==================================================================================================================

const { theme } = config;

const ProviderConfig = () => {
  // console.log('1-1 React- i am in App.js ProviderConfig()');
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });
  // console.log(isLoggedIn);

  const [path, setPath] = useState(window.location.pathname);
  // console.log(path);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      //if unmounted true
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}

          {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
            <Redirect to="/admin" />
          )}
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
