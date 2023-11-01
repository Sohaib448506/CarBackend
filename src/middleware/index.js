const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = require("../../config");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, TOKEN_SECRET_KEY); // Verify the token with your secret key
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authenticateUser;
