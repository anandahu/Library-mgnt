const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    rollNo: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    bookName: {
      type: String,
      required: [true, "Book name is required"],

      trim: true,
    },
    bookId: {
      type: String,
      required: [true, "Book ID is required"],
      unique: true,
      trim: true,
    },
    dateTaken: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dateReceivedBack: {
      type: Date,
      default: null,
    },
    Fine: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
