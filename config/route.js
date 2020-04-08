const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/userController");
const taskController = require("../app/controllers/admin/taskController");
const {
  authenticateUser,
  authorizeUser,
} = require("../app/middlewares/authentication");
router.get("/users/list", userController.list);
router.post("/users/register", userController.register);
router.post("/users/login", userController.login);
router.get("/users/account", authenticateUser, userController.account);
router.delete("/users/logout", userController.logout);

router.get("/tasks/list", authenticateUser, taskController.list);
router.post(
  "/tasks/create",
  authenticateUser,
  authorizeUser,
  taskController.create
);
router.put("/tasks/:id", authenticateUser, taskController.update);
router.get("/tasks/:id", authenticateUser, taskController.show);

module.exports = router;
