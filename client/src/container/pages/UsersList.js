import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
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
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var ModuleName = 'DASHBOARD';
const UsersList = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const [Editform] = Form.useForm();
  const enc_user_detail = Cookies.get('UserDetail');
  var userDetail = decrypt(enc_user_detail);

  const [ShowUserGroup, setShowUserGroup] = useState(false);
  const [ShowAddNewUser, setShowAddNewUser] = useState(false);
  const [ShowEditUser, setShowEditUser] = useState(false);
  useEffect(async () => {
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

  const HandleAction = e => {
    console.log(e);
    if (e == 1) {
      setShowUserGroup(true);
    } else if (e == 2) {
      setShowEditUser(true);
    }
  };

  /*HANDLE VIEW=================================START */
  const handleView = id => {
    async function viewData(id) {
      const encryptedid = encrypttheid(id);
      const postID = encryptedid;
      history.push(`../users/view-user/${postID}`);
    }
    viewData(id);
  };
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
  /*HANDLING DELETE A USER========================================END */
  const columns = [
    {
      name: 'Name',
      selector: row => row.fullname,
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => (
        <>
          <span className={`status ${row.active === 1 ? 'Success' : 'error'}`}>
            {row.active === 1 ? 'Active' : 'Inactive'}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="datatable-actions">
          {/* <Button
            onClick={() => {
              handleView(row.id);
            }}
            className="btn-icon"
            type="primary"
            to="#"
            shape="circle"
          >
            <FeatherIcon icon="eye" size={16} />
          </Button>

          <Button
            onClick={() => {
              handleEdit(row.id);
            }}
            className="btn-icon"
            type="info"
            to="#"
            shape="circle"
          >
            <FeatherIcon icon="edit" size={16} />
          </Button>

          <Button
            className="btn-icon"
            type="danger"
            to="#"
            shape="circle"
            onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
          >
            <FeatherIcon icon="trash-2" size={16} marginRight={10} />
          </Button>
          <Button
            className="btn-icon"
            type="primary"
            to="#"
            shape="circle"
            onClick={() => setShowUserGroup(true)}
            title="Add User Group"
          >
            <FeatherIcon icon="plus" size={16} />
          </Button> */}
          <Select className="Quizz_actions" defaultValue="Actions" onSelect={HandleAction}>
            <Option value={1}>Add To Group</Option>
            <Option value={2}>Edit</Option>
            <Option
              value={3}
              //onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
            >
              Delete
            </Option>
          </Select>
        </div>
      ),
    },
  ];

  const tableData = {
    columns,
    data,
  };

  const addUserGroups = fieldsValue => {
    var Payload = {};
    Payload['first_Name'] = fieldsValue.first_Name;
    console.log(Payload);
    async function CreateUserGroup(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          console.log('This will run after 1 second!');
          history.push('../users/customer-list');
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateUserGroup(Payload);
  };

  const addNewUser = fieldsvalue => {
    var payload = {};
    payload['first_Name'] = fieldsvalue.first_Name;
    payload['last_Name'] = fieldsvalue.last_Name;
    payload['user_role'] = fieldsvalue.user_role;
    payload['email'] = fieldsvalue.email;
    payload['password'] = fieldsvalue.password;
    payload['user_name'] = fieldsvalue.user_name;
    payload['user_groups'] = fieldsvalue.user_groups;
    payload['status'] = fieldsvalue.status;
    console.log(payload);
    async function CreateUser(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          console.log('This will run after 1 second!');
          history.push('../users/customer-list');
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    CreateUser(payload);
  };
  const EditUser = fieldsvalue => {
    var payload = {};
    payload['first_Name'] = fieldsvalue.first_Name;
    payload['last_Name'] = fieldsvalue.last_Name;
    payload['user_role'] = fieldsvalue.user_role;
    payload['email'] = fieldsvalue.email;
    payload['password'] = fieldsvalue.password;
    payload['user_name'] = fieldsvalue.user_name;
    payload['user_groups'] = fieldsvalue.user_groups;
    payload['status'] = fieldsvalue.status;
    console.log(payload);
    async function editUser(data) {
      const url = api_url.create_user;
      const response = await post_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: response?.data?.responsedata,
        });
        setTimeout(() => {
          console.log('This will run after 1 second!');
          history.push('../users/customer-list');
        }, 1000);
        // history.push('../users/customer-list');
      } else
        notification.error({
          message: 'Server Error',
        });
    }
    editUser(payload);
  };
  return (
    <>
      <Main>
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Users</h1>
          <div className="importNewBTN">
            <Button onClick={() => history.push(`../users/add-user`)} size="small" key="4" type="dark">
              Import Users
            </Button>
            <Button onClick={() => setShowAddNewUser(true)} size="small" key="4" type="success">
              <FeatherIcon icon="plus" size={14} />
              New Users
            </Button>
          </div>
        </div>
        <DataTableExtensions {...tableData}>
          <DataTable
            className="tableHeading"
            columns={columns}
            data={data}
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </Main>
      {ShowUserGroup != false ? (
        <div className="Main-headerDiv">
          <div className="inner-headerDiv">
            <div className="headerDiv">
              <p>Add user to group</p>
              <div className="crossIcon">
                <a onClick={() => setShowUserGroup(false)}>X</a>
              </div>
            </div>
            <div className="joinedP">
              <p>Joined Groups:</p>
            </div>
            <div className="userGroupselect">
              <label>Users Groups</label>
              <div className="userGroupselect-inner">
                <Select>
                  <Option defaultValue="Select User Groups">Select User Groups</Option>
                  <Option value={1}>One</Option>
                  <Option value={2}>Two</Option>
                  <Option value={3}>Three</Option>
                </Select>
              </div>
            </div>
            <div className="Addgroupbtn">
              <button>Add</button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      {ShowAddNewUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={form}
            layout="vertical"
            onFinish={addNewUser}
          >
            <div className="headerDiv">
              <p>New User</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="first_Name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter First_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="last_Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Last_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
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
                  <Input placeholder="Email" name="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_name"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_role"
                  label="User Role"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Role !',
                    },
                  ]}
                >
                  <Select placeholder="User_Roles" name="">
                    <Option value={1}>admin</Option>
                    <Option value={2}>client</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_groups"
                  initialValue=""
                  label="User Groups"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Groups !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <Select placeholder="User_Groups" name="">
                    <Option value={1}>user1</Option>
                    <Option value={2}>user2</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter password !',
                    },
                  ]}
                >
                  <Input name="" placeholder="password" />
                </Form.Item>
              </Col>

              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="email_verfied"
                    initialValue=""
                    label="Email Verified - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Yes (Email is verified). No (Email not verified)</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
                </div>
              </div>
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="status"
                    initialValue=""
                    label="Status - Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit">Create</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ''
      )}
      {ShowEditUser != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={EditUser}
          >
            <div className="headerDiv">
              <p>Edit User</p>
              <div className="crossIcon">
                <a onClick={() => setShowEditUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="first_Name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter First_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="First_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="last_Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Last_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
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
                  <Input placeholder="Email" name="" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_name"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Name !',
                    },
                  ]}
                >
                  <Input name="" placeholder="User_Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_role"
                  label="User Role"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Role !',
                    },
                  ]}
                >
                  <Select placeholder="User_Roles" name="">
                    <Option value={1}>admin</Option>
                    <Option value={2}>client</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="user_groups"
                  initialValue=""
                  label="User Groups"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter User_Groups !',
                    },
                    {
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Please Enter Correct Email',
                    },
                  ]}
                >
                  <Select placeholder="User_Groups" name="">
                    <Option value={1}>user1</Option>
                    <Option value={2}>user2</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <Col md={24} xs={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter password !',
                    },
                  ]}
                >
                  <Input name="" placeholder="password" />
                </Form.Item>
              </Col>

              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="email_verfied"
                    initialValue=""
                    label="Email Verified - No"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Yes (Email is verified). No (Email not verified)</p>
                  </Form.Item>
                </Col>
                <div className="switchToggle">
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
                </div>
              </div>
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="status"
                    initialValue=""
                    label="Status - Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter User_Groups !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Allow Login). In-active (Disallow Login).</p>
                  </Form.Item>
                </Col>{' '}
                <div className="switchToggle">
                  <Switch
                  // onChange={() => setASwitch(!ASwitch)}
                  />
                </div>
              </div>
            </Row>
            <Row gutter={30} className="Addgroupbtn">
              <Col md={24} xs={24}>
                <Form.Item>
                  <Button htmlType="submit">Update</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UsersList;
