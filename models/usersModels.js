const User = require("./schema/userSchema");

const registerUser = async (newBody) => {
  return await User.create(newBody);
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

module.exports = {
  registerUser,
  findUser,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndUpdateAvatar,
};