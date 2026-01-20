const Book = require("../models/bookModel");

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {
    // subIds should be passed as an array of strings from frontend
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific Sub-ID (Damaged Book Copy)
exports.deleteSubId = async (req, res) => {
  try {
    const { id, subId } = req.params; // id is Book _id, subId is the specific copy ID

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $pull: { subIds: subId } }, // Removes the specific subId from the array
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a Sub-ID (New Copy) to existing book
exports.addSubId = async (req, res) => {
  try {
    const { id } = req.params;
    const { subId } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $addToSet: { subIds: subId } }, // Adds subId only if it doesn't exist
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete entire book record
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};