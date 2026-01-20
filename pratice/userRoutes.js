const express = require("express");
const router = express.Router();
const userController = require("../server/controllers/userController");

router.get("/status", userController.getStatus);
router.get("/search/:query", userController.searchusers);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
