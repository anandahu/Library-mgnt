const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
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
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
