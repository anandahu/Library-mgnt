# bookModel.js - Book Database Schema

## Purpose
Defines the **data structure** for books in the library inventory. This schema specifies book information and tracks individual copies through `subIds`.

---

## Complete Code with Explanations

```javascript
const mongoose = require("mongoose");
```
**Line Explanation:**
- Imports Mongoose ODM for MongoDB interaction
- **Why?** Required to create schemas and models

---

```javascript
const bookSchema = new mongoose.Schema(
  {
```
**Line Explanation:**
- Creates a new schema definition
- Opening brace starts the field definitions
- **Why?** Schema defines what data a book document can contain

---

```javascript
    bookName: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
    },
```
**Field Explanation:**

| Property | Value | Meaning |
|----------|-------|---------|
| `type` | `String` | Text data |
| `required` | `[true, "message"]` | Cannot be empty |
| `trim` | `true` | Remove whitespace from start/end |

**Why?** `trim` prevents "  Harry Potter  " from being different than "Harry Potter"

---

```javascript
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
```
**Field Explanation:**
- Author's name is mandatory
- **Why?** Essential for identifying books, especially with same titles

---

```javascript
    publication: {
      type: String,
      trim: true,
    },
```
**Field Explanation:**
- **Not required** - Optional field
- Publisher name (e.g., "Penguin Books")
- **Why?** Additional metadata, not critical for basic functionality

---

```javascript
    year: {
      type: Number,
    },
```
**Field Explanation:**
- Publication year
- **Why?** Helps distinguish between editions (e.g., 1997 vs 2020 edition)

---

```javascript
    subIds: [{
      type: String,
      trim: true
    }]
```
**Field Explanation:**

| Syntax | Meaning |
|--------|---------|
| `[{...}]` | Array of objects |
| `type: String` | Each array element is a string |

**Why?** 
- A library may have multiple copies of the same book
- `subIds: ["Copy1", "Copy2", "A101", "A102"]`
- Each copy can be issued independently

**Example Use:**
```javascript
book.subIds = ["A1", "A2", "A3"];  // 3 copies of this book
```

---

```javascript
  },
  { timestamps: true }
);
```
**Options Explanation:**
- Automatically adds `createdAt` and `updatedAt` fields
- **Why?** Track when books were added to the system

---

```javascript
module.exports = mongoose.model("Book", bookSchema);
```
**Line Explanation:**
- Creates "Book" model from schema
- Collection name in MongoDB will be `books` (pluralized, lowercase)
- **Why?** Export allows controllers to use this model for database operations

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `Schema` | Blueprint for documents |
| `String` | Text data type |
| `Number` | Numeric data type |
| `required` | Must have a value |
| `trim` | Remove leading/trailing spaces |
| `[{...}]` | Array of subdocuments |
| `timestamps` | Auto-add date tracking |

---

## Document Example

```json
{
  "_id": "507f1f77bcf86cd799439044",
  "bookName": "Introduction to Algorithms",
  "author": "Thomas H. Cormen",
  "publication": "MIT Press",
  "year": 2009,
  "subIds": ["ALGO-001", "ALGO-002", "ALGO-003"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-10T00:00:00.000Z"
}
```

---

## SubIds Concept Explained

### Why Track Individual Copies?

| Scenario | Without SubIds | With SubIds |
|----------|----------------|-------------|
| "Who has copy A1?" | Can't tell | Easy lookup |
| "Is copy A2 damaged?" | Can't track | Can remove just A2 |
| "How many copies available?" | Count = 1 always | Count = 3, 2 issued, 1 free |

### SubIds Workflow:

1. **Add Book:** 
   ```
   bookName: "Physics", subIds: ["P1", "P2"]
   ```

2. **Issue Book:**
   ```
   Assignment: { bookId: "...", subId: "P1" }
   ```

3. **Check Availability:**
   - P1: Issued ❌
   - P2: Available ✅

---

## Relationship to Assignments

```
Book (subIds: ["A1", "A2", "A3"])
         │
         ├── Assignment 1 uses subId "A1" → Student John
         ├── Assignment 2 uses subId "A2" → Student Jane  
         └── "A3" is available
```
