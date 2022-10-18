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
const cartRoutes = require("../server/src/routes/cartRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const shopRoutes = require("./src/routes/shopRoutes");
const reviewRoutes = require("./src/routes/reviewRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const alertRoutes = require('./src/routes/alertRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(logger("dev"));

app.use(setHeader);

dotenv.config(); 

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/reviews", reviewRoutes);
app.use("/users", loginRoutes);  
app.use("/checkout", orderRoutes);
app.use("/cart", cartRoutes);
app.use("/alert", alertRoutes);
app.use(errorHandler);

module.exports = app;
