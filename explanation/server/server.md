# server.js - Server Entry Point

## Purpose
This is the **main entry point** for the backend server. It connects to MongoDB and starts the Express server.

---

## Complete Code with Explanations

```javascript
const mongoose = require("mongoose");
```
**Line Explanation:**
- `const` - Declares a constant variable that cannot be reassigned
- `require("mongoose")` - Imports the Mongoose library, which is an ODM (Object Document Mapper) for MongoDB
- **Why?** Mongoose provides a schema-based solution to model application data and interact with MongoDB

---

```javascript
const dotenv = require("dotenv");
```
**Line Explanation:**
- `require("dotenv")` - Imports the dotenv library
- **Why?** dotenv loads environment variables from a `.env` file into `process.env`, keeping sensitive data (like database passwords) out of the code

---

```javascript
dotenv.config();
```
**Line Explanation:**
- `.config()` - Method that reads the `.env` file and loads variables
- **Why?** This must be called before accessing any environment variables

---

```javascript
const app = require("./app");
```
**Line Explanation:**
- `require("./app")` - Imports the Express application from `app.js`
- `./` - Relative path (current directory)
- **Why?** Separates server startup logic from application configuration (separation of concerns)

---

```javascript
const port = process.env.PORT || 5000;
```
**Line Explanation:**
- `process.env.PORT` - Accesses the PORT variable from environment
- `||` - Logical OR operator (if left side is falsy, use right side)
- `5000` - Default fallback port
- **Why?** Allows flexible port configuration; production servers often assign ports dynamically

---

```javascript
mongoose
  .connect(process.env.MONGODB_URI)
```
**Line Explanation:**
- `mongoose.connect()` - Establishes connection to MongoDB database
- `process.env.MONGODB_URI` - The database connection string from `.env`
- **Why?** Must connect to database before server can handle data requests

---

```javascript
  .then(() => {
    console.log("Connected to MongoDB");
```
**Line Explanation:**
- `.then()` - Promise handler for successful connection
- `() => {}` - Arrow function syntax (ES6)
- `console.log()` - Outputs message to terminal
- **Why?** Confirms database connection was successful

---

```javascript
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
```
**Line Explanation:**
- `app.listen()` - Starts the HTTP server on specified port
- `` `template string` `` - ES6 template literals allow variable interpolation with `${}`
- **Why?** Server only starts AFTER database connection succeeds (ensures data is available)

---

```javascript
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
```
**Line Explanation:**
- `.catch()` - Promise handler for errors
- `console.error()` - Outputs error message (shows in red in most terminals)
- `err` - The error object passed by the Promise
- **Why?** Handles connection failures gracefully instead of crashing

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `const` | Declares a constant (cannot be reassigned) |
| `require()` | Node.js function to import modules |
| `process.env` | Object containing environment variables |
| `.then()` | Promise method for success handling |
| `.catch()` | Promise method for error handling |
| `=>` | Arrow function syntax |
| `||` | Logical OR operator |
| `` ` ` `` | Template literal (backticks) |
| `${}` | Template literal interpolation |

---

## Execution Flow

1. Load Mongoose library
2. Load dotenv library
3. Configure dotenv to read `.env` file
4. Import Express app from `app.js`
5. Get port from environment or use 5000
6. Attempt MongoDB connection
7. If successful → Start Express server
8. If failed → Log error message
