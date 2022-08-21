const express = require("express");
const {
  getAllUsers,
  createNewUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
} = require("../controllers/userController");
const router = express.Router();
var auth = require("../middlewares/auth");
/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Return all users based on role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                    type: array 
 *                    items: 
 *                      type: object
 */
router.get("/", auth('UserView'), getAllUsers);


/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Return specific users based on role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   properties:
 *                      firstName: string
 *                      lastName: string
 *                      role: string
 *                      company: sring
 *                      password: string
 */
router.get("/:id", auth('UserView'), getOneUser);

/**
 * @openapi
 * '/api/users/create':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                    properties:
 *                      firstName: string
 *                      lastName: string
 *                      role: string
 *                      company: sring
 *                      password: string
 */
router.post("/create", auth('UserManage'), createNewUser);

/**
 * @openapi
 * '/api/users/{id}':
 *  patch:
 *     tags:
 *     - Users
 *     summary: Modify a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 */
router.patch("/:id", auth('UserManage'), updateOneUser);

/**
 * @openapi
 * '/api/users/{id}':
 *  delete:
 *     tags:
 *     - Users
 *     summary: Remove user by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the user
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
router.delete("/:id", auth('UserManage'), deleteOneUser);

module.exports = router;