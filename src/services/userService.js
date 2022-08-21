const { v4: uuid } = require("uuid");
const User = require("../database/User");

const getAllUsers = async () => {
  const allUsers = await User.getAllUsers();
  return allUsers;
};

const getAllUsersByCompany = async (company) => {
  const allUsers = await User.getAllUsersByCompany(company);
  return allUsers;
};

const getOneUser = async (id) => {
  const user = await User.getOneUser(id);
  return user;
};

const getOneUserByEmail = async (email) => {
  const user = await User.getOneUserByEmail(email);
  return user;
};

const createNewUser = async (newUser) => {
  const userToInsert = {
    ...newUser,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  const createdUser = await User.createNewUser(userToInsert);
  return createdUser;
};

const updateOneUser = async (id, changes) => {
  const updatedUser = await User.updateOneUser(id, changes);
  return updatedUser;
};

const deleteOneUser = async (id) => {
  await User.deleteOneUser(id);
};

const checkEmailExists = async (email) => {
  return await User.checkEmailExists(email);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  checkEmailExists,
  getOneUserByEmail,
  getAllUsersByCompany
};