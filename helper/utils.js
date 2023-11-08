let crypto = require("crypto"),
  jwt = require("jsonwebtoken"),
{v4:uuid}= require('uuid');

  const { access_token_expires_in } = require("../config/data");
const logger = require("./logger");

const getHash = function (password) {
  return crypto.createHash("sha1").update(password).digest("base64");
};

let getToken = function (user, secret_key, type) {
  const options = {};
  if (!user.iss) {
    options.issuer = "Genified";
  }

  if (type == "access_token") {
    options.expiresIn = access_token_expires_in;
  }

  delete user.iat;
  let token = jwt.sign(user, secret_key, options);

  logger.info(`User created -> ${JSON.stringify(user)}`);

  return {
    success: true,
    message: "Logged in successfully",
    token: token,
  };
};


let generateManagementToken = () => {
  return jwt.sign(
    {
      access_key: app_access_key,
      type: "management",
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    },
    app_secret,
    {
      algorithm: "HS256",
      expiresIn: "24h",
      jwtid: uuid4(),
    },
  );
};
let decodeToken = function (token) {
  return readfile("config/id_rsa", "base64")
    .then((key_value) => {
      return new Promise(function (resolve, reject) {
        jwt.verify(token, key_value.toString(), function (error, decoded) {
          if (error) {
            return reject({
              success: false,
            });
          } else {
            return resolve({
              success: true,
              data: decoded,
            });
          }
        });
      });
    })
    .catch((error) => {
      throw error;
    });
};
let handleError = (error, source_function, source_file) => {
  let details = new Error().stack.split("\n")[2].trim();

  if (process.env.NODE_ENV == "PROD") {
    sendErrorMail(error, source_file, source_function, details);
  }
  logger.error(
    `Error occured [${source_function}] in file [${source_file}] -> ${error}`,
  );
};

module.exports = {
  getToken,
  getHash,
  decodeToken,
  generateManagementToken,
  handleError,
};
