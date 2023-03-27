import React, { useState, useCallback } from 'react';
import Axios from 'axios';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
//import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
// import { Auth0Lock } from 'auth0-lock';
import { AuthWrapper } from './style';
import { login, alreadyloggedin } from '../../../../redux/authentication/actionCreator';
//import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
//import { auth0options } from "../../../../config/auth0";

//Axios.defaults.withCredentials = true;
// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const SignIn = () => {
  //  console.log('React-I am in Sign in overview/');
  const history = useHistory(); //for redirects in page
  const dispatch = useDispatch();
  const { isLoading, isLogin, isMessage } = useSelector(state => {
    return {
      isLoading: state.auth.loading,
      isLogin: state.auth.login,
      isMessage: state.auth.message,
      isError: state.auth.error,
    };
  });
  // const isLoading = useSelector(state => state.auth.loading); //interacting with rootreducer for auth reducer
  // const isLogin = useSelector(state => state.auth.login); //interacting with rootreducer for auth reducer
  // const isMessage = useHistory(state => state.auth.message);
  const [form] = Form.useForm(); //form

  const [state, setState] = useState({
    checked: null,
  });

  // const lock = new Auth0Lock(clientId, domain, auth0options);//11111111111111111111111

  // //CHECKING for user already logged in or not---------------------------
  // useEffect(() => {
  //   //console.log(isLogin);
  //   console.log('1---UseEffect--React-checking for user already logged in or not');

  //   const aFunction = () => {
  //     console.log('2-inside async func');
  //     return Promise.resolve(dispatch(alreadyloggedin()));
  //   };
  //   aFunction()
  //     .then(() => {
  //       console.log('3--back to react ----inside .then');
  //       // console.log(isLogin);
  //       // {
  //       //   isLogin ? history.push('/admin') : history.push('/');
  //       // }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);
  // //checking for user already logged in or not ENDS---------------------------

  const [value, setValue] = useState(null);

  const handleLoginChange = e => {
    // console.log('radio checked', e.target.checked);
    setValue(e.target.checked);
    // console.log(value);
  };

  const handleSubmit = useCallback(
    values => {
      //  console.log('Received values of form: ', values);
      var postData = {
        phoneoremailvalue: values.phoneoremail,
        password: values.password,
      };
      //console.log(postData);
      // let entity = value;
      // if (entity != null) {
      //   console.log(entity);
      // }
      dispatch(login(postData));
      //dispatch(login(postData,entity));
      // isLogin ? history.push('/admin') : history.push('/'); //NOT REQ
    },
    [history, dispatch],
  );

  const onChange = checked => {
    setState({ ...state, checked });
  };

  // lock.on('authenticated', authResult => {
  //   lock.getUserInfo(authResult.accessToken, (error, profileResult) => {
  //     if (error) {
  //       return;
  //     }

  //     handleSubmit();
  //     lock.hide();
  //   });
  // });

  return (
    <AuthWrapper>
      {/* just spaces */}
      <br />
      <br />
      <br />
      <br />
      {/* <p className="auth-notice">
        Don&rsquo;t have an account?
        <NavLink to="/register">Sign up now</NavLink>
      </p> */}
      <div className="auth-contents">
        <Form
          name="login"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{ background: 'white', padding: '30px' }}
        >
          <Heading as="h3" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '45px' }}>
            Sign in
          </Heading>
          {/* <Form.Item name="radio"
            label="Entity"
            rules={[
              {
                required: true,
                message: 'Please select your entity !',
              },
            ]}
          >
            <Radio.Group onChange={handleLoginChange} value={value}>
              <Radio value={'admin'}>Admin</Radio>
              <Radio value={'storeuser'}>Store User</Radio>
              <Radio value={'deliverypartner'}>Delivery Partner</Radio>
            </Radio.Group>
          </Form.Item> */}
          <Form.Item
            name="phoneoremail"
            rules={[
              {
                message: 'Please input your Phone or Email!',
                required: true,
              },
              { min: 10, message: 'Phone/Email must be minimum 10 characters.' },
            ]}
            //  initialValue="2222222222"
            //  initialValue="client1@gmail.com"
            //label="Email Address"
          >
            <Input
              style={{
                border: 'none',
                borderBottom: '2px solid transparent',
                borderImage: 'linear-gradient(0.25turn, rgba(255,249,34), rgba(255,0,128), rgba(56,2,155,0))',
                borderImageSlice: '1',
                width: '100%',
                background: '#fff !important',
                backgroundImage: 'unset!important',
              }}
              placeholder="Email Address"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                message: 'Please input password',
                required: true,
              },
              { min: 8, message: 'minimum 8 characters.' },
            ]}
            //initialValue="password1@"
            //label="Password"
          >
            <Input.Password
              //    placeholder="Password"
              style={{
                border: 'none',
                borderBottom: '2px solid transparent',
                borderImage: 'linear-gradient(0.25turn, rgba(255,249,34), rgba(255,0,128), rgba(56,2,155,0))',
                borderImageSlice: '1',
                width: '100%',
                background: '#fff !important',
                backgroundImage: 'unset!important',
              }}
              placeholder="Password"
            />
          </Form.Item>

          <div className="auth-form-action">
            <Form.Item name="checkbox">
              <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            </Form.Item>

            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          {/* <div>{isMessage != 'null' ? isMessage : ''}</div> */}

          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button className="btn-loginmessage" type="text" danger>
              {isMessage != 'null' ? isMessage : ''}
            </Button>
          </Form.Item>
          {/* removing social section */}
          {/* <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
          {/* <div className="auth0-login">
            <Link to="#" onClick={() => lock.show()}>
              Sign In with Auth0
            </Link>
          </div> */}
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
