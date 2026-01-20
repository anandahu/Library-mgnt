# .env - Environment Variables

## Purpose
This file stores **sensitive configuration** that should NOT be committed to version control (like GitHub). It contains secrets like database passwords.

---

## File Contents Explained

```
PORT=5000
```
**Line Explanation:**
- `PORT` - Variable name (uppercase by convention)
- `5000` - The port number the server listens on
- **Why?** Allows changing the port without modifying code. Production servers often assign ports dynamically.

---

```
MONGODB_URI=mongodb+srv://LMSDB:<DATABASE_PASSWORD>@cluster0.d2hzlss.mongodb.net/LibraryManagementSystem_Fresh
```
**Line Explanation:**

| Part | Meaning |
|------|---------|
| `mongodb+srv://` | Protocol for MongoDB Atlas (cloud) connection |
| `LMSDB` | Database username |
| `<DATABASE_PASSWORD>` | Placeholder for actual password |
| `@cluster0.d2hzlss.mongodb.net` | MongoDB Atlas cluster address |
| `/LibraryManagementSystem_Fresh` | Database name |

**Why?** 
- Keeps database credentials out of source code
- Different environments (dev, prod) can have different databases
- Passwords can be changed without code changes

---

## Security Notes

### ⚠️ NEVER commit `.env` to Git!

Add to `.gitignore`:
```
.env
```

### How Environment Variables Work

1. `dotenv.config()` in `server.js` reads this file
2. Variables become available via `process.env.VARIABLE_NAME`
3. Example: `process.env.PORT` returns `"5000"`

---

## Common Environment Variables

| Variable | Purpose |
|----------|---------|
| `PORT` | Server port |
| `MONGODB_URI` | Database connection string |
| `NODE_ENV` | `development` or `production` |
| `JWT_SECRET` | Secret for JSON Web Tokens (if using auth) |
| `API_KEY` | Third-party API keys |

---

## Creating Your Own .env

1. Create file named `.env` (no filename, just extension)
2. Add variables in `KEY=value` format
3. **No spaces** around `=`
4. **No quotes** needed for values (usually)
5. Each variable on its own line

---

## Accessing Variables in Code

```javascript
// In server.js or any file
const port = process.env.PORT;           // "5000"
const dbUri = process.env.MONGODB_URI;   // "mongodb+srv://..."

// With fallback
const port = process.env.PORT || 3000;   // Uses 3000 if PORT not set
```

---

## Why Use Environment Variables?

1. **Security** - Passwords not in code
2. **Flexibility** - Different settings per environment
3. **Deployment** - Cloud platforms inject variables automatically
4. **Collaboration** - Team members use their own credentials
