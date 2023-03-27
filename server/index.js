const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
var cron = require("node-cron");
//
const cors = require("cors");

const port = process.env.PORT; //5000

// We support json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { RunScheduler } = require("../server/controllers/scheduleController");

//to get attachments via url++++++++++++++++++++++++++++++++STARTS
app.use(express.json({ limit: "10mb", extended: true }));
app.use("/uploads", express.static("uploads"));
//to get attachments via url++++++++++++++++++++++++++++++++ENDS

//CORS --Allow cors everywhere
// app.use(cors());
//specific
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN1,
      process.env.CORS_ORIGIN2,
      process.env.CORS_ORIGIN3,
      process.env.CORS_ORIGIN4,
    ], //3000 frontend and 5000backend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const { ValidateToken } = require("./ApiMiddleware");
//
app.get("/", (req, res) => {
  var currentdate = new Date();
  let nz_date_string = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Moscow",
  });
  let date_nz = new Date(nz_date_string);
  let year = date_nz.getFullYear();
  let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
  let date = ("0" + date_nz.getDate()).slice(-2);
  let hours = ("0" + date_nz.getHours()).slice(-2);
  let minutes = ("0" + date_nz.getMinutes()).slice(-2);
  let sch_date = year + "-" + month + "-" + date;
  let sch_time = hours + ":" + minutes;

  const Response = `${sch_date} -- ${sch_time}  <h1>"Hello You are Welcome to MPI App."</h1>
<h2>This is test url to check whether server is working fine on port ${port}</h2>`;

  res.send(Response);
});

//--------------ROUTES-----------------------------------------------------------------------------------------
const userRouter = require("./routes/User");
app.use("/user", userRouter);

const postRouter = require("./routes/Post");
app.use("/post", ValidateToken, postRouter);

//IMAGES--------------------------------------------------------
const imagesRouter = require("./routes/Images");
app.use("/images", ValidateToken, imagesRouter);
//SETTINGS------------------------------------------------------
const configurationRouter = require("./routes/Configuration");
app.use("/configuration", ValidateToken, configurationRouter);

const encodedecodeRouter = require("./routes/EncodeDecode"); //for generating and testing ids
app.use("/encodedecode", ValidateToken, encodedecodeRouter);

const boardsRouter = require("./routes/Boards");
app.use("/board", ValidateToken, boardsRouter);

const pinsRouter = require("./routes/Pins");
app.use("/pin", ValidateToken, pinsRouter);

const attachmentRouter = require("./routes/Attachment");
app.use("/attachment", ValidateToken, attachmentRouter);

const pinterestRouter = require("./routes/Pinterest");
app.use("/pinterest", ValidateToken, pinterestRouter);

const scheduleRouter = require("./routes/Schedule");
app.use("/schedule", ValidateToken, scheduleRouter);

const defaultImageRouter = require("./routes/DefaultImage");
app.use("/default", ValidateToken, defaultImageRouter);

const gptRouter = require("./routes/GPT");
app.use("/gpt", gptRouter);

var run_cron = cron.schedule("*/1 * * * *", () => {
  RunScheduler();
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);

  run_cron;
});
