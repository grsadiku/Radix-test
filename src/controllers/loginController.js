const userService = require("../services/userService");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).send({ status: "FAILED", data:   "One of the following keys is missing or is empty in request body: 'email', 'password'", });
      }

    const user = await userService.getOneUserByEmail(email);
 
    if(!user)
    {
        res.send({ status: "FAILED", data: "User not found" });
        return;
    } 

    if(!(await bcrypt.compare(password, user.password)))
    {
        res.send({ status: "FAILED", data: "Password is not valid" });
        return;  
    }

    const token = jwt.sign(
        { user_id: user._id, email, role: user.role, company: user.company },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      await userService.updateOneUser(user._id, user);

      res.status(200).json({ status: "OK", data: user });

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


module.exports = {
    login
};