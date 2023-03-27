import React, { useEffect, useState } from 'react';
import { Row, Col, Form, notification, Input, Button } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { AddUser } from './style';
import Cookies from 'js-cookie';
import { Main } from '../styled';
import 'moment/locale/zh-cn';
import { imageRender } from '../../helpers/renderImage';
import imageUploadSave from '../../helpers/uploadImage';

import { Cards } from '../../components/cards/frame/cards-frame';
import { get_api_request, post_api_request, put_api_request, api_url } from '../../helpers/Common';
import { headers } from '../../helpers/variables';
import { decodetheid, encrypttheid } from '../../helpers/encode-decode';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import StaticImage from '../../static/img/default_image.jpg';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;
const { decrypt } = require('../../helpers/encryption-decryption');

const Linkedin = () => {
  const [form] = Form.useForm();
  const [imageform] = Form.useForm();
  const [userid, setUserID] = useState();
  const [Images, setImages] = useState([]);
  const [ImageUrl, setImageURL] = useState([]);
  const [Defaultimagedata, setdefaultimagedata] = useState([]);
  const [reRenderPinData, setReRenderPinData] = useState(0);

  useEffect(() => {
    const enc_user_detail = Cookies.get('UserDetail');
    const response = decrypt(enc_user_detail);
    const userId = response?.sessdata?.users_id;
    setUserID(userId);

    async function getalldefaultImage() {
      const url = api_url.get_defaultimage_byuserid;

      const response = await get_api_request(url, headers);
      if (response.status === 200) {
        const defaultimagedata = response.data.responsedata;
        console.log(defaultimagedata);
        defaultimagedata?.map((item, index) => {
          defaultimagedata[index].image = domainpath + item.image_url;
        });
        console.log(defaultimagedata);
        setdefaultimagedata(defaultimagedata);
      }
    }
    getalldefaultImage();
  }, [reRenderPinData]);

  const url = domainpath + '/images/post';
  const imageHandleChange = async (e, index) => {
    var vfile;
    vfile = e.target.files;
    var singleimage = imageRender(vfile);
    Defaultimagedata[index].image_url = singleimage;
    Defaultimagedata[index].image = singleimage;
    setImages(singleimage);

    await imageUploadSave(vfile, url, headers)
      .then(resp => {
        setImageURL(resp);
      })
      .catch(error => {
        notification.error({
          message: error?.response?.data?.message,
        });
      });
  };

  const handleSubmit = () => {
    const payload = {};
    payload['image_url'] = ImageUrl.toString();
    async function UpdateData(data) {
      const url = api_url.updatebyuserId_defaultImage;
      const response = await put_api_request(url, data, headers);
      console.log(response);
      if (response.status == 201) {
        notification.success({
          message: 'DefaultImage Create Successfully',
        });
        //setReRenderPinData(reRenderPinData + 1);
      }
    }

    UpdateData(payload);
  };
  // async function UpdateData(data) {
  //   const url = api_url.updatebyuserId_defaultImage + userid;
  //   const response = await put_api_request(url, data, { headers });
  //   if (response.status == 201) {
  //     notification.success({
  //       message: 'DefaultImage updated Successfully',
  //     });
  //     setReRenderPinData(reRenderPinData + 1);
  //   }
  // }

  return (
    <>
      <PageHeader ghost title="Image Url" />
      <Main>
        <Row gutter={15}>
          <Col xs={12}>
            <AddUser>
              <Cards>
                <Form name="sDash_validation-form" form={form} layout="vertical" onFinish={handleSubmit}>
                  <Row gutter={30}>
                    <Col md={12}>
                      <Row>
                        {Defaultimagedata?.map(
                          (item, index) => (
                            console.log(item),
                            (
                              <Col md={24} className="defaultimage">
                                <div class="inputFIle">
                                  <label class="file-input2" style={{ position: 'relative' }}>
                                    <div className="addpageupload categoryEditResult text">
                                      {/* {renderPictures(Images)} */}
                                      {Defaultimagedata[index].image_url ? (
                                        <img
                                          className="imgse renderCategoryEdit text "
                                          style={{ width: '200px' }}
                                          src={Defaultimagedata[index].image}
                                        />
                                      ) : (
                                        <img
                                          className="imgse staticImagewid"
                                          style={{ width: '200px' }}
                                          src={StaticImage}
                                        />
                                      )}
                                    </div>
                                    <div class="clickfile">
                                      <Input
                                        style={{ opacity: '0' }}
                                        name="image"
                                        label="Image"
                                        type="file"
                                        // datafield={image + '-' + i}
                                        onChange={e => imageHandleChange(e, index)}
                                        id="file-input2"
                                        value={index[0]}
                                      />
                                    </div>
                                  </label>
                                </div>
                              </Col>
                            )
                          ),
                        )}

                        {/* <div class="inputFIle">
                          <label class="file-input2" style={{ position: 'relative' }}>
                            <img
                              className="imgse staticImagewid"
                              src={domainpath + item.image_url}
                              style={{ width: '200px' }}
                            />
                          </label>
                        </div> */}

                        <Col md={24} style={{ marginTop: ' 10px' }}>
                          <Button style={{ background: '#6dc16d', color: ' white' }} htmlType="submit">
                            Update
                          </Button>
                        </Col>
                      </Row>
                    </Col>
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

export default Linkedin;
