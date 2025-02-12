const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const router = require("./router/router");
const { attachAuthToken, authMe } = require("./middleware/middleware");
app.use(cookieParser());
app.use("/", attachAuthToken, authMe);
app.use(router);
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
});

app.listen(3005, () => {
  console.log("front open");
});
