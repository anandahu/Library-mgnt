const Assignment = require("../models/assignmentModel");

exports.createAssignment = async (req, res) => {
  try {
    // Validate that subId is present in body
    if (!req.body.subId) {
      return res
        .status(400)
        .json({ message: "Book Copy ID (subId) is required" });
    }

    // Check if this specific copy is already issued and not returned
    const existingAssignment = await Assignment.findOne({
      bookId: req.body.bookId,
      subId: req.body.subId,
      status: "Issued",
    });

    if (existingAssignment) {
      return res
        .status(400)
        .json({ message: "This specific book copy is already issued." });
    }

    const newAssignment = await Assignment.create(req.body);
    const populatedAssignment = await Assignment.findById(newAssignment._id)
      .populate("studentId")
      .populate("bookId");

    res.status(201).json(populatedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    // Sort by most recently taken
    const assignments = await Assignment.find().sort({ dateTaken: -1 });
    res.status(200).json({
      status: "success",
      results: assignments.length,
      data: {
        assignments,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { dateReceivedBack: Date.now() },
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: "success",
      data: {
        assignment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    res.status(200).json({
      status: "success",
      data: {
        assignment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
