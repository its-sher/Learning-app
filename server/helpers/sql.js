const con = require("../models/db");
var SQL = function () {};
let tolist = (packetData) =>
  Object.values(JSON.parse(JSON.stringify(packetData)));

/*********Updated Query ******************************************** */

SQL.addData = async (tablename, data) => {
  var keys = Object.keys(data);
  var Values = Object.values(data)
    .map((x) => "'" + x + "'")
    .toString();
  var sqlquery =
    "INSERT INTO " +
    tablename +
    "( " +
    keys.toString() +
    ") VALUES (" +
    Values +
    ")";
  console.log(sqlquery);
  return new Promise((resolve, reject) => {
    const sql = con.query(sqlquery, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.insertId);
      }
    });
  });
};

SQL.Updatedata = async (tablename, data = {}, ifwhere = null) => {
  console.log(tablename);
  var sqlquery = "UPDATE " + tablename + " SET ";
  var Where = "";
  var SETVALUES = "";

  if (data != null) {
    var data_val = Object.keys(data);

    data_val.forEach((fieldkey) => {
      SETVALUES += fieldkey + "='" + data[fieldkey] + "' , ";
    });
    SETVALUES = SETVALUES.substring(0, SETVALUES.length - 3);
  }

  if (ifwhere != null) {
    var keys = Object.keys(ifwhere);

    keys.forEach((eachkey) => {
      Where += eachkey + "='" + ifwhere[eachkey] + "' , ";
    });
    Where = Where.substring(0, Where.length - 3);
    Where = " WHERE " + Where;
  }
  console.log(sqlquery + SETVALUES + Where);
  return new Promise((resolve, reject) => {
    const sql = con.query(sqlquery + SETVALUES + Where, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(tolist(result));
      }
    });
  });
};

/* (tablename, [], ifwhere = null) */
SQL.gettabledata = async (tablename, select = [], ifwhere = null) => {
  var select_values = "*";
  if (select.length > 0) {
    select_values = select.toString();
  }
  var sqlquery = "SELECT " + select_values + " FROM " + tablename;
  var Where = "";

  if (ifwhere != null) {
    var keys = Object.keys(ifwhere);

    keys.forEach((eachkey) => {
      Where += eachkey + "='" + ifwhere[eachkey] + "' AND ";
    });
    Where = Where.substring(0, Where.length - 5);
    Where = " WHERE " + Where;
    //console.log(Where);
  }
  //console.log(sqlquery + Where);
  return new Promise((resolve, reject) => {
    const sql = con.query(sqlquery + Where, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(tolist(result));
      }
    });
  });
};

SQL.query = async (sqlquery) => {
  return new Promise((resolve, reject) => {
    const sql = con.query(sqlquery, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(tolist(result));
      }
    });
  });
};
//-----------------------------------------------------------------
module.exports = SQL;
