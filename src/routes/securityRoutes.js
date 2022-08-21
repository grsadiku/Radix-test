const express = require("express");
const {
    login,
} = require("../controllers/loginController");
const router = express.Router();

/**
 * @openapi
 * '/api/auth':
 *  post:
 *     tags:
 *     - Login
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: User Email
 *              password:
 *                type: string
 *                default: User Password
 *     responses:
 *      201:
 *        description: Login Success
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
router.post("/login", login);

module.exports = router;