import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select, DatePicker } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';

const { decrypt, encrypt } = require('../../helpers/encryption-decryption');
const { decodetheid, encrypttheid } = require('../../helpers/encode-decode');

const Linkedin = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const [userid, setUserID] = useState();
  const [arrayDataModels, setarrayDataModels] = useState([]);
  const [config, setconfig] = useState([]);

  const disabledDate = current => {
    return current && current < dayjs().endOf('day');
  };
  const [formData, setformData] = useState({
    updtaecontext: '',
    updtaemodel: '',
  });
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
  });

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    async function getallConfiguration() {
      const Ids = '245';
      const url = api_url.get_all_configurations_byid + Ids;
      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const configdata = response.data.responsedata.configurations[0].config_value;
        setconfig(configdata);
        form.setFieldsValue({
          schedule_interval: configdata,
        });
      }
    }
    getallConfiguration();
  }, []);
  const handleSubmit = (feildsvalue, e) => {
    const payload = {};
    payload['config_key'] = 'schedule_interval';
    payload['config_value'] = feildsvalue.schedule_interval;
    //payload['GPT_modelllll']=feildsvalue.GPT_modelllll;
    async function CreateConfig(data) {
      const id = '245';
      const url = api_url.update_configurationBYId + id;
      const response = await put_api_request(url, data, headers);
      if (response.status == 201) {
        notification.success({
          message: 'Configuartion  Updated Successfully',
        });
      }
    }
    CreateConfig(payload);
  };

  return (
    <>
      <PageHeader ghost title="Chat Gpt Context" />
      <Main>
        <Row gutter={15}>
          <Col xs={12}>
            <AddUser>
              <Row>
                <Cards>
                  <Form name="sDash_validation-form" form={form} layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={30}>
                      <Col md={12} xs={24} className="gptConfig" id="sceduletym">
                        <Form.Item name="schedule_interval" label="Schedule Interval">
                          <Select
                          // defaultValue={item.schedule_intervalllll}
                          >
                            <Option value="24">1Day</Option>
                            <Option value="48">2Days</Option>
                            <Option value="72">3Days</Option>
                            <Option value="96">4Days</Option>
                            <Option value="120">5Days</Option>
                            <Option value="144">6Days</Option>
                            <Option value="168">7Days</Option>
                            <Option value="192">8Days</Option>
                            <Option value="216">9Days</Option>
                            <Option value="240">10Days</Option>
                            {/* {hours.map(hours => <option key={hours} value={hours}>{hours}</option>)} */}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} className="buttonSave">
                        <Form.Item>
                          <Button style={{ background: '#6dc16d', color: ' white' }} htmlType="submit">
                            Save
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Cards>
              </Row>{' '}
              {/* Get all Configurations */}
              {/* Get all Configurations */}
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Linkedin;
