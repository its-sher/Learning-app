import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, notification } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Tag } from '../../../../components/tags/tags';
// import { decrypt } from '../../../../helpers/encryption-decryption';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
//import { headers } from '../../../../helpers/variables';
import { get_api_request, api_url, put_api_request } from '../../../../helpers/Api.js';
import axios from 'axios';
import { encrypttheid, decodetheid } from '../../../../helpers/encode-decode';
const { decrypt } = require('../../../../helpers/encryption-decryption');
// var ModuleName = 'DASHBOARD';
const { Option } = Select;
const Profile = () => {
  const [form] = Form.useForm();
  const params = useParams();
  const [permission, setPermission] = useState(false);
  const [data, setData] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
  });
  const [UserID, setUserID] = useState();
  const access_token = Cookies.get('access_token');
  const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    token: 'Bearer ' + access_token,
    device_id: '',
    api_version: '',
    browser: '',
    device_type: '',
  };
  useEffect(() => {
    const usersss = Cookies.get('UserDetail');
    const response = decrypt(usersss);

    const UserInfo = response?.sessdata?.user?.[0];

    const userId = UserInfo?.user_role_id;
    setUserID(userId);
    const GetRole = UserInfo?.user_role?.toUpperCase();
    const modules = UserInfo?.permissions?.[GetRole].MODULES;

    // if (modules[ModuleName]) {
    //   setPermission(true);
    //   const value = modules[ModuleName]; //get module values
    //   const getvalue = value.split(',');
    // } else {
    //   notification.error({
    //     message: 'Permissions Not Valid',
    //   });
    // }

    // const paramsID = params.id;
    // console.log(paramsID);
    // if (paramsID) {
    //   const PostID = decodetheid(paramsID);
    async function GetUserByID(id) {
      const url = api_url.get_all_users + id;

      const response = await get_api_request(url, headers);
      const user_data = response?.data?.responsedata?.users?.[0];
      if (response.status == 200) {
        form.setFieldsValue({
          first_Name: user_data.first_Name,
          last_Name: user_data.last_Name,
          phone: user_data.phone,
          email: user_data.email,
        });
        setData({
          first_Name: user_data.first_Name,
          last_Name: user_data.last_Name,
          phone: user_data.phone,
          email: user_data.email,
        });
      }
    }
    GetUserByID(userId);
  }, []);

  const handleSubmit = fieldsValue => {
    async function UpdatePostById(userId) {
      const id = encrypttheid(userId);
      const url = api_url.update_user + id;

      const response = await put_api_request(url, fieldsValue, { headers });

      if (response.status == 200) {
        notification.success({
          message: 'Data Updated successfully',
        });
      } else {
        notification.error({
          message: 'Nothing Updated',
        });
      }
    }
    UpdatePostById(UserID);
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  return (
    <Cards>
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <BasicFormWrapper>
            <Form name="editProfile" form={form} onFinish={handleSubmit}>
              <Form.Item
                name="first_Name"
                initialValue=""
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter first name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last_Name"
                initialValue=""
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter last name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                initialValue=""
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Phone Number !',
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="email"
                initialValue=""
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Email !',
                  },
                  {
                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please Enter Correct Email',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <div className="setting-form-actions">
                <Button size="default" htmlType="submit" type="primary">
                  Update Profile
                </Button>
                &nbsp; &nbsp;
                <Button size="default" onClick={handleCancel} type="light">
                  Cancel
                </Button>
              </div>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default Profile;
