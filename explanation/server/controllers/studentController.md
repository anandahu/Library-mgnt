# studentController.js - Student Business Logic

## Purpose
Contains all **business logic** for student operations including CRUD operations.

---

## Complete Code with Explanations

### Import

```javascript
const Student = require("../models/studentModel");
```
**Line Explanation:**
- Imports Student model from models folder
- **Why?** Required to perform database operations on students

---

### Get All Students

```javascript
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      results: students.length,
      data: {
        students,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
```
**Line Explanation:**
- `Student.find()` - Retrieve all student documents
- `.sort({ createdAt: -1 })` - Newest students first
- Response includes `status`, `results` count, and `data`
- **Why?** Provides list of all students to frontend

---

### Get Single Student

```javascript
exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "Student not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
```
**Line Explanation:**
- `findById(req.params.id)` - Find student by their `_id`
- `!student` - Check if student exists
- Early return with 404 if not found
- **Why?** View details of specific student

---

### Create Student

```javascript
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        student: newStudent,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
```
**Line Explanation:**
- `Student.create(req.body)` - Create new student with form data
- Mongoose validates against schema
- `status(201)` - HTTP Created
- `status(400)` - Bad Request (validation errors)
- **Why?** Add new students to the system

**Expected req.body:**
```json
{
  "name": "Rahul Sharma",
  "department": "Computer Science",
  "rollNo": "CS2024001",
  "phoneNumber": "+91-9876543210",
  "email": "rahul@college.edu"
}
```

---

### Update Student

```javascript
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "Student not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        student,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
```
**Line Explanation:**

| Option | Meaning |
|--------|---------|
| `new: true` | Return updated document |
| `runValidators: true` | Apply schema validations |

**Why?** Modify existing student information (name change, new phone, etc.)

---

### Delete Student

```javascript
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({
        status: "fail",
        message: "Student not found",
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
```
**Line Explanation:**
- `findByIdAndDelete()` - Remove student document
- Check if student existed before deletion
- `status(204)` - No Content (successful delete)
- **Why?** Remove students who have left

⚠️ **Warning:** Should verify student has no active book assignments before deletion!

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `exports.` | Export function |
| `async/await` | Handle promises |
| `try/catch` | Error handling |
| `req.params.id` | URL parameter |
| `req.body` | Request body |
| `find()` | Get all documents |
| `findById()` | Get by ID |
| `create()` | Create document |
| `findByIdAndUpdate()` | Update by ID |
| `findByIdAndDelete()` | Delete by ID |

---

## Response Structure Pattern

All responses follow a consistent structure:

**Success:**
```json
{
  "status": "success",
  "results": 10,
  "data": {
    "students": [...]
  }
}
```

**Failure:**
```json
{
  "status": "fail",
  "message": "Error description"
}
```

**Why?** Frontend can easily check `status` field to determine success/failure.

---

## API Endpoints Handled

| Method | Endpoint | Controller Function |
|--------|----------|---------------------|
| GET | /api/v1/students | getAllStudents |
| GET | /api/v1/students/:id | getStudent |
| POST | /api/v1/students | createStudent |
| PATCH | /api/v1/students/:id | updateStudent |
| DELETE | /api/v1/students/:id | deleteStudent |
