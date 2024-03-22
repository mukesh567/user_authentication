const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, resp, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return resp
      .status(401)
      .json({ message: "Unathorized HTTP, Token not provided!" });
  }

  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return resp.status(401).json({ message: "Unathorized , Invalid token" });
  }
};

module.exports = authMiddleware;
