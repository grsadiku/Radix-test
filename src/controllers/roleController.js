const roleService = require("../services/roleService");


const getAllRoles = async (req, res) => {
  try {
  
    const allRoles = await roleService.getAllRoles();
 
    res.send({ status: "OK", data: allRoles });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneRole = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
  }
  try {
    const role = await roleService.getOneRole(id);
    res.send({ status: "OK", data: role });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewRole = async (req, res) => {
  const { title, privileges } = req.body;

  if (!(title && privileges)) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'email'",
      },
    });
    return;
  }

  const newRole = {
    title: title,
    privileges: privileges
  };

  try {
    const createdRole = await roleService.createNewRole(newRole);

    res.status(201).send({ status: "OK", data: createdRole });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const checkRolePrivileges = async (req, res) => {
    const { title, privilege } = req.body;


  if (!(title && privilege)) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
  }
  try {
    const isOK = await roleService.checkRolePrivileges(title, privilege);
    res.send({ status: "OK", data: isOK });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


module.exports = {
    getAllRoles,
    getOneRole,
    createNewRole,
    checkRolePrivileges,
};