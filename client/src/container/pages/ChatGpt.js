import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button, Select } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import 'moment/locale/zh-cn';
import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import TextArea from 'antd/lib/input/TextArea';
import { encrypttheid } from '../../helpers/encode-decode';

const { decrypt } = require('../../helpers/encryption-decryption');

const Linkedin = () => {
  const [form] = Form.useForm();
  const [getAllChat] = Form.useForm();
  const [userid, setUserID] = useState();
  const [GptData, setGptData] = useState([]);
  const [GptId, setGptId] = useState([]);
  const [Images, setImages] = useState([]);
  const [arrayDataModels, setarrayDataModels] = useState([]);
  const [formData, setformData] = useState({
    updtaecontext: '',
    updtaemodel: '',
  });

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    async function getallChatGpt() {
      const url = api_url.get_gpt_all;
      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const gptdata = response.data.responsedata;
        const gptid = response.data.responsedata[0].id;
        setGptData(gptdata);
        setGptId(gptid);
      }
    }
    getallChatGpt();
  }, []);

  const handleSubmit = feildsValue => {
    const payload = {};
    payload['context'] = feildsValue.context;
    payload['model'] = feildsValue.model;
    payload['active'] = '1';
    async function CreateChatgpt(data) {
      const url = api_url.create_gpt;

      const response = await post_api_request(url, data, { headers });
      if (response.status == 201) {
        notification.success({
          message: 'ChatGpt Created Successfully',
        });
      }
    }
    CreateChatgpt(payload);
  };
  const HandleUserPinDescriptionValue = (e, name, index) => {
    console.log(e);
    console.log(index);
    const attributeValue = e;
    console.log(attributeValue);
    // const splitdata = attributeValue.split('-');
    // const index = splitdata[1];
    // const updateData = UsersPinData?.map((value, i) =>
    //   index == i ? Object.assign(value, { [e.target.name]: e.target.value }) : value,
    // );
    GptData[index].model = e;
  };
  const handleSubmitUpadte = feildsvalue => {
    const payLoad = {};
    console.log(GptData);
    GptData.map(item => {
      payLoad['model'] = item?.model;
    });

    payLoad['context'] = feildsvalue.contexts;

    payLoad['active'] = '1';
    async function UpdtaeChatgpt(data) {
      const id = encrypttheid(GptId);
      const url = api_url.update_gpt + id;
      const response = await put_api_request(url, data, { headers });
      if (response.status == 201) {
        notification.success({
          message: 'ChatGpt Updated Successfully',
        });
      } else {
        notification.error({
          message: response.message,
        });
      }
    }
    UpdtaeChatgpt(payLoad);
  };

  return (
    <>
      <PageHeader ghost title="Chat Gpt Context" />
      <Main>
        <Row gutter={15}>
          <Col xs={12}>
            <AddUser>
              {/* ADD new Chat Gpt Text */}
              {/* <Form name="sDash_validation-form" form={form} layout="vertical"   
                onFinish={handleSubmit}
                >
                  <Cards>
                  <Row gutter={30}>
                  <Col md={24} xs={24} className="gptConfig">
                  <Form.Item name="context" label="Gpt Context">
                      <TextArea  placeholder='kkkkkkkkkkkkk' rows={4} style={{marginTop: '7px'}}/>
                    </Form.Item>
                  </Col>

                  <Col md={24} xs={24} className="gptConfig">
                  <Form.Item name="model"  label="Gpt Model"  className=''>
                  <Select  name="models" style={{ width: '100%' }}  
                   classNamePrefix="select" >
                  <Option value="text-davinci-003">text-davinci-003</Option> 
                  <Option value="text-davinci-004">text-davinci-004</Option> 
                  <Option value="text-davinci-005">text-davinci-005</Option> 
                  </Select>
                  </Form.Item>
                   </Col>
                   <Col md={24} className="buttonSave">
                     <Form.Item >
                       <Button style={{background: '#6dc16d',color:' white'}} htmlType="submit">Save</Button>
                       </Form.Item>
                     </Col>
                  </Row>
                  </Cards>
                 
                </Form> */}
              {/* End new Chat Gpt Text */}

              {/*get all Chat Gpt context */}
              <Form name="sDash_validation-form" form={getAllChat} layout="vertical" onFinish={handleSubmitUpadte}>
                {GptData?.map((item, index) => (
                  <Row gutter={30}>
                    <Cards>
                      <Col md={24} xs={24} className="gptConfig">
                        <Form.Item name="contexts" label="Gpt Context">
                          <TextArea
                            placeholder="kkkkkkkkkkkkk"
                            rows={4}
                            style={{ marginTop: '7px' }}
                            defaultValue={item.context}
                          />
                        </Form.Item>
                      </Col>

                      <Col md={24} xs={24} className="gptConfig">
                        <Form.Item name="models" label="Gpt Model" className="">
                          <Select
                            name="updtaemodel"
                            style={{ width: '100%' }}
                            classNamePrefix="select"
                            defaultValue={GptData[index].model}
                            datafield={'model' + '-' + index}
                            onChange={e => HandleUserPinDescriptionValue(e, 'description', index)}
                          >
                            <Option value="text-davinci-003">text-davinci-003</Option>
                            <Option value="text-davinci-004">text-davinci-004</Option>
                            <Option value="text-davinci-005">text-davinci-005</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={24} className="buttonSave">
                        <Form.Item>
                          <Button style={{ background: '#6dc16d', color: ' white' }} htmlType="submit">
                            Update
                          </Button>
                        </Form.Item>
                      </Col>
                    </Cards>
                  </Row>
                ))}
              </Form>
              {/*get all Chat Gpt context */}
            </AddUser>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Linkedin;
