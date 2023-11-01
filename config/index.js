const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
module.exports = {
  server: {
    PORT: process.env.PORT || 4000,
  },
  mongoDB: {
    database: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_USERNAME,
    password: process.env.MONGODB_PASSWORD,
  },
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,
};
