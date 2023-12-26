const express = require("express");
const path = require("path");
const logger = require("morgan");
const createError = require("http-errors");
const app = express();
const port = 3003;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { connectAllDb } = require("./utils/connectionManager");
// const connectionResolver = require("./middlewares/connectionResolver");


const routes = require("./routes");
const adminRoutes = require("./adminRoutes");
const { default: helmet } = require("helmet");

app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true,secure:true,sameSite:'none'}));
app.use(helmet());

connectAllDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", port);

app.use("/admin", adminRoutes);



// app.use(connectionResolver.resolve);
app.use("/api", routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});


module.exports = app;
