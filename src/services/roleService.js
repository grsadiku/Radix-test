const { v4: uuid } = require("uuid");
const Role = require("../database/Role");

const getAllRole = async () => {
  const allRoles = await Role.getAllRoles();
  return allRoles;
};

const getOneRole = async (id) => {
  const role = await Role.getOneRole(id);
  return role;
};


const createNewRole = async (newRole) => {
  const roleToInsert = {
    ...newRole,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  const createdRole = await Role.createNewRole(roleToInsert);
  return createdRole;
};


const checkRolePrivileges = async (title, privilege) => {
  var hasPermission = await Role.checkRolePrivileges(title, privilege);
  console.log("has permisson", hasPermission);
  return hasPermission;
};

module.exports = {
    getAllRole,
    getOneRole,
    createNewRole,
    checkRolePrivileges
};