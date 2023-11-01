const mongoose = require("mongoose");
const { mongoDB } = require("../../config");

mongoose
  .connect(
    `mongodb+srv://${mongoDB.username}:${mongoDB.password}@${mongoDB.database}.sziwc5y.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("Cannot Connect To Mongo Database!", error);
  });

const UsersModel = require("./Users");
const CarModel = require("./Car");

module.exports = {
  UsersModel,
  CarModel,
};
