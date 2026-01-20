# studentModel.js - Student Database Schema

## Purpose
Defines the **data structure** for students who can borrow books from the library.

---

## Complete Code with Explanations

```javascript
const mongoose = require("mongoose");
```
**Line Explanation:**
- Imports Mongoose for MongoDB operations
- **Why?** Required to define schemas and models

---

```javascript
const studentSchema = new mongoose.Schema(
  {
```
**Line Explanation:**
- Creates new schema for student documents
- **Why?** Defines structure and validation rules

---

```javascript
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
```
**Field Explanation:**

| Property | Value | Meaning |
|----------|-------|---------|
| `type` | `String` | Text data |
| `required` | `true` | Cannot be empty |
| `trim` | `true` | Remove extra spaces |

**Why?** Student's full name for identification

---

```javascript
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
```
**Field Explanation:**
- Student's department (e.g., "Computer Science", "Mechanical")
- **Why?** Helps categorize and filter students

---

```javascript
    rollNo: {
      type: String,
      required: [true, "Roll number is required"],
      trim: true,
      unique: true,
    },
```
**Field Explanation:**

| Property | Value | Meaning |
|----------|-------|---------|
| `unique` | `true` | No two students can have same roll number |

**Why?** Roll number is the primary identifier for students in educational institutions

**Note:** `unique` creates a MongoDB index for fast lookups and prevents duplicates

---

```javascript
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
```
**Field Explanation:**
- Contact number stored as String (not Number)
- **Why String?** Phone numbers can have:
  - Leading zeros (0123456789)
  - Country codes (+91)
  - Formatting characters
  
Numbers would lose leading zeros!

---

```javascript
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
```
**Field Explanation:**
- Student's email address
- **Why?** Contact method and potential login identifier

---

```javascript
  },
  { timestamps: true },
);
```
**Options Explanation:**
- Adds `createdAt` and `updatedAt` automatically
- Trailing comma after options object is valid JavaScript
- **Why?** Track when student records are created/modified

---

```javascript
module.exports = mongoose.model("Student", studentSchema);
```
**Line Explanation:**
- Creates "Student" model
- MongoDB collection: `students`
- **Why?** Export for use in controllers

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `Schema` | Document structure definition |
| `String` | Text data type |
| `required` | Field cannot be empty |
| `trim` | Remove whitespace |
| `unique` | No duplicates allowed |
| `timestamps` | Auto date tracking |
| `model()` | Create usable model |

---

## Document Example

```json
{
  "_id": "507f1f77bcf86cd799439055",
  "name": "Rahul Sharma",
  "department": "Computer Science",
  "rollNo": "CS2024001",
  "phoneNumber": "+91-9876543210",
  "email": "rahul.sharma@college.edu",
  "createdAt": "2024-01-05T09:00:00.000Z",
  "updatedAt": "2024-01-05T09:00:00.000Z"
}
```

---

## Validation Behavior

### What happens when validation fails?

```javascript
// This will throw an error:
const student = new Student({
  name: "John",
  // Missing required fields!
});

await student.save();
// Error: "Roll number is required"
```

### Unique constraint:

```javascript
// First save: OK
await Student.create({ rollNo: "CS001", ... });

// Second save with same rollNo: ERROR
await Student.create({ rollNo: "CS001", ... });
// Error: "Duplicate key error"
```

---

## Relationship to Assignments

```
Student Document
├── _id: "507f1f77bcf86cd799439055"
├── name: "Rahul Sharma"
└── rollNo: "CS2024001"
        │
        ▼
Assignment Document
├── studentId: "507f1f77bcf86cd799439055" (references above)
├── bookId: "..."
└── status: "Issued"
```

When we `.populate("studentId")`, the assignment gets the full student object instead of just the ID.
