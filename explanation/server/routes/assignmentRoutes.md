# assignmentRoutes.js - Assignment URL Routing

## Purpose
Defines the **URL endpoints** for assignment-related operations and connects them to controller functions.

---

## Complete Code with Explanations

```javascript
const express = require("express");
```
**Line Explanation:**
- Import Express framework
- **Why?** Need Express to create router

---

```javascript
const router = express.Router();
```
**Line Explanation:**
- `express.Router()` - Creates a modular route handler
- **Why?** Allows grouping related routes together

---

```javascript
const assignmentController = require("../controllers/assignmentController");
```
**Line Explanation:**
- Import controller with all handler functions
- **Why?** Routes delegate logic to controllers

---

```javascript
router.get("/", assignmentController.getAllAssignments);
```
**Line Explanation:**
- `router.get("/")` - Handle GET requests to base path
- When mounted at `/api/v1/assignments`, this handles `GET /api/v1/assignments`
- `getAllAssignments` - Controller function to execute
- **Why?** List all assignments

---

```javascript
router.post("/", assignmentController.createAssignment);
```
**Line Explanation:**
- `router.post("/")` - Handle POST requests
- `POST /api/v1/assignments` → Create new assignment
- **Why?** Issue a book to a student

---

```javascript
router.put("/:id/return", assignmentController.returnBook);
```
**Line Explanation:**
- `/:id` - URL parameter (dynamic value)
- `/return` - Action specifier
- `PUT /api/v1/assignments/12345/return` → Mark assignment 12345 as returned
- **Why?** Special action to return a book

**Note:** Using `/return` as a sub-route is a RESTful way to handle actions.

---

```javascript
router.put("/:id", assignmentController.updateAssignment);
```
**Line Explanation:**
- `PUT /api/v1/assignments/:id` → Update assignment
- **Why?** Modify assignment details

---

```javascript
router.delete("/:id", assignmentController.deleteAssignment);
```
**Line Explanation:**
- `DELETE /api/v1/assignments/:id` → Delete assignment
- **Why?** Remove assignment record

---

```javascript
module.exports = router;
```
**Line Explanation:**
- Export the configured router
- **Why?** `app.js` imports and mounts this router

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `express.Router()` | Create modular routes |
| `router.get()` | Handle GET requests |
| `router.post()` | Handle POST requests |
| `router.put()` | Handle PUT requests |
| `router.delete()` | Handle DELETE requests |
| `/:id` | URL parameter |
| `module.exports` | Export module |

---

## Route Parameters

URL parameters are accessible via `req.params`:

```javascript
// Route: PUT /api/v1/assignments/:id/return
// Request: PUT /api/v1/assignments/abc123/return

req.params.id  // "abc123"
```

---

## HTTP Methods Explained

| Method | Purpose | Typical Use |
|--------|---------|-------------|
| GET | Read data | List, View details |
| POST | Create data | Add new record |
| PUT | Update data | Modify existing (full replace) |
| PATCH | Partial update | Modify some fields |
| DELETE | Remove data | Delete record |

---

## Complete Route Table

| Method | Full URL | Controller | Purpose |
|--------|----------|------------|---------|
| GET | /api/v1/assignments | getAllAssignments | List all |
| POST | /api/v1/assignments | createAssignment | Issue book |
| PUT | /api/v1/assignments/:id | updateAssignment | Edit |
| PUT | /api/v1/assignments/:id/return | returnBook | Mark returned |
| DELETE | /api/v1/assignments/:id | deleteAssignment | Delete |

---

## Route Matching Order

⚠️ **Order matters!** More specific routes must come before general ones.

```javascript
// ✅ Correct order:
router.put("/:id/return", ...);  // Specific first
router.put("/:id", ...);         // General second

// ❌ Wrong order:
router.put("/:id", ...);         // This catches EVERYTHING
router.put("/:id/return", ...);  // Never reached!
```

**Why?** Express matches routes top-to-bottom. First match wins.
