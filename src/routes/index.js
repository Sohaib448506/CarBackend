const fs = require("fs");
const express = require("express");
const router = express.Router();

const routesPath = `${__dirname}/`;

// Looping routes path and loading every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((dir) => {
  return dir !== "index.js"
    ? router.use(`/${dir.split(".js")[0]}`, require(`./${dir}`))
    : "";
});

// Handling 404 error
router.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: "URL NOT FOUND",
    },
  });
});

module.exports = router;
