# userApi.js - API Helper Functions

## Purpose
Contains all **API helper functions** for communicating with the backend server. Centralizes HTTP requests for assignments, students, and books.

---

## Core Concepts

### Why Centralize API Calls?

| Without centralization | With centralization |
|------------------------|---------------------|
| `fetch()` scattered everywhere | Single source of truth |
| Duplicate error handling | Reusable `safe()` wrapper |
| Hard to change base URL | Change once, affects all |

---

## Complete Code with Explanations

### Base URLs

```javascript
const ASSIGNMENTS_BASE = "/api/v1/assignments";
const STUDENTS_BASE = "/api/v1/students";
const BOOKS_BASE = "/api/v1/books";
```
**Line Explanation:**
- Constants for API endpoints
- `/api/v1/` - Relative path (uses Vite proxy in development)
- **Why?** Single place to update if API changes

---

### Safe Fetch Wrapper

```javascript
async function safe(url, options = {}) {
```
**Line Explanation:**
- `async` - Enables await inside function
- `options = {}` - Default parameter (empty object if not provided)
- **Why?** Wrapper function that handles errors consistently

---

```javascript
  const res = await fetch(url, options);
```
**Line Explanation:**
- `fetch()` - Browser's native HTTP request function
- `await` - Wait for response
- `res` - Response object
- **Why?** Make HTTP request

---

```javascript
  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: (await res.text()) || "Unknown error" };
  }
```
**Line Explanation:**
- Check if response is JSON
- If JSON → parse it
- If not → treat as text error message
- **Why?** Some errors return plain text, not JSON

---

```javascript
  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}
```
**Line Explanation:**
- `res.ok` - True if status 200-299
- `throw new Error()` - Create and throw error
- `return data` - Return successful response
- **Why?** Consistent error handling

---

### Assignment Functions

```javascript
export async function read() {
  const data = await safe(ASSIGNMENTS_BASE);
  if (data && data.status === "success") return data.data.assignments;
  if (Array.isArray(data)) return data;
  return [];
}
```
**Line Explanation:**
- `export` - Make function importable
- Handle different response formats
- Return assignments array or empty array
- **Why?** Normalize response for component use

---

```javascript
export async function create(payload) {
  return safe(ASSIGNMENTS_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
```
**Line Explanation:**
- `method: "POST"` - HTTP method
- `headers` - Tell server we're sending JSON
- `JSON.stringify()` - Convert object to JSON string
- **Why?** Create new assignment

---

```javascript
export async function update(id, payload) {
  return safe(`${ASSIGNMENTS_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
```
**Line Explanation:**
- Template literal for dynamic URL
- `${id}` - Insert ID into URL
- **Why?** Update specific assignment

---

```javascript
export async function returned(id) {
  return safe(`${ASSIGNMENTS_BASE}/${id}/return`, { method: "PUT" });
}
```
**Line Explanation:**
- Special endpoint for returning books
- No body needed (just marks as returned)
- **Why?** Convenience function for book returns

---

```javascript
export async function remove(id) {
  return safe(`${ASSIGNMENTS_BASE}/${id}`, { method: "DELETE" });
}
```
**Line Explanation:**
- `method: "DELETE"` - Remove resource
- **Why?** Delete assignment record

---

### Default Export

```javascript
export default {
  read,
  create,
  update,
  returned,
  remove,
  // ... other functions
};
```
**Line Explanation:**
- Export object with all functions
- **Why?** Can import as single object: `import api from './userApi'`

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `const` | Constant variable |
| `async` | Asynchronous function |
| `await` | Wait for Promise |
| `fetch()` | Browser HTTP API |
| `export` | Make importable |
| `export default` | Default export |
| `JSON.stringify()` | Object to JSON string |
| `throw` | Throw error |
| `Error` | Error constructor |

---

## Usage Examples

### In Components:

```javascript
import { read, create, remove } from '../api/userApi';

// Get all assignments
const assignments = await read();

// Create new assignment
await create({
  studentId: "...",
  bookId: "...",
  subId: "A1",
  dateOfIssue: "2024-01-15",
  dueDate: "2024-01-25"
});

// Delete assignment
await remove("assignment-id-here");
```

---

## HTTP Methods Quick Reference

| Function | HTTP Method | Purpose |
|----------|-------------|---------|
| `read()` | GET | Fetch data |
| `create()` | POST | Create new |
| `update()` | PUT | Update existing |
| `remove()` | DELETE | Delete |
| `returned()` | PUT | Mark returned |

---

## Error Handling in Components

```javascript
try {
  await create(formData);
  // Success!
} catch (error) {
  alert(error.message);  // Shows error from safe()
}
```
