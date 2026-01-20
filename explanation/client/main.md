# main.jsx - React Application Entry Point

## Purpose
This is the **entry point** for the React application. It renders the root component into the DOM.

---

## Complete Code with Explanations

```javascript
import { StrictMode } from 'react'
```
**Line Explanation:**
- `import` - ES6 module import statement
- `{ StrictMode }` - Named import (extracting specific export)
- `'react'` - The React library
- **StrictMode** - A development tool that:
  - Highlights potential problems
  - Warns about deprecated features
  - Runs certain checks twice to detect side effects
- **Why?** Helps catch bugs during development

---

```javascript
import { createRoot } from 'react-dom/client'
```
**Line Explanation:**
- `createRoot` - New React 18 API for rendering
- `'react-dom/client'` - React's DOM rendering package
- **Why?** Required to render React components to the browser DOM

**React 18 vs older versions:**
```javascript
// Old (React 17):
ReactDOM.render(<App />, document.getElementById('root'))

// New (React 18):
createRoot(document.getElementById('root')).render(<App />)
```

---

```javascript
import './index.css'
```
**Line Explanation:**
- Imports CSS file for global styles
- `./` - Relative path (same directory)
- **Why?** Apply base styles to entire application

---

```javascript
import App from './App.jsx'
```
**Line Explanation:**
- Default import of App component
- `.jsx` - JavaScript with JSX syntax
- **Why?** App is the root component containing all UI

---

```javascript
createRoot(document.getElementById('root')).render(
```
**Line Explanation:**
- `document.getElementById('root')` - Find the DOM element with id "root"
- `createRoot()` - Create a React root
- `.render()` - Render React components into it
- **Why?** Connects React to HTML

**In index.html:**
```html
<div id="root"></div>
```
React takes control of this div.

---

```javascript
  <StrictMode>
    <App />
  </StrictMode>,
)
```
**Line Explanation:**
- `<StrictMode>` - Wrapper component
- `<App />` - Self-closing JSX tag for App component
- Comma after closing paren is optional but common
- **Why?** StrictMode wraps App for development checks

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `import` | ES6 module import |
| `from` | Source module |
| `{ }` | Named import |
| `export default` | Default export (implicit in App) |
| `createRoot` | React 18 rendering API |
| `document` | Browser DOM document object |
| `getElementById` | DOM query method |
| `<Component />` | JSX component syntax |

---

## File Structure Context

```
index.html
    │
    └── <div id="root"></div>
            │
            └── main.jsx renders here
                    │
                    └── <App />
                            │
                            └── All other components
```

---

## Development vs Production

**Development (with StrictMode):**
- Extra warnings
- Double-renders to detect side effects
- Checks for deprecated APIs

**Production (StrictMode has no effect):**
- All checks removed
- No performance impact
- Same as if StrictMode wasn't there

---

## Common Errors

### "Target container is not a DOM element"
```javascript
// ❌ Wrong:
createRoot(document.getElementById('app'))  // No element with id 'app'

// ✅ Correct:
createRoot(document.getElementById('root'))
```

### "App is not defined"
```javascript
// ❌ Wrong:
import './App.jsx'  // Import without assignment

// ✅ Correct:
import App from './App.jsx'
```
