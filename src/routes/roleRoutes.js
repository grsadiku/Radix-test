const express = require("express");
const {
    getAllRoles,
    getOneRole,
    createNewRole,
    checkRolePrivileges,
} = require("../controllers/roleController");
const router = express.Router();
var auth = require("../middlewares/auth");

router.get("/", auth('RoleView'), getAllRoles);
router.get("/:id", auth('RoleView'),getOneRole);
//router.post("/create", auth('RoleMange'),createNewRole);
router.post("/create", createNewRole);
router.patch("/:id", auth('RoleView'),checkRolePrivileges);

module.exports = router;