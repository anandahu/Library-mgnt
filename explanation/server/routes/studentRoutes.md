# studentRoutes.js - Student URL Routing

## Purpose
Defines the **URL endpoints** for student-related operations.

---

## Complete Code with Explanations

```javascript
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
```
**Line Explanation:**
- Standard router setup with Express
- Import controller for handler functions
- **Why?** Connect URLs to business logic

---

```javascript
router.get("/", studentController.getAllStudents);
```
**Full URL:** `GET /api/v1/students`
- Retrieve all student records
- **Why?** Display student list in UI

---

```javascript
router.get("/:id", studentController.getStudent);
```
**Full URL:** `GET /api/v1/students/:id`
- Get single student details
- **Why?** View full student information

---

```javascript
router.post("/", studentController.createStudent);
```
**Full URL:** `POST /api/v1/students`
- Register new student
- **Why?** Add students to system

---

```javascript
router.patch("/:id", studentController.updateStudent);
```
**Full URL:** `PATCH /api/v1/students/:id`
- Update student information
- **Why?** Correct errors, update contact info

---

```javascript
router.delete("/:id", studentController.deleteStudent);
```
**Full URL:** `DELETE /api/v1/students/:id`
- Remove student record
- **Why?** Student left institution

---

```javascript
module.exports = router;
```
**Line Explanation:**
- Export router for mounting in app.js
- **Why?** Modular route management

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `express.Router()` | Create router instance |
| `router.get()` | Handle GET |
| `router.post()` | Handle POST |
| `router.patch()` | Handle PATCH |
| `router.delete()` | Handle DELETE |
| `module.exports` | Export module |

---

## Complete Route Table

| Method | Full URL | Controller | Purpose |
|--------|----------|------------|---------|
| GET | /api/v1/students | getAllStudents | List all |
| GET | /api/v1/students/:id | getStudent | Get one |
| POST | /api/v1/students | createStudent | Add new |
| PATCH | /api/v1/students/:id | updateStudent | Edit |
| DELETE | /api/v1/students/:id | deleteStudent | Remove |

---

## How Routes Connect to Controllers

```
Client Request: GET /api/v1/students/abc123
        │
        ▼
app.js: app.use("/api/v1/students", studentRoutes)
        │
        ▼
studentRoutes.js: router.get("/:id", studentController.getStudent)
        │
        ▼
studentController.js: exports.getStudent = async (req, res) => { ... }
        │
        ▼
Database query & response
```

---

## URL Parameter Usage

```javascript
// URL: GET /api/v1/students/507f1f77bcf86cd799439011

// In route:
router.get("/:id", ...)

// In controller:
req.params.id  // "507f1f77bcf86cd799439011"

// Used in:
Student.findById(req.params.id)
```
