# index.css - Global Styles

## Purpose
Contains **global CSS styles** that apply to the entire application.

---

## Current Contents

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## TailwindCSS Directives Explained

### `@tailwind base`

**What it does:**
- Injects Tailwind's base/reset styles
- Normalizes browser defaults
- Sets sensible defaults for HTML elements

**Examples of base styles:**
```css
/* Tailwind adds these automatically */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  line-height: 1.5;
}

img, video {
  max-width: 100%;
  height: auto;
}
```

**Why?** Consistent starting point across all browsers.

---

### `@tailwind components`

**What it does:**
- Injects component classes
- Includes any custom `@apply` based components
- Plugin components

**Example component classes:**
```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* Custom components you might add: */
.btn {
  @apply px-4 py-2 rounded-lg font-medium;
}
```

**Why?** Reusable styled components.

---

### `@tailwind utilities`

**What it does:**
- Injects all utility classes
- The majority of Tailwind's classes
- Responsive variants
- State variants (hover, focus, etc.)

**Examples:**
```css
.flex { display: flex; }
.text-center { text-align: center; }
.bg-blue-500 { background-color: #3b82f6; }
.hover\:bg-blue-600:hover { background-color: #2563eb; }
.md\:grid-cols-2 { ... } /* Responsive */
```

**Why?** Utility-first CSS - compose styles inline.

---

## How Tailwind Works

### Without Tailwind:
```html
<button class="primary-button">Click</button>
```
```css
.primary-button {
  padding: 0.5rem 1rem;
  background-color: blue;
  color: white;
  border-radius: 0.5rem;
}
```

### With Tailwind:
```html
<button class="px-4 py-2 bg-blue-500 text-white rounded-lg">Click</button>
```
No separate CSS needed!

---

## Adding Custom Styles

You can add custom CSS below the Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles */
body {
  font-family: 'Inter', sans-serif;
}

/* Custom component using @apply */
.card {
  @apply bg-white rounded-lg shadow-md p-6;
}

/* Regular CSS */
.custom-animation {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## File Location

```
client/
└── src/
    ├── main.jsx      ← Imports index.css
    ├── index.css     ← You are here
    └── App.jsx
```

---

## Build Process

1. **Development:** Tailwind JIT compiles on-the-fly
2. **Production:** Tailwind scans files, removes unused CSS
3. **Result:** Tiny CSS bundle with only used styles

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `@tailwind` | Tailwind directive |
| `base` | Reset/normalize styles |
| `components` | Reusable components |
| `utilities` | Utility classes |
| `@apply` | Use utilities in custom CSS |

---

## Tailwind Configuration

Tailwind is configured in `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**content** tells Tailwind which files to scan for class usage.

---

## Common Utility Classes Used in This Project

| Class | Purpose |
|-------|---------|
| `flex` | Flexbox container |
| `grid` | Grid container |
| `p-4` | Padding all sides |
| `px-4` | Padding horizontal |
| `py-2` | Padding vertical |
| `m-4` | Margin all sides |
| `text-lg` | Large text |
| `font-bold` | Bold text |
| `bg-blue-500` | Blue background |
| `text-white` | White text |
| `rounded-lg` | Rounded corners |
| `shadow-md` | Medium shadow |
| `hover:...` | Hover state |
| `md:...` | Medium screen breakpoint |
