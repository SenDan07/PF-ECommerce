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

<<<<<<< HEAD

const adminRoutes = require("./src/routes/adminRoutes");
const shopRoutes = require("./src/routes/shopRoutes");
const loginRoutes = require('../server/src/routes/loginRoutes');

=======
//const adminRoutes = require("./src/routes");
//const shopRoutes = require("./src/routes");
const loginRoutes = require('../server/src/routes/loginRoutes');
>>>>>>> 1aa44b1765f2e582ffb1bd9c077b118efca012c7

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(logger("dev"));

app.use(setHeader);

dotenv.config();

<<<<<<< HEAD

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use('/users', loginRoutes)

=======
//app.use("/admin", adminRoutes);
//app.use(shopRoutes);
app.use('/users', loginRoutes)
>>>>>>> 1aa44b1765f2e582ffb1bd9c077b118efca012c7

app.use(errorHandler);

module.exports = app;
