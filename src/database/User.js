const User = require("../models/User");

const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

const getAllUsersByCompany = async (company) => {
  const users = await User.find({company: company});
  return users;
};

const getOneUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return;
  }
  return user;
};

const getOneUserByEmail = async (email) => {
  const user = await User.findOne({email: email});
  if (!user) {
    return;
  }
  return user;
};

const checkEmailExists = async (email) => {
  const user = await User.findOne({email: email});
  if (!user) {
    return true;
  }
  return false;
};

const createNewUser = async (newUser) => {
  const isAlreadyAdded = await User.findOne({ email: newUser.email });
  if (isAlreadyAdded) {
    return;
  }
  var user = await new User(newUser);
  user.save();
  return user;
};

const updateOneUser = async (id, changes) => {
  const user = await User.findByIdAndUpdate(id, changes);

  if (!user) {
    return;
  }

  return user;
};

const deleteOneUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    return;
  }
  user.delete();
};

module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  checkEmailExists,
  getOneUserByEmail,
  getAllUsersByCompany
};