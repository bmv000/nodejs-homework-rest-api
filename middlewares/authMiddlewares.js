const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const { findUserById } = require("../models/usersModels");

const checkAuth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await findUserById(id);

    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = checkAuth;
