# bookRoutes.js - Book URL Routing

## Purpose
Defines the **URL endpoints** for book-related operations including managing book copies (subIds).

---

## Complete Code with Explanations

```javascript
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
```
**Line Explanation:**
- Standard Express router setup
- Import controller with handler functions
- **Why?** Routes connect URLs to controller logic

---

```javascript
router.get("/", bookController.getAllBooks);
```
**Full URL:** `GET /api/v1/books`
- List all books in the library
- **Why?** Display inventory

---

```javascript
router.post("/", bookController.createBook);
```
**Full URL:** `POST /api/v1/books`
- Add new book to library
- **Why?** Expand inventory

---

```javascript
router.patch("/:id", bookController.updateBook);
```
**Full URL:** `PATCH /api/v1/books/:id`
- Update book details
- **Why?** Correct information, add copies

**PATCH vs PUT:**
| Method | Purpose |
|--------|---------|
| PUT | Replace entire document |
| PATCH | Update specific fields |

---

```javascript
router.delete("/:id", bookController.deleteBook);
```
**Full URL:** `DELETE /api/v1/books/:id`
- Remove entire book from inventory
- **Why?** Book no longer in library

---

```javascript
router.put("/:id/subId", bookController.addSubId);
```
**Full URL:** `PUT /api/v1/books/:id/subId`
- Add new copy ID to book's subIds array
- Request body: `{ "subId": "NewCopy1" }`
- **Why?** Library acquired more copies

---

```javascript
router.delete("/:id/subId/:subId", bookController.deleteSubId);
```
**Full URL:** `DELETE /api/v1/books/:id/subId/:subId`
- Remove specific copy from book
- **Why?** Copy damaged or lost

**URL Example:** `DELETE /api/v1/books/abc123/subId/CopyA`
- Book ID: abc123
- Copy to remove: CopyA

---

```javascript
module.exports = router;
```
**Line Explanation:**
- Export router for use in app.js
- **Why?** Must export to mount in main app

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `router.get()` | GET request handler |
| `router.post()` | POST request handler |
| `router.put()` | PUT request handler |
| `router.patch()` | PATCH request handler |
| `router.delete()` | DELETE request handler |
| `/:id` | URL parameter |
| `/:subId` | Another URL parameter |

---

## Multiple URL Parameters

Routes can have multiple parameters:

```javascript
// Route definition:
router.delete("/:id/subId/:subId", ...)

// Request URL:
DELETE /api/v1/books/book123/subId/copyA

// In controller:
req.params.id     // "book123"
req.params.subId  // "copyA"
```

---

## Complete Route Table

| Method | Full URL | Purpose |
|--------|----------|---------|
| GET | /api/v1/books | List all books |
| POST | /api/v1/books | Create book |
| PATCH | /api/v1/books/:id | Update book |
| DELETE | /api/v1/books/:id | Delete book |
| PUT | /api/v1/books/:id/subId | Add copy |
| DELETE | /api/v1/books/:id/subId/:subId | Remove copy |

---

## RESTful Design

This follows **REST** (Representational State Transfer) principles:

| Concept | Implementation |
|---------|----------------|
| Resources | `/books` = book collection |
| Hierarchy | `/books/:id/subId` = copies within a book |
| HTTP methods | Indicate action type |
| Stateless | Each request is independent |
