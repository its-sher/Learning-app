const SQL = require("./helpers/sql");
var moment = require("moment");
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES; //8000

const table_name = "users";
const ValidateToken = async (req, res, next) => {
  if (req.headers.token == undefined) {
    console.log("No Access Token");
    const Error = {
      error: "Url Forbidden!",
    };
    return res.status(403).json(Error);
  }
  const auth_token = req.headers.token;
  const access_token_data = await SQL.gettabledata(table_name, [], {
    access_token: auth_token,
  });
  console.log(access_token_data);
  if (access_token_data.length < 1) {
    console.log("No Access Token");
    const Error = {
      error: "Url Forbidden!",
    };
    return res.status(403).json(Error);
  } else {
    req.headers.user = access_token_data[0];
    next();
  }
  //STEP-1 -------------------------------CHECK ACCESS TOKEN THERE OR NOT-------------------ends
};

module.exports = { ValidateToken };
//--------------------------------------------------------------------------------------------
