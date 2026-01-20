# bookController.js - Book Business Logic

## Purpose
Contains all **business logic** for book operations including CRUD and managing book copies (subIds).

---

## Complete Code with Explanations

### Import

```javascript
const Book = require("../models/bookModel");
```
**Line Explanation:**
- Imports the Book model for database operations
- **Why?** Controllers need models to interact with database

---

### Get All Books

```javascript
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```
**Line Explanation:**
- `Book.find()` - Get all book documents
- `.sort({ createdAt: -1 })` - Newest books first
- `status(500)` - Internal Server Error for unexpected failures
- **Why?** Lists all books for the frontend

---

### Create Book

```javascript
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```
**Line Explanation:**
- `Book.create(req.body)` - Create new book with provided data
- `req.body` should contain: `bookName`, `author`, `subIds[]`
- `status(201)` - Created successfully
- `status(400)` - Bad Request (validation failed)
- **Why?** Add new books to library inventory

**Expected req.body:**
```json
{
  "bookName": "Physics 101",
  "author": "Dr. Smith",
  "publication": "Oxford",
  "year": 2020,
  "subIds": ["P101-A", "P101-B", "P101-C"]
}
```

---

### Update Book

```javascript
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
```
**Line Explanation:**

| Code | Meaning |
|------|---------|
| `req.params.id` | Book ID from URL `/books/:id` |
| `req.body` | Updated fields |
| `new: true` | Return updated document |
| `runValidators: true` | Validate updates against schema |
| `!updatedBook` | Check if book exists |
| `status(404)` | Not Found response |

**Why?** Modify existing book details

---

### Delete SubId (Remove Copy)

```javascript
exports.deleteSubId = async (req, res) => {
  try {
    const { id, subId } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $pull: { subIds: subId } },
      { new: true }
    );
```
**Line Explanation:**
- `const { id, subId } = req.params` - Destructuring: extract both params
- `$pull` - MongoDB operator to **remove** item from array
- `{ subIds: subId }` - Remove this specific value from `subIds` array
- **Why?** Remove damaged or lost book copies

**URL Example:** `DELETE /books/12345/subId/CopyA`
- `id` = "12345" (book)
- `subId` = "CopyA" (copy to remove)

**Before $pull:**
```json
{ "subIds": ["CopyA", "CopyB", "CopyC"] }
```

**After $pull:**
```json
{ "subIds": ["CopyB", "CopyC"] }
```

---

### Add SubId (Add Copy)

```javascript
exports.addSubId = async (req, res) => {
  try {
    const { id } = req.params;
    const { subId } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $addToSet: { subIds: subId } },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```
**Line Explanation:**
- `$addToSet` - MongoDB operator to add item **only if not already present**
- Prevents duplicates
- **Why?** Add new copies to existing book

**Difference from $push:**
| Operator | Behavior |
|----------|----------|
| `$push` | Adds item (allows duplicates) |
| `$addToSet` | Adds only if unique |

---

### Delete Book

```javascript
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```
**Line Explanation:**
- `findByIdAndDelete(id)` - Remove book document
- **Why?** Delete books from inventory

⚠️ **Warning:** Should also check if book has active assignments before deletion!

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `exports.` | Make function importable |
| `async/await` | Async operations |
| `try/catch` | Error handling |
| `find()` | Get all documents |
| `create()` | Create document |
| `findByIdAndUpdate()` | Update by ID |
| `findByIdAndDelete()` | Delete by ID |
| `$pull` | Remove from array |
| `$addToSet` | Add unique item to array |
| `req.params` | URL parameters |
| `req.body` | Request body data |

---

## MongoDB Array Operators

| Operator | Purpose | Example |
|----------|---------|---------|
| `$push` | Add to array | `{ $push: { subIds: "new" } }` |
| `$pull` | Remove from array | `{ $pull: { subIds: "old" } }` |
| `$addToSet` | Add unique only | `{ $addToSet: { subIds: "unique" } }` |
| `$pop` | Remove first/last | `{ $pop: { subIds: 1 } }` |

---

## API Endpoints Handled

| Method | Endpoint | Controller Function |
|--------|----------|---------------------|
| GET | /api/v1/books | getAllBooks |
| POST | /api/v1/books | createBook |
| PATCH | /api/v1/books/:id | updateBook |
| DELETE | /api/v1/books/:id | deleteBook |
| PUT | /api/v1/books/:id/subId | addSubId |
| DELETE | /api/v1/books/:id/subId/:subId | deleteSubId |
