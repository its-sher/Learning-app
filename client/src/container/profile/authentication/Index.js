import React from 'react';
import { Row, Col } from 'antd';
import { Aside, Content } from './overview/style';
import Heading from '../../../components/heading/heading';

const AuthLayout = WraperContent => {
  return () => {
    return (
      <Row
        className="login_bg"
        style={{
          backgroundImage: 'url(/pinBanner.1e56b9e5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
          <Aside>
            <div className="auth-side-content">
              {/* <img src={require('../../../static/img/auth/sociallogo1.png')} alt="" className="topShape" />
              <img src={require('../../../static/img/auth/sociallogo1.png')} alt="" className="bottomShape" /> */}
              <Content></Content>
            </div>
          </Aside>
        </Col>

        <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
          <WraperContent />
        </Col>
      </Row>
    );
  };
};

export default AuthLayout;
