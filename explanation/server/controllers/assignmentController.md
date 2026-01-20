# assignmentController.js - Assignment Business Logic

## Purpose
Contains all **business logic** for assignment operations. Controllers handle the "how" of data processing between routes and database.

---

## Complete Code with Explanations

### Import

```javascript
const Assignment = require("../models/assignmentModel");
```
**Line Explanation:**
- Imports the Assignment model
- `../` - Go up one directory (from controllers to server)
- **Why?** Need the model to perform database operations

---

### Create Assignment

```javascript
exports.createAssignment = async (req, res) => {
```
**Line Explanation:**
- `exports.` - Makes function available for import in other files
- `async` - Enables use of `await` inside function
- `(req, res)` - Express request and response objects
- **Why?** Database operations are asynchronous

---

```javascript
  try {
    if (!req.body.subId) {
      return res
        .status(400)
        .json({ message: "Book Copy ID (subId) is required" });
    }
```
**Line Explanation:**
- `try` - Start error handling block
- `!req.body.subId` - Check if subId is missing/empty
- `return` - Exit function early
- `res.status(400)` - HTTP 400 Bad Request
- `.json()` - Send JSON response
- **Why?** Validate input before database operation

---

```javascript
    const existingAssignment = await Assignment.findOne({
      bookId: req.body.bookId,
      subId: req.body.subId,
      status: "Issued",
    });

    if (existingAssignment) {
      return res
        .status(400)
        .json({ message: "This specific book copy is already issued." });
    }
```
**Line Explanation:**
- `await` - Wait for database query to complete
- `Assignment.findOne()` - Find single matching document
- `{ bookId, subId, status }` - Query criteria (AND logic)
- **Why?** Prevent issuing the same copy twice

**Logic Flow:**
1. Look for an assignment where:
   - Same book
   - Same copy ID
   - Status is "Issued" (not returned)
2. If found → Block the new assignment
3. If not found → Proceed to create

---

```javascript
    const newAssignment = await Assignment.create(req.body);
```
**Line Explanation:**
- `Assignment.create()` - Create and save new document
- `req.body` - Contains form data from client
- **Why?** Mongoose validates against schema before saving

---

```javascript
    const populatedAssignment = await Assignment.findById(newAssignment._id)
      .populate("studentId")
      .populate("bookId");

    res.status(201).json(populatedAssignment);
```
**Line Explanation:**
- `findById()` - Find document by its `_id`
- `.populate("studentId")` - Replace student ID with full student object
- `.populate("bookId")` - Replace book ID with full book object
- `status(201)` - HTTP 201 Created
- **Why?** Client needs full objects, not just IDs

**Before populate:**
```json
{ "studentId": "507f1f77bcf86cd799439011" }
```

**After populate:**
```json
{ "studentId": { "_id": "...", "name": "Rahul", "rollNo": "CS001" } }
```

---

```javascript
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
```
**Line Explanation:**
- `catch` - Handle any errors from try block
- `error.message` - Human-readable error text
- **Why?** Graceful error handling instead of server crash

---

### Get All Assignments

```javascript
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("bookId")
      .populate("studentId")
      .sort({ dateOfIssue: -1 });
```
**Line Explanation:**
- `Assignment.find()` - Get all documents (no filter = all)
- `.sort({ dateOfIssue: -1 })` - Sort by date, newest first
- `-1` = descending, `1` = ascending
- **Why?** Recent assignments appear at top

---

```javascript
    res.status(200).json({
      status: "success",
      results: assignments.length,
      data: {
        assignments,
      },
    });
```
**Line Explanation:**
- Structured response format
- `status: "success"` - Easy to check in frontend
- `results` - Count of items
- **Why?** Consistent API response format

---

### Return Book

```javascript
exports.returnBook = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        returnDate: Date.now(),
        status: "Returned"
      },
      {
        new: true,
        runValidators: true,
      },
    );
```
**Line Explanation:**

| Code | Meaning |
|------|---------|
| `findByIdAndUpdate()` | Find by ID and update in one operation |
| `req.params.id` | ID from URL (e.g., `/assignments/123`) |
| `returnDate: Date.now()` | Set return date to current time |
| `status: "Returned"` | Update status |
| `new: true` | Return updated document (not old one) |
| `runValidators: true` | Apply schema validation to updates |

**Why?** Marks the assignment as returned with timestamp

---

### Update Assignment

```javascript
exports.updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
```
**Line Explanation:**
- `req.body` - New values from client
- **Why?** General-purpose update for any field changes

---

### Delete Assignment

```javascript
exports.deleteAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
```
**Line Explanation:**
- `findByIdAndDelete()` - Find and remove document
- `status(204)` - HTTP 204 No Content (success, but no body)
- **Why?** Permanent removal of assignment record

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `exports.` | Make function available for import |
| `async/await` | Handle asynchronous operations |
| `try/catch` | Error handling |
| `req.body` | Request body (POST/PUT data) |
| `req.params` | URL parameters |
| `res.status()` | Set HTTP status code |
| `res.json()` | Send JSON response |
| `find()` | Get all matching documents |
| `findOne()` | Get first matching document |
| `findById()` | Get document by ID |
| `create()` | Create new document |
| `findByIdAndUpdate()` | Update by ID |
| `findByIdAndDelete()` | Delete by ID |
| `populate()` | Replace ID with full document |
| `sort()` | Order results |

---

## HTTP Status Codes Used

| Code | Meaning | When Used |
|------|---------|-----------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error |
| 404 | Not Found | Resource doesn't exist |

---

## Request Flow Diagram

```
Client Request
      │
      ▼
   Route
      │
      ▼
 Controller ◄── You are here
      │
      ▼
   Model
      │
      ▼
  MongoDB
      │
      ▼
  Response
```
