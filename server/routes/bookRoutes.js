const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.post("/", bookController.createBook);
router.delete("/:id", bookController.deleteBook);

// Routes for Sub-IDs
router.put("/:id/subId", bookController.addSubId); // Add a copy
router.delete("/:id/subId/:subId", bookController.deleteSubId); // Delete a specific copy

module.exports = router;