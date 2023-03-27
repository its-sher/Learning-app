const { response } = require("express");
const { dirname } = require("path");
var https = require("https");
const fs = require("fs");
const Path = require("path");
const Axios = require("axios");
// var bodyParser = require("body-parser");

// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     parameterLimit: 100000,
//     extended: false,
//   })
// );

// app.use(
//   bodyParser.json({
//     limit: "50mb",
//   })
// );

const con = require("../models/db");
const mime = require("mime");
const bcrypt = require("bcrypt");
const resizer = require("node-image-resizer");
const setup = {
  all: {
    path: "./uploads/thumbnails/",
    quality: 80,
  },
  versions: [
    {
      prefix: "big_",
      width: 1024,
      height: 768,
    },
    {
      prefix: "medium_",
      width: 512,
      height: 256,
    },
    {
      quality: 100,
      prefix: "small_",
      width: 128,
      height: 64,
    },
  ],
};
const domainpath = process.env.REACT_APP_DOMAIN_ENDPOINT;

const CreateAttachment = (req, res) => {
  var allowed_mime_types = ["image/png", "image/jpeg", "image/jpg"];

  var folder = req.params.folder;
  var base64Image = req.body.file;
  var filename = req.body.filename;
  var mime_type = req.body.mime_type;
  let newname = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijfilenameklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 10) {
    newname += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  var dir = "/uploads/" + folder + "/";
  var img_name = newname + "_" + filename;
  filename = dir + newname + "_" + filename;
  fs.writeFile(
    "." + filename,
    base64Image,
    { encoding: "base64" },
    function (err) {
      if (err === null) {
        const Response = {
          status: "success",
          responsedata: {
            path: filename,
            thumbnails: [
              "/uploads/thumbnails/big_" + img_name,
              "/uploads/thumbnails/medium_" + img_name,
              "/uploads/thumbnails/small_" + img_name,
            ],
          },
        };
        const appDir = dirname(filename);
        console.log(appDir);
        (async () => {
          await resizer("./" + filename, setup);
        })();
        res.status(201).json(Response);
        console.log("File created");
      } else {
        const Error = { status: "error", message: "Server Error" };
        res.status(204).json(Error);
      }
    }
  );
};
const Resize = (req, res) => {
  var allowed_mime_types = ["image/png", "image/jpeg", "image/jpg"];

  var folder = req.params.folder;
  let newname = "";
  var fullPath = "./uploads/" + folder;
  fs.readdir(fullPath, (error, files) => {
    if (error) console.log(error);
    // const Error = { status: "error", message: "Server Error" };
    //res.status(204).json(Error);
    files.forEach((file) => {
      (async () => {
        await resizer(fullPath + "/" + file, setup);
      })();
      console.log(file);
    });
  });
};
const downloadFromUrl = async (req, res) => {
  var url = req.body.url;
  var filename = Path.basename(url);

  let newname = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijfilenameklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 10) {
    newname += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  filename = newname + "_" + filename;
  const path = Path.resolve(__dirname, "../uploads/posts", filename);
  const writer = fs.createWriteStream(path);
  try {
    const response = await Axios({
      url,
      method: "GET",
      responseType: "stream",
    });
    response.data.pipe(writer);
    res.status(201).json({ path: "/uploads/posts/" + filename });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
module.exports = {
  CreateAttachment,
  Resize,
  downloadFromUrl,
};
