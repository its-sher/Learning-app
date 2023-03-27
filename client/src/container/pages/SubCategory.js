import React, { useState, useEffect } from 'react';
import { Form, notification, Select, Col, Row, Input, Switch } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from 'react-router-dom';
import { headers } from '../../helpers/variables';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import DataTable from 'react-data-table-component';
import { Editor, EditorTools } from '@progress/kendo-react-editor';
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
import { TextArea } from '@progress/kendo-react-inputs';
const { decrypt } = require('../../helpers/encryption-decryption');
const { encrypttheid, decodetheid } = require('../../helpers/encode-decode');
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FontName,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;
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
  const [ShoweditSection, setShoweditSection] = useState(false);
  const [ShowMapSection, setShowMapSection] = useState(false);
  const [checked, setChecked] = useState([]);
  const [ReRender, setReRender] = useState(0);
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
  }, [ReRender]);
  const handleCheck = event => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
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
  const HandleAction = e => {
    console.log(e);
    if (e == 0) {
      setShowMapSection(true);
    }
    if (e == 1) {
      setShoweditSection(true);
    } else if (e == 2) {
      console.log('Delete');
    }
  };

  const columns = [
    {
      name: 'CODE',
      selector: row => row.fullname,
      sortable: true,
    },
    {
      name: 'NAME',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'CATEGORY',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'TYPE',
      selector: row => row.role,
      sortable: true,
    },
    {
      name: 'STATUS',
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
      name: 'Actions',
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
          </Button> */}

          {/* <Button
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
          </Button> */}
          {/* <Button
            className="btn-icon"
            type="primary"
            to="#"
            shape="circle"
            onClick={() => setShowUserGroup(true)}
            title="Add User Group"
          >
            <FeatherIcon icon="plus" size={16} />
          </Button> */}
          <Select
            className="Quizz_actions"
            defaultValue="Actions"
            onSelect={HandleAction}
            // onClick={e => {
            //   HandleAction(e.target.value);
            // }}
          >
            <Option value={0}>Map Section</Option>
            <Option value={1}>Edit</Option>
            <Option
              value={2}
              // onClick={() => (window.confirm('Are you sure you wish to delete this item?') ? handleDelete(row.id) : '')}
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

  const Editsection = Fieldsvalue => {
    var Payload = {};

    Payload['sub_category_name'] = Fieldsvalue.sub_category_name;
    Payload['category_name'] = Fieldsvalue.category_name;
    Payload['short_description'] = Fieldsvalue.short_description;
    Payload['description'] = Fieldsvalue.description;
    Payload['type'] = Fieldsvalue.type;
    Payload['active'] = Fieldsvalue.active;
    console.log(Payload);
    async function editSection(data) {
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
    editSection(Payload);
  };

  const addNewsection = fieldsvalue => {
    var payload = {};
    payload['sub_category_name'] = fieldsvalue.sub_category_name;
    payload['short_description'] = fieldsvalue.short_description;
    payload['category_name'] = fieldsvalue.category_name;
    payload['description'] = fieldsvalue.description;
    payload['active'] = fieldsvalue.active;
    payload['type'] = fieldsvalue.type;

    console.log(payload);
    async function CreateSection(data) {
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
    CreateSection(payload);
  };
  const CloseEditSection = () => {
    console.log('555555555555');
    setShoweditSection(false);
    //setReRender(ReRender + 1);
  };
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ', ' + item;
      })
    : '';

  // Return classes based on whether item is checked
  var isChecked = item => (checked.includes(item) ? 'checked-item' : 'not-checked-item');
  const checkList = [
    'Reading Comprehension',
    'Verbal Reasoning',
    'Mathematics Achievement',
    'Practice',
    'Quantitative Reasoning',
    'Break',
  ];
  return (
    <>
      <Main>
        <div key="1" className="page-header-actions" style={{ marginTop: '16px', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: '25px', color: 'rgb(20 19 19)' }}>Sub Categories</h1>
          <div className="importNewBTN">
            {/* <Button onClick={() => history.push(`../users/add-user`)} size="small" key="4" type="dark">
              Import Users
            </Button> */}
            <Button onClick={() => setShowAddNewUser(true)} size="small" key="4" type="success">
              <FeatherIcon icon="plus" size={14} />
              New Sub Category
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
      {ShowMapSection != false ? (
        <div className="Main-headerDiv">
          <div className="inner-headerDiv">
            <div className="headerDiv">
              <p>Map Sections</p>
              <div className="crossIcon">
                <a onClick={() => setShowMapSection(false)}>X</a>
              </div>
            </div>
            <div className="userGroupselect">
              <label>Select Sections</label>
              <div className="userGroupselect-inner">
                {checkList.map((item, index) => (
                  <div className="checkbox-Map" key={index}>
                    <label>
                      <input value={item} type="checkbox" onChange={handleCheck} />
                      <span className={isChecked(item)}>{item}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="Addgroupbtn">
              <button>Update</button>
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
            onFinish={addNewsection}
          >
            <div className="headerDiv">
              <p> New Sub Category</p>
              <div className="crossIcon">
                <a onClick={() => setShowAddNewUser(false)}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="sub_category_name"
                  label="Sub Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Status !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Category Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="category_name"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Category Name !',
                    },
                  ]}
                >
                  <Select>
                    <Option value={1}>category1</Option>
                    <Option value={2}>category2</Option>
                    <Option value={3}>category3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Type !',
                    },
                  ]}
                >
                  <Select>
                    <Option value={1}>type1</Option>
                    <Option value={2}>type2</Option>
                    <Option value={3}>type3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="description" label="Description">
                  <Editor
                    // onChange={e => setformData({ ...formData, description: e })}
                    tools={[
                      [Bold, Italic, Underline, Strikethrough],
                      [Subscript, Superscript],
                      [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                      [Indent, Outdent],
                      [OrderedList, UnorderedList],
                      FontSize,
                      FontName,
                      FormatBlock,
                      [Undo, Redo],
                      [Link, Unlink, InsertImage, ViewHtml],
                      [InsertTable],
                      [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                      [DeleteRow, DeleteColumn, DeleteTable],
                      [MergeCells, SplitCell],
                    ]}
                    contentStyle={{
                      height: 150,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Status !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                  </Form.Item>
                </Col>
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
      {ShoweditSection != false ? (
        <div className="AddnewUser contactCard customCard">
          <Form
            name="sDash_validation-form"
            className="AddForm contactForm"
            form={Editform}
            layout="vertical"
            onFinish={Editsection}
          >
            <div className="headerDiv">
              <p>Edit Sub Category</p>
              <div className="crossIcon">
                <a onClick={() => CloseEditSection()}>X</a>
              </div>
            </div>
            <Row gutter={30} className="mainRow" style={{ marginTop: ' 10px' }}>
              <Col md={24} xs={24}>
                <Form.Item
                  name="sub_category_name"
                  label="Sub Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Status !',
                    },
                  ]}
                >
                  <Input name="" placeholder="Category Name" />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="category_name"
                  label="Category Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Category Name !',
                    },
                  ]}
                >
                  <Select>
                    <Option value={1}>category1</Option>
                    <Option value={2}>category2</Option>
                    <Option value={3}>category3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Type !',
                    },
                  ]}
                >
                  <Select>
                    <Option value={1}>type1</Option>
                    <Option value={2}>type2</Option>
                    <Option value={3}>type3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="short_description" label="Short Description">
                  <TextArea rows={3} showCount maxLength={100} />
                </Form.Item>
              </Col>
              <Col md={24} xs={24}>
                <Form.Item className="txtareaSpace fullsizefield" name="description" label="Description">
                  <Editor
                    // onChange={e => setformData({ ...formData, description: e })}
                    tools={[
                      [Bold, Italic, Underline, Strikethrough],
                      [Subscript, Superscript],
                      [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                      [Indent, Outdent],
                      [OrderedList, UnorderedList],
                      FontSize,
                      FontName,
                      FormatBlock,
                      [Undo, Redo],
                      [Link, Unlink, InsertImage, ViewHtml],
                      [InsertTable],
                      [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                      [DeleteRow, DeleteColumn, DeleteTable],
                      [MergeCells, SplitCell],
                    ]}
                    contentStyle={{
                      height: 150,
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={30} className="mainRow">
              <div className="togglefield">
                <Col md={24} xs={24}>
                  <Form.Item
                    name="active"
                    initialValue=""
                    label="Active"
                    rules={[
                      {
                        required: false,
                        message: 'Please Enter Status !',
                      },
                      {
                        pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please Enter Correct Email',
                      },
                    ]}
                  >
                    <p name="">Active (Shown Everywhere). In-active (Hidden Everywhere).</p>
                  </Form.Item>
                </Col>
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
