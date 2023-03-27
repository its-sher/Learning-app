import Axios from 'axios';
import { headers } from './variables';
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const api_url = [];

api_url['get_pinall'] = '/pin/pinterestpins/';
api_url['get_gpt_all'] = '/gpt/all';
api_url['user_pinall'] = '/pin/userpins/all';
api_url['create_user'] = '/user/';
api_url['create_urlattachment'] = '/attachment/uploadimgurl/url';
api_url['create_configuration'] = '/configuration/';
api_url['create_gpt'] = '/gpt/';
api_url['get_all_defaultimage'] = '/default/all';
api_url['get_all_users_pins'] = '/pin/userpins/all';
api_url['get_all_users'] = '/user/';
api_url['get_all_configurations'] = '/configuration/';
api_url['get_all_configurations_byid'] = '/configuration/';
api_url['update_pinterestby_UserId'] = '/pinterest/auth/';
api_url['get_pinterestby_UserId'] = '/pinterest/auth/';
api_url['get_schedule_byId'] = '/schedule/board/';
api_url['get_auth_url'] = '/pinterest/auth_url/';
api_url['trash_user'] = '/user/trash/';
api_url['delete_pinBy_id'] = '/pin/userpin/';
api_url['delete_scheduleby_id'] = '/schedule/';
api_url['get_board_all'] = '/board/userboards';
api_url['get_schedule_all'] = '/schedule/all';
api_url['get_pinterest_auth_all'] = '/pinterest/auth/all';
api_url['get_defaultimage_byuserid'] = '/default/';
api_url['create_pin'] = '/pin/';
api_url['create_description'] = '/pin/generatediscription/';
api_url['create_board'] = '/board';
api_url['create_schedule'] = '/schedule/';
api_url['create_defaultImage'] = '/default/';
api_url['create_Attachment'] = '/attachment/posts';
api_url['update_access_token'] = '/pinterest/access_token/';
api_url['update_pin'] = '/pin/';
api_url['update_userpinByid'] = '/pin/userpins/';
api_url['update_gpt'] = '/gpt/';
api_url['update_schedulebyId'] = '/schedule/';
api_url['update_configurationBYId'] = '/configuration/';
api_url['get_configurationBYId'] = '/configuration/';
api_url['updatebyuserId_defaultImage'] = '/default/';
api_url['delete_userpins'] = '/pin/userpins/';

//

/*Request Function Starts +++++*/
const get_api_request = (url, headers = null) => {
  const promise1 = new Promise((resolve, reject) => {
    Axios.get(domainpath + url, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};
//--------------------------------------------------------
const post_api_request = (url, payload, headers = null) => {
  // Axios.post(domainpath + url, payload, { headers }).then(response => {
  //   return response;
  // });
  const promise1 = new Promise((resolve, reject) => {
    Axios.post(domainpath + url, payload, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};
//---------------------------------------------------------
const put_api_request = (url, payload, headers = null) => {
  // Axios.put(domainpath + url, payload, { headers }).then(response => {
  //   return response;
  // });
  const promise1 = new Promise((resolve, reject) => {
    Axios.put(domainpath + url, payload, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      var message = '';
      if (error?.message?.response?.data?.message) {
        message = error.message.response.data.message;
      } else {
        message = error;
      }
      const Error = {
        status: 'error',
        message: message,
      };
      return Error;
    });
  return response_promise;
};
//----------------------------------------------------------
const delete_api_request = (url, headers = null) => {
  const promise1 = new Promise((resolve, reject) => {
    Axios.delete(domainpath + url, { headers })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        const Error = {
          status: 'error',
          message: error,
        };
        reject(Error);
      });
  });
  const response_promise = promise1
    .then(value => {
      return value;
    })
    .catch(error => {
      const Error = {
        status: 'error',
        message: error,
      };
      return Error;
    });
  return response_promise;
};

export { get_api_request, post_api_request, put_api_request, delete_api_request, api_url };
