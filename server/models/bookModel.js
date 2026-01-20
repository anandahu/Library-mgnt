const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    publication: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    // Array to store unique IDs for each physical copy
    subIds: [{
      type: String,
      trim: true
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);