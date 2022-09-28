const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");

const setHeader = require("../server/src/util/middleware/setHeader");
const errorHandler = require("../server/src/util/middleware/errorHandler");

const app = express();

const adminRoutes = require("./src/routes");
const shopRoutes = require("./src/routes/shopRoutes");
 main

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(logger('dev'));

app.use(setHeader);

dotenv.config();

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorHandler);

module.exports = app;
