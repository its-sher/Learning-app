import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Tabs, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import authorizes from '../../../src/static/img/authorized.png';
import Cookies from 'js-cookie';
import {
  get_api_request,
  post_api_request,
  put_api_request,
  delete_api_request,
  api_url,
} from '../../helpers/Common.js';
import { Cards } from '../../components/cards/frame/cards-frame';
import AddDetails from './AddQuizTabs/DetailsTab';
import AddSettings from './AddQuizTabs/SettingsTab';
import AddQuestions from './AddQuizTabs/QuestionsTab';
import AddSchedules from './AddQuizTabs/schedulesTab';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const CreateNewQuiz = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  const { TabPane } = Tabs;
  useEffect(async () => {
    console.log('createnewwwwwwwwwwwwwwwww');
    async function GetAllUsers() {
      const url = api_url.get_all_users;
      const response = await get_api_request(url, headers);
      if (response.status == 200) {
        const usersdata = response?.data?.responsedata?.users;
        setData(usersdata);
      } else {
        console.log('error');
      }
    }
    GetAllUsers();
  }, []);
  /*==========================================END */
  /*HANDLING EDIT=============================START */
  const handleEdit = id => {
    async function editData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/edit-user/${postID}`);
    }
    editData(id);
  };
  /*=========================================ENDS */
  /*HANDLING DELETE A USER===================START */
  const handleDelete = id => {
    var deletedrowid = id;
    var column = 'id';
    async function deleteData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;

      const url = api_url.delete_user + postID;
      const response = await delete_api_request(url, headers);

      if (response.status === 200) {
        notification.success({
          message: 'User Deleted Successfully',
        });
        const afterdeletedata = data.filter(item => {
          if (column !== '') {
            return item[column] !== deletedrowid;
          }
          return item;
        });
        setData(afterdeletedata);
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert('Error');
      }
      // });
    }
    deleteData(id);
  };

  return (
    <>
      <Main>
        <Tabs tabPosition="left">
          <TabPane tab="Detail" key="1"></TabPane>
        </Tabs>
        <Tabs tabPosition="left">
          <TabPane tab="Settings" key="2"></TabPane>
        </Tabs>
        <Tabs tabPosition="left">
          <TabPane tab="Questions" key="3"></TabPane>
        </Tabs>
        <Tabs tabPosition="left">
          <TabPane tab="Schedules" key="4"></TabPane>
        </Tabs>
        <AddDetails />
        <AddSettings />
        <AddQuestions />
        <AddSchedules />
      </Main>
    </>
  );
};

export default CreateNewQuiz;
