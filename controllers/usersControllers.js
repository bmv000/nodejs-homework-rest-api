
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const {
  registerUser,
  findUser,
  findUserByIdAndUpdate,
} = require("../models/usersModels");

const registerUserController = async (req, res, next) => {
  const { password, email, subscription } = req.body;
  const user = await findUser({ email });

  if (user) {
    return res.status(409).json({
      message: "Email in use",
    });
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  try {
    const newUser = await registerUser({
      password: hashPassword,
      email,
      subscription,
    });
    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const loginUserController = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await findUser({ email });

  if (!user) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }

  try {
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await findUserByIdAndUpdate(user._id, token);
    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const logoutUserController = async (req, res, next) => {
  const { _id } = req.user;

  await findUserByIdAndUpdate(_id, null);
  res.status(204).json();
};

const currentUserController = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
     });
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
};
