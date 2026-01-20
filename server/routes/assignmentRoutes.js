const express = require("express");
const assignmentController = require("../controllers/assignmentController");

const router = express.Router();

router
    .route("/")
    .get(assignmentController.getAllAssignments)
    .post(assignmentController.createAssignment);

router
    .route("/:id")
    .put(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

router
    .route("/:id/return")
    .put(assignmentController.returnBook);

module.exports = router;
