# assignmentModel.js - Assignment Database Schema

## Purpose
Defines the **data structure** for book assignments in MongoDB. This schema specifies what fields an assignment document can have and their validation rules.

---

## Complete Code with Explanations

```javascript
const mongoose = require("mongoose");
```
**Line Explanation:**
- Imports Mongoose ODM (Object Document Mapper)
- **Why?** Mongoose allows us to define schemas and interact with MongoDB using JavaScript objects

---

```javascript
const assignmentSchema = new mongoose.Schema(
```
**Line Explanation:**
- `new mongoose.Schema()` - Creates a new schema definition
- `assignmentSchema` - Variable storing the schema
- **Why?** Schemas define the structure, types, and validation for documents

---

```javascript
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student ID is required"],
    },
```
**Field Explanation:**

| Property | Value | Meaning |
|----------|-------|---------|
| `type` | `ObjectId` | MongoDB's unique identifier type |
| `ref` | `"Student"` | References the Student collection |
| `required` | `[true, "message"]` | Field is mandatory with custom error message |

**Why?** 
- `ObjectId` links to another document (like a foreign key in SQL)
- `ref` enables `.populate()` to fetch the full student object

---

```javascript
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
```
**Field Explanation:**
- Same pattern as `studentId`
- References the Book collection
- **Why?** Each assignment must link to exactly one book

---

```javascript
    subId: {
      type: String,
      required: [true, "Book Copy ID (Sub-ID) is required"], 
    },
```
**Field Explanation:**

| Property | Value | Meaning |
|----------|-------|---------|
| `type` | `String` | Text data type |
| `required` | `true` | Cannot be empty |

**Why?** Tracks WHICH specific copy of a book is assigned (e.g., "Copy A1", "Copy A2")

---

```javascript
    dateOfIssue: {
      type: Date,
      required: [true, "Date of issue is required"],
      default: Date.now,
    },
```
**Field Explanation:**

| Property | Value | Meaning |
|----------|-------|---------|
| `type` | `Date` | Date/time data type |
| `default` | `Date.now` | Auto-sets to current date if not provided |

**Why?** Records when the book was issued to the student

---

```javascript
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
```
**Field Explanation:**
- The date by which the book must be returned
- **Why?** Used to calculate fines for overdue books

---

```javascript
    returnDate: {
      type: Date,
    },
```
**Field Explanation:**
- **Not required** - Only set when book is returned
- `null` means book is still with student
- **Why?** Tracks whether and when the book was returned

---

```javascript
    status: {
      type: String,
      enum: ["Issued", "Returned", "Overdue"],
      default: "Issued",
    },
```
**Field Explanation:**

| Property | Value | Meaning |
|----------|-------|---------|
| `enum` | `[array]` | Only these values are allowed |
| `default` | `"Issued"` | Initial status for new assignments |

**Why?** Easy filtering (show only issued books, show only returned, etc.)

---

```javascript
    fine: {
      type: Number,
      default: 0,
    },
```
**Field Explanation:**
- Stores calculated fine amount in rupees
- Defaults to 0 (no fine initially)
- **Why?** Can store final fine when book is returned

---

```javascript
  },
  { timestamps: true }
);
```
**Options Explanation:**
- `timestamps: true` - Mongoose automatically adds:
  - `createdAt` - When document was created
  - `updatedAt` - When document was last modified
- **Why?** Useful for auditing and sorting

---

```javascript
module.exports = mongoose.model("Assignment", assignmentSchema);
```
**Line Explanation:**
- `mongoose.model()` - Creates a model from the schema
- `"Assignment"` - Model name (MongoDB collection will be `assignments`)
- `module.exports` - Exports for use in other files
- **Why?** Controllers use this model to perform CRUD operations

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `Schema` | Blueprint for documents |
| `ObjectId` | MongoDB's unique identifier |
| `ref` | Reference to another collection |
| `required` | Field must have a value |
| `default` | Value if not provided |
| `enum` | Allowed values list |
| `timestamps` | Auto-add createdAt/updatedAt |
| `model()` | Create model from schema |

---

## Document Example

When saved to MongoDB:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "studentId": "507f1f77bcf86cd799439022",
  "bookId": "507f1f77bcf86cd799439033",
  "subId": "Copy A1",
  "dateOfIssue": "2024-01-15T00:00:00.000Z",
  "dueDate": "2024-01-25T00:00:00.000Z",
  "returnDate": null,
  "status": "Issued",
  "fine": 0,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## Relationship Diagram

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   Student   │       │  Assignment  │       │    Book     │
├─────────────┤       ├──────────────┤       ├─────────────┤
│ _id         │◄──────│ studentId    │       │ _id         │
│ name        │       │ bookId       │──────►│ bookName    │
│ rollNo      │       │ subId        │       │ subIds[]    │
│ department  │       │ dateOfIssue  │       │ author      │
└─────────────┘       │ dueDate      │       └─────────────┘
                      │ status       │
                      └──────────────┘
```
