const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const clientOption = {
  socketTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open");
});

// If the connection throws an error
mongoose.connection.on("error", err => {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const initAdminDbConnection = DB_URL => {
  try {

    const db = mongoose.createConnection(DB_URL, clientOption);

    db.on(
      "error",
      console.error.bind(
        console,
        "initAdminDbConnection MongoDB Connection Error>> : "
      )
    );
    db.once("open", () => {
      console.log("initAdminDbConnection client MongoDB Connection ok!");

    });
    require("../dbModel/globalMongo/tenant/schema");
    require("../dbModel/globalMongo/admin/schema")
    require("../dbModel/globalMongo/partners/schema")


    // require all schemas !?
    return db;
  } catch (error) {
    console.log("initAdminDbConnection error", error);
  }
};

module.exports = {
  initAdminDbConnection
};
