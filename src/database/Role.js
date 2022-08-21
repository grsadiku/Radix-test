const Role = require("../models/Role");

const getAllRoles = async () => {
  const roles = await Role.find({});
  return roles;
};

const getOneRole = async (id) => {
  const role = await Role.findById(id);
  if (!user) {
    return;
  }
  return role;
};


const checkRolePrivileges = async (title, privilege) => {
  const role = await Role.findOne({title: title});
  if (!role) {
    return false;
  }

  if(role.privileges.indexOf(privilege) > -1)
    return true;

  return false;
};

const createNewRole = async (role) => {
  const isAlreadyAdded = await Role.findOne({ title: role.title });
  if (isAlreadyAdded) {
    return;
  }
  var role = await new Role(role);
  role.save();
  return role;
};


module.exports = {
  getAllRoles,
  getOneRole,
  checkRolePrivileges,
  createNewRole,
};