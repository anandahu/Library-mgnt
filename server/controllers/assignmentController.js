const Assignment = require("../models/assignmentModel");

exports.createAssignment = async (req, res) => {
    try {
        const newAssignment = await Assignment.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                assignment: newAssignment,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
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
            }
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
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,  
            runValidators: true,
        });
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
