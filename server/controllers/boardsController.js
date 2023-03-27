const Modeltable = require("../models/board");
const { decodetheid, validation } = require("../helpers/common");
const table = "boards";
const {
  GetBoards,
  CreateBoard,
  GetBoardByID,
  DeleteBoard,
  UpdateBoard,
} = require("../helpers/pinterest");
//-------------------------------------------------------------------------------------------------------------

const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

exports.Create = async (req, res) => {
  const validationRule = {
    name: "required|string",
    description: "required|string",
  };
  var g_response = {};
  var g_status_code;
  var data = req.body;
  var token = req.headers.token;
  try {
    const valid_data = await validation(data, validationRule);
    try {
      //  const create_response = await create(valid_data);
      const create_board_data = await CreateBoard(token, data);
      g_response["status"] = "success";
      g_response["message"] = `Created ${table} Successfully`;
      g_response["reponsedata"] = create_board_data;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

const create = (data) => {
  return new Promise((resolve, reject) => {
    Modeltable.create(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.GetAll = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;

  try {
    const get_board_data = await GetBoards(token);
    // const get_faq_data = await get_by_id(ID);
    g_response["status"] = "success";
    g_response["responsedata"] = get_board_data.items;
    g_status_code = 200;
    console.log(g_response);
  } catch (err) {
    g_response["status"] = "error";
    g_response["message"] = err.message;
    g_status_code = 400;
  }
  res.status(g_status_code).json(g_response);
};

const get_by_id = (ID) => {
  console.log(ID);
  return new Promise((resolve, reject) => {
    Modeltable.getById(ID, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.GetById = async (req, res) => {
  var ID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;
  console.log("TTTTTTTTTTTTTTTTTTTTTTtt");
  console.log(token);
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    try {
      const get_board_data = await GetBoardByID(token, ID);
      console.log(get_board_data);
      console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRr");
      // const get_faq_data = await get_by_id(ID);
      g_response["status"] = "success";
      g_response["responsedata"] = get_board_data;
      g_status_code = 200;
      console.log(g_response);
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

exports.UpdateById = async (req, res) => {
  const validationRule = {
    name: "required|string",
    description: "required|string",
  };
  var ID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;
  const data = req.body;
  console.log(data);
  if (req.params.id && req.params.id.length > 0) {
    ID = req.params.id;
    console.log(ID);

    try {
      const validate_data = await validation(data, validationRule);

      try {
        const create__response = await UpdateBoard(token, ID, data);

        g_response["status"] = "success";
        g_response["message"] = `Update ${table} Successfully`;
        g_response["responsedata"] = create__response;

        g_status_code = 201;
      } catch (err) {
        g_response["status"] = "error";
        g_response["message"] = err.message;
        g_status_code = 400;
      }
    } catch (err) {
      g_response["status"] = "err";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};

const update_byId = (data) => {
  return new Promise((resolve, reject) => {
    Modeltable.update(data, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

exports.DeleteById = async (req, res) => {
  var deleteID;
  var g_response = {};
  var g_status_code;
  var token = req.headers.token;
  if (req.params.id && req.params.id.length > 0) {
    deleteID = req.params.id;
    try {
      const delete_resp = await DeleteBoard(token, deleteID);
      console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKK");
      console.log(delete_resp);
      g_response["status"] = "success";
      g_response["message"] = `Board Deleted Successfully`;
      g_response["responsedata"] = delete_resp;
      g_status_code = 201;
    } catch (err) {
      g_response["status"] = "error";
      g_response["message"] = err.message;
      g_status_code = 400;
    }
    res.status(g_status_code).json(g_response);
  }
};
