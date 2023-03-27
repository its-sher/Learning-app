import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Spin, Form, Input, Table, Checkbox, notification } from 'antd';
import { Switch, Route, NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { AddUser } from '../../container/pages/style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main, TableWrapper } from '../styled';
import Axios from 'axios';
import { headers } from '../../helpers/variables';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

var finalarray = [];
var ModuleName = 'ADDUSERSROLE';
const AddUsersRole = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [arraydataroles, setarraydataroles] = useState(null);
  const [arraydatastoretype, setarraydatastoretype] = useState(null);
  const [storeModulesData, setStoreModulesData] = useState([]);

  const dataSource = [];

  var permissionsArrayData = [];
  var roleObject = {};
  roleObject['ADMIN'] = {};
  roleObject.ADMIN['MODULES'] = {};
  useEffect(() => {
    //getting array of id and names to populate dropdowns++++++++++++++++++++++++++++++++++++++++++++++++++STARTS
    async function getRoles() {
      const payload = { request: 'add' };
      await Axios.post(domainpath + '/role/admin/user', payload, { headers }).then(response => {
        console.log(response);
        if (response.status === 200) {
          const rolesdata = response.data.responsedata.roles;

          //make array of names of store types+++++++++++++++++
          const dataArray = rolesdata.map(item => {
            return { id: item.id, name: item.title };
          });
          //console.log(dataArray);
          setarraydataroles(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getRoles();

    async function getStoreTypes() {
      const payload = { request: 'all' };
      await Axios.post(domainpath + '/storetype/all', payload, { headers }).then(response => {
        if (response.status === 200) {
          const storetypedata = response.data.responsedata.storetypes;

          //make array of names of store types+++++++++++++++++
          const dataArray = storetypedata.map(item => {
            return { id: item.id, name: item.name };
          });
          console.log(dataArray);
          setarraydatastoretype(dataArray);
          getStoreModules(dataArray?.[3]?.id);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getStoreTypes();
    //getting array of id and names to populate dropdowns++++++++++++++++++++++++++++++++++++++++++++++++++ENDS
  }, []);
  //get modules name from db++++++++++++++++++++++++++++++++STARTS
  async function getStoreModules(event) {
    //console.log(event);
    const storeTypeId = event;
    async function getUserDataByID(storeTypeId) {
      console.log(storeTypeId);

      await Axios.get(domainpath + `/storetypemodule/storetype/${storeTypeId}`, { headers }).then(response => {
        console.log(response);
        if (response.status === 200) {
          const modulesdata = response?.data?.responsedata?.store_type_modules;
          //console.log(modulesdata);
          //make array of names of store modules+++++++++++++++++
          var count = 0;
          const dataArray = modulesdata?.map(item => {
            console.log(item);
            count++;
            return {
              index: count,
              id: item.module_id,
              name: item.module_name,
              view: '',
              add: '',
              edit: '',
              delete1: '',
              select: '',
            };
          });

          //console.log(dataArray);
          //inserting false to add, edit, view , del--starts

          //inserting false to add, edit, view , del--ends
          setStoreModulesData(dataArray);
          // console.log(dataArray);
          //+++++++++++++++++++++++++++++++++++++++++++++++++++
        }
      });
    }
    getUserDataByID(storeTypeId);
  }

  //get modules name from db++++++++++++++++++++++++++++++++ENDS

  //-------------------------------------------------------------------------------------------
  const handleOnChange = (rec_id, rec_view) => {
    //console.log(rec_id);
    //console.log(rec_view); //"view"
    const key_name = rec_view.target.value;

    const soureceObj = { [key_name]: rec_view.target.checked };

    //  console.log(storeModulesData);
    var tempData = storeModulesData.map(item => {
      if (item.id == rec_id) {
        Object.assign(item, soureceObj);
        if (item.view == false || item.add == false || item.edit == false || item.delete1 == false) {
          item.select = '';
        } else if (item.view == true && item.add == true && item.edit == true && item.delete1 == true) {
          item.select = true;
        }
      }
      return item;
    });
    console.log(tempData);
    setStoreModulesData(tempData);
  };

  const handleOnChange1 = (rec_id, rec_view, index) => {
    //console.log(rec_view.target.checked);
    if (rec_view.target.checked == true) {
      var row_num = index - 1;
      storeModulesData[row_num].view = true;
      storeModulesData[row_num].add = true;
      storeModulesData[row_num].edit = true;
      storeModulesData[row_num].delete1 = true;
    } else if (rec_view.target.checked == false) {
      var row_num = index - 1;
      storeModulesData[row_num].view = false;
      storeModulesData[row_num].add = false;
      storeModulesData[row_num].edit = false;
      storeModulesData[row_num].delete1 = false;
    }
    const key_name = rec_view.target.value;
    const soureceObj = { [key_name]: rec_view.target.checked };

    var tempData = storeModulesData.map(item => {
      if (item.id == rec_id) {
        Object.assign(item, soureceObj);
      }
      return item;
    });
    console.log(tempData);
    setStoreModulesData(tempData);
  };

  var payload = {};
  const handleSubmit = fieldsValue => {
    var finalkey = [];
    storeModulesData?.map((item, key) => {
      if (item.view == false && item.add == false && item.edit == false && item.delete1 == false) {
      } else {
        if (item.view == true) {
          storeModulesData[key].view = 1;
        } else {
          storeModulesData[key].view = 0;
        }
        if (item.add == true) {
          storeModulesData[key].add = 1;
        } else {
          storeModulesData[key].add = 0;
        }
        if (item.edit == true) {
          storeModulesData[key].edit = 1;
        } else {
          storeModulesData[key].edit = 0;
        }
        if (item.delete1 == true) {
          storeModulesData[key].delete1 = 1;
        } else {
          storeModulesData[key].delete1 = 0;
        }
        //array for api------
        const keyName = item.name;
        const value = item.view + ',' + item.add + ',' + item.edit + ',' + item.delete1;
        finalkey.push([keyName, value]);
      }
    });
    //array for api------

    const arraytoObject = Object.fromEntries(finalkey);
    console.log(arraytoObject);
    if (arraytoObject && arraytoObject !== undefined && Object.keys(arraytoObject).length != 0) {
      const gotTitledata = fieldsValue.role_title;
      let temp0 = gotTitledata
        .replace(/^\s+|\s+$/gm, '') //remove first and last spaces
        .replace(/ /g, '_') //replaced space to underscore
        .toLowerCase(); //replace to lowecase
      payload['title'] = temp0;
      //
      payload['parent_role'] = fieldsValue.parent_role;
      payload['store_type'] = fieldsValue.store_type;
      payload['active'] = fieldsValue.active;
      payload['description'] = fieldsValue.description;
      payload['MODULES'] = arraytoObject;
      console.log(payload);
      //
      Axios.post(domainpath + '/role', payload, { headers })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.status == 'success') {
              notification.success({
                message: 'Role Created Successfully',
              });
              // SetError('Added Successfully');
            }
            setTimeout(() => {
              notification.destroy();
              history.push('../users/roles');
            }, 2500);
          } else {
            notification.error({ message: 'Server error' });
            setTimeout(() => {
              notification.destroy();
            }, 2000);
          }
        })
        .catch(error => {
          notification.error({
            message: error.response.data.message,
          });
          // console.log(error.response.data);
          //    console.log(error.response.status);
          // console.log(error.response.headers);
        });
    } else {
      notification.error({ message: 'Select Modules and Permissions' });
    }
  };

  function datavalueMapping() {
    if (storeModulesData.length) {
      storeModulesData.map((value, key) => {
        const { id, index, name, view, add, edit, delete1, select } = value;
        return dataSource.push({
          key: key + 1,
          id: (
            <Checkbox
              id={id}
              checked={select}
              value="select"
              onChange={e => {
                handleOnChange1(id, e, index);
              }}
            ></Checkbox>
          ),

          name: name,
          view: (
            <Checkbox
              id={id}
              value="view"
              checked={view}
              onChange={e => {
                handleOnChange(id, e);
              }}
            ></Checkbox>
          ),

          add: (
            <Checkbox
              id={id}
              value="add"
              checked={add}
              onChange={e => {
                handleOnChange(id, e);
              }}
            ></Checkbox>
          ),
          edit: (
            <Checkbox
              id={id}
              value="edit"
              checked={edit}
              onChange={e => {
                handleOnChange(id, e);
              }}
            ></Checkbox>
          ),
          delete1: (
            <Checkbox
              id={id}
              value="delete1"
              checked={delete1}
              onChange={e => {
                handleOnChange(id, e);
              }}
            ></Checkbox>
          ),
        });
      });
    }
  }
  datavalueMapping();

  const columns = [
    {
      title: 'Select',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Module Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      // render: val => (
      //   <Checkbox
      //     checked={val}
      //     //onChange={onchange2}
      //   ></Checkbox>
      // ),
    },
    {
      title: 'Add',
      dataIndex: 'add',
      key: 'add',
      //  render: val => <Checkbox checked={val}></Checkbox>,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      //render: val => <Checkbox checked={val}></Checkbox>,
    },
    {
      title: 'Delete',
      dataIndex: 'delete1',
      key: 'delete1',
      // render: val => <Checkbox checked={val}></Checkbox>,
    },
    {
      title: '',
      dataIndex: '',
      key: '',
    },
  ];
  //ROW SELECTION STARTS============================================================

  const bulkDelete = selectedids => {
    // setState({ ...state, selectedRowKeys: selectedRowKey });
  };
  //ROW SELECTION ENDS==============================================================
  //
  //

  return (
    <>
      <PageHeader
        ghost
        title="Add User Role"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <CalendarButtonPageHeader key="1" />
          <ExportButtonPageHeader key="2" />
          <ShareButtonPageHeader key="3" /> */}
            {/* <Button onClick={() => history.push(`../users/roles`)} size="small" key="4" type="primary"> */}
            <Button onClick={() => history.push(`../users/roles`)} size="small" key="4" type="primary">
              {/* <FeatherIcon icon="plus" size={14} />  */}
              User Role List
            </Button>
          </div>,
        ]}
      />
      <Main className="userRoleCustm">
        <Row gutter={15}>
          <Col xs={24}>
            <AddUser>
              <Cards>
                <Form
                  name="sDash_validation-form"
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  //  onChange={submit}
                >
                  <Row gutter={30}>
                    <Col md={8} xs={24}>
                      <Form.Item
                        name="role_title"
                        label="Role Title"
                        rules={[
                          {
                            required: true,
                            message: 'Enter Role Name',
                          },
                        ]}
                      >
                        <Input placeholder="Enter role name" />
                      </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                      <Form.Item key="parent_role1" name="parent_role" initialValue="" label="Parent Role(if any)">
                        <Select style={{ width: '100%' }} arraydataroles={arraydataroles}>
                          {arraydataroles != null
                            ? arraydataroles.map(item => {
                                return <Option value={item.id}>{item.name} </Option>;
                              })
                            : ''}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={8} xs={24}>
                      <Form.Item key="store_type" name="store_type" initialValue={4} label="Store Type">
                        <Select
                          style={{ width: '100%' }}
                          arraydatastoretype={arraydatastoretype}
                          onChange={getStoreModules}
                          //defaultValue={4}
                        >
                          {arraydatastoretype != null
                            ? arraydatastoretype.map(item => {
                                return <Option value={item.id}>{item.name}</Option>;
                              })
                            : ''}
                        </Select>
                        {/* <Input readOnly defaultValue={'Dashboard'} /> */}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col md={8} xs={24}>
                      <Form.Item key="active" name="active" label="Status" initialValue={0}>
                        {/* <Input placeholder="Enter Role Name" /> */}
                        <Select style={{ width: '100%' }}>
                          <Option value={1}>Active</Option>
                          <Option value={0}>Inactive</Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col md={8} xs={24}>
                      <Form.Item name="description" label="Description">
                        <Input placeholder="Description" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={15}>
                    <Col md={24}>
                      <TableWrapper className="table-order table-responsive">
                        <Table
                          //rowSelection={rowSelection}
                          dataSource={dataSource}
                          columns={columns}
                          // expandable={{
                          //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                          // }}
                          pagination={{
                            style: { justifyContent: 'center' },
                            defaultPageSize: 20,
                            //  showSizeChanger: true,
                            total: storeModulesData.length,
                            // pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
                          }}
                        />
                      </TableWrapper>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Item>
                      <div className="add-user-bottom text-right">
                        {/* <Button
                          className="ant-btn ant-btn-primary"
                          type="danger"
                          size="default"
                          onClick={() => {
                            return form.resetFields();
                          }}
                        
                        >
                          Reset
                        </Button> */}
                        <Button
                          className="ant-btn ant-btn-primary"
                          type="danger"
                          size="default"
                          onClick={() => {
                            history.push('../users/roles');
                          }}
                        >
                          Back
                        </Button>

                        <Button
                          htmlType="submit"
                          type="success"
                          size="default" //disabled={disable}
                          // onClick={handleSubmit}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form.Item>
                  </Row>
                </Form>
              </Cards>
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddUsersRole;
