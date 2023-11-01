const morganLogger = require("morgan");
const cors = require("cors");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const { server } = require("./config/index");

app.use(
  cors({
    origin: "*",
  })
);
app.use(morganLogger("dev"));

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/apis", require("./src/routes"));

app.listen(server.PORT, (err) => {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", server.PORT);
});
