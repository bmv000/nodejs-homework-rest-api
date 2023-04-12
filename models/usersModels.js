const User = require("./schema/userSchema");
const port = process.env.PORT || 3000;
const sendEmail = require("../utils/sendEmail");

const registerUser = async (newBody) => {
  const newUser = User.create(newBody);

  const { email, verificationToken } = newBody;
  const mailMessage = {
    to: email,
    subject: "Thank you for registration",
    text: "Confirm your email",
    html: `<a target='_blank' href='http://localhost:${port}/api/users/verify/${verificationToken}'>Confirm your email</a>`,
  };

  await sendEmail(mailMessage);

  return newUser;
};
const findUser = async (email) => {
  return await User.findOne(email);
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserByIdAndUpdate = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const findUserByIdAndUpdateAvatar = async (_id, avatarURL) => {
  return await User.findByIdAndUpdate(_id, { avatarURL });
};

const verificationUserToken = async (verificationToken) => {
  return await User.findOne(verificationToken);
};

const updateUserVerifi = async (id, data) => {
  return await User.findByIdAndUpdate(id, data);
};

const resendingEmailForVerify = async (id) => {
  const user = await User.findById(id);

  const { email, verificationToken } = user;
  const mailMessage = {
    to: email,
    subject: "Thank you for registration",
    text: "Confirm your email",
    html: `<a target='_blank' href='http://localhost:${port}/api/users/verify/${verificationToken}'>Confirm your email</a>`,
  };

  await sendEmail(mailMessage);
};

const findVerifyUser = async (email, verify) => {
  return await User.findOne(email, verify);
};

const findUserByIdAndUpdateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

module.exports = {
  registerUser,
  findUser,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndUpdateAvatar,
  verificationUserToken,
  updateUserVerifi,
  resendingEmailForVerify,
  findVerifyUser,
  findUserByIdAndUpdateToken,
};
