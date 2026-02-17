const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) return res.status(403).send({ message: "Invalid token" });
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).send({ message: "No token provided" });
  }
}

module.exports = verifyToken;
