var jwt = require("jsonwebtoken");
const roleService = require("../services/roleService");


const config = process.env;

const verifyToken = (privilege) => {
   return async (req, res, next) => {
        const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
       
      if (!token) {
        return res.status(403).send("A token is required for authentication");
      }

      try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        if(!await roleService.checkRolePrivileges(decoded.role, privilege))
        {
          return res.status(403).send({ status: "FAILED", data: "User doesn't have privilege to this view" });
        }

        req.user = decoded;
      } catch (err) {
        console.log(err)
        return res.status(401).send({ status: "FAILED", data: "Invalid Token" });
      }
      return next();
    }
 
};

module.exports = verifyToken;