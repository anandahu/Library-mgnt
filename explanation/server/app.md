# app.js - Express Application Configuration

## Purpose
This file configures the **Express application**, setting up middleware and routes. It defines HOW the server processes incoming requests.

---

## Complete Code with Explanations

```javascript
const express = require("express");
```
**Line Explanation:**
- `require("express")` - Imports the Express.js framework
- **Why?** Express is a minimal web framework that simplifies creating HTTP servers in Node.js

---

```javascript
const cors = require("cors");
```
**Line Explanation:**
- `require("cors")` - Imports CORS (Cross-Origin Resource Sharing) middleware
- **Why?** Browsers block requests from different origins by default. CORS allows our React app (port 5173) to communicate with our server (port 5000)

---

```javascript
const app = express();
```
**Line Explanation:**
- `express()` - Creates an Express application instance
- `app` - The application object that handles all routing and middleware
- **Why?** This is the central object we configure and eventually start listening on

---

```javascript
const assignmentRoutes = require("./routes/assignmentRoutes");
const studentRoutes = require("./routes/studentRoutes");
const bookRoutes = require("./routes/bookRoutes");
```
**Line Explanation:**
- Imports route handlers from separate files
- `./routes/` - Relative path to routes folder
- **Why?** Separates routing logic into organized files (modular architecture)

---

```javascript
// basic logging for incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} -> ${req.method} ${req.url}`);
  next();
});
```
**Line Explanation:**
- `app.use()` - Registers middleware that runs for EVERY request
- `(req, res, next)` - Express middleware signature:
  - `req` - Request object (contains client data)
  - `res` - Response object (used to send data back)
  - `next` - Function to call the next middleware
- `new Date().toISOString()` - Current timestamp in ISO format
- `req.method` - HTTP method (GET, POST, PUT, DELETE)
- `req.url` - The requested URL path
- `next()` - **MUST be called** to continue to next middleware
- **Why?** Debugging tool to see all incoming requests in terminal

---

```javascript
app.use(cors());
```
**Line Explanation:**
- `cors()` - Enables CORS for all routes
- **Why?** Allows frontend (React) to make API requests to this server

---

```javascript
app.use(express.json());
```
**Line Explanation:**
- `express.json()` - Built-in middleware to parse JSON request bodies
- **Why?** When client sends JSON data (e.g., form submission), this parses it into `req.body`

---

```javascript
app.use(express.urlencoded({ extended: true }));
```
**Line Explanation:**
- `express.urlencoded()` - Parses URL-encoded form data
- `{ extended: true }` - Allows parsing of nested objects
- **Why?** Handles traditional HTML form submissions

---

```javascript
//Route
app.use("/api/v1/assignments", assignmentRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/books", bookRoutes);
```
**Line Explanation:**
- `app.use("/path", router)` - Mounts a router at a specific path
- `/api/v1/` - API versioning convention (allows future `/api/v2/` without breaking old clients)
- **Why?** All assignment-related requests go to `/api/v1/assignments/*`

**Example:**
- `GET /api/v1/assignments` → handled by `assignmentRoutes`
- `POST /api/v1/students` → handled by `studentRoutes`

---

```javascript
// simple test endpoint
app.get("/api-test", (req, res) => {
  res.json({ status: "ok", message: "api-test working" });
});
```
**Line Explanation:**
- `app.get()` - Handles GET requests to specific path
- `"/api-test"` - URL path
- `res.json()` - Sends JSON response
- **Why?** Quick way to verify server is running without database

---

```javascript
module.exports = app;
```
**Line Explanation:**
- `module.exports` - Node.js way to export code for use in other files
- **Why?** Allows `server.js` to import this configured app

---

## Middleware Execution Order

Middleware executes in the **order it's registered**:

```
Request → Logging → CORS → JSON Parser → URL Parser → Routes → Response
```

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `express()` | Creates Express application |
| `app.use()` | Register middleware for all routes |
| `app.get()` | Handle GET requests |
| `req` | Request object |
| `res` | Response object |
| `next` | Function to proceed to next middleware |
| `cors()` | Enable cross-origin requests |
| `express.json()` | Parse JSON bodies |
| `module.exports` | Export for Node.js modules |

---

## Architecture Pattern

This follows the **MVC pattern** (Model-View-Controller):
- **Models** - Database schemas (`models/` folder)
- **Views** - React frontend (not in this file)
- **Controllers** - Business logic (`controllers/` folder)
- **Routes** - URL routing (`routes/` folder)

`app.js` is the **glue** that connects routes to the Express server.
