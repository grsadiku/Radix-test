const userService = require("../services/userService");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
  
    const allUsers = req.user.role == "Admin" ? await userService.getAllUsers() : await userService.getAllUsersByCompany(req.user.company);
 
    res.send({ status: "OK", data: allUsers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneUser = async (req, res) => {
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
    const user = await userService.getOneUser(id);
    res.send({ status: "OK", data: user });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewUser = async (req, res) => {
  const { firstName, lastName , role, company, email, password } = req.body;

  if (!(firstName && lastName && role && company && email)) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the keys is missing or is empty in request body",
      },
    });
    return;
  }

  if(role == "Admin" && company != 'Radix')
  {
    return res.status(409).send({
      status: "FAILED",
      data: {
        error:
          "Admin should have company Radix",
      },
    });
  }

  if(req.user.role != "Admin" && company != req.user.company)
  {
    return res.status(409).send({
      status: "FAILED",
      data: {
        error:
          "User can't add a user for another company",
      },
    });
  }

  if (userService.checkEmailExists(email)) {
    return res.status(409).send({
      status: "FAILED",
      data: {
        error:
          "Email Already Exists",
      },
    });
  }

  encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    company: company,
    role: role,
    password: encryptedPassword,
  };
  try {
    const createdUser = await userService.createNewUser(newUser);
    console.log("1", createdUser);
    const token = jwt.sign(
      { user_id: createdUser._id, email, role: createdUser.role, company: createdUser.company },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    createdUser.token = token;
    console.log(createdUser);

    updatedUser = await userService.updateOneUser(createdUser._id, createdUser);

    res.status(201).send({ status: "OK", data: createdUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneUser = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
  }

  try {

  if(req.user.role != "Admin" && body.company != req.user.company)
  {
    return res.status(409).send({
      status: "FAILED",
      data: {
        error:
          "User can't update a user for another company",
      },
    });
  }
    const updatedUser = await userService.updateOneUser(id, body);
    res.send({ status: "OK", data: updatedUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneUser = async (req, res) => {
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
    var currentUser = userService.getOneUser(id);
    await userService.deleteOneUser(id);
    res.status(204).send({ status: "OK", user: currentUser });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};