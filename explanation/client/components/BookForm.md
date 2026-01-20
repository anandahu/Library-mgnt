# BookForm.jsx - Add/Edit Book Form Component

## Purpose
A **modal form component** for adding new books or editing existing books in the library inventory.

---

## Component Overview

- Modal overlay with form
- Handles book details (name, author, publication, year)
- Manages book copies (subIds) as comma-separated input
- Works for both create and edit operations

---

## Props Received

```javascript
export default function BookForm({ initialData = null, onSubmit, onClose }) {
```
| Prop | Type | Purpose |
|------|------|---------|
| `initialData` | Object/null | Existing book for edit mode |
| `onSubmit` | Function | Called with form data on submit |
| `onClose` | Function | Called to close modal |

---

## State Management

```javascript
const [formData, setFormData] = useState({
  bookName: "",
  author: "",
  publication: "",
  year: "",
  subIds: ""  // Handle as string input first
});
```
**Key Point:** `subIds` is stored as STRING in form state, converted to ARRAY on submit.

**Why?** User enters "A1, A2, A3" (string), but database needs `["A1", "A2", "A3"]` (array).

---

## Edit Mode Initialization

```javascript
useEffect(() => {
  if (initialData) {
    setFormData({
      ...initialData,
      subIds: initialData.subIds ? initialData.subIds.join(", ") : ""
    });
  }
}, [initialData]);
```
**Line Explanation:**
- `useEffect` - Run when initialData changes
- `.join(", ")` - Convert array to comma-separated string
- **Why?** Pre-fill form with existing book data

**Array to String:**
```javascript
["A1", "A2", "A3"].join(", ")  // "A1, A2, A3"
```

---

## Generic Change Handler

```javascript
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```
**Line Explanation:**
- Spread existing state
- Update only changed field using computed property
- **Why?** Single handler for all inputs

---

## Submit Handler with Data Processing

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  const processedData = {
    ...formData,
    subIds: formData.subIds.split(",").map(id => id.trim()).filter(id => id !== "")
  };
  onSubmit(processedData);
};
```
**Line Explanation:**

| Step | Code | Result |
|------|------|--------|
| 1 | `formData.subIds` | `"A1, A2, A3"` |
| 2 | `.split(",")` | `["A1", " A2", " A3"]` |
| 3 | `.map(id => id.trim())` | `["A1", "A2", "A3"]` |
| 4 | `.filter(id => id !== "")` | Remove empty strings |

**Why?** Convert user input to clean array for database.

---

## JSX Form Structure

```jsx
<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
    <button onClick={onClose} className="absolute top-4 right-4 ...">
      <X size={24} />
    </button>
    <h2>{initialData ? "Edit Book" : "Add New Book"}</h2>
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  </div>
</div>
```
**Structure:**
- Outer div: Modal overlay
- Inner div: Modal content box
- Close button in top-right
- Dynamic title based on mode
- Form with submit handler

---

## Form Fields

### Book Name (Required)
```jsx
<input
  type="text"
  name="bookName"
  value={formData.bookName}
  onChange={handleChange}
  required
/>
```

### Author (Required)
```jsx
<input
  type="text"
  name="author"
  value={formData.author}
  onChange={handleChange}
  required
/>
```

### Publication (Optional)
```jsx
<input
  type="text"
  name="publication"
  value={formData.publication}
  onChange={handleChange}
  // No 'required' attribute
/>
```

### Year (Optional, Numeric)
```jsx
<input
  type="number"
  name="year"
  value={formData.year}
  onChange={handleChange}
/>
```

### Copies IDs (Optional)
```jsx
<input
  type="text"
  name="subIds"
  value={formData.subIds}
  onChange={handleChange}
  placeholder="e.g., A101, A102, A103"
/>
<p className="text-xs text-gray-500">
  Enter unique IDs for each copy of the book.
</p>
```

---

## Controlled Components

All inputs are **controlled components**:
```jsx
value={formData.fieldName}
onChange={handleChange}
```

| Term | Meaning |
|------|---------|
| Controlled | React state is source of truth |
| Uncontrolled | DOM is source of truth |

**Why controlled?** React knows the current value at all times.

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `useState` | State hook |
| `useEffect` | Effect hook |
| `export default` | Default export |
| `...` | Spread operator |
| `[name]` | Computed property |
| `.split()` | String to array |
| `.join()` | Array to string |
| `.map()` | Transform array |
| `.filter()` | Filter array |
| `.trim()` | Remove whitespace |
| `e.preventDefault()` | Stop form submit |

---

## Component Flow

```
CREATE MODE:
1. Form opens with empty fields
2. User enters book details
3. User enters copies as "A1, A2, A3"
4. Submit → processedData has subIds: ["A1", "A2", "A3"]
5. onSubmit sends to API

EDIT MODE:
1. Form opens with initialData
2. useEffect converts subIds array to string
3. User modifies fields
4. Submit → same processing
5. onSubmit sends updated data to API
```

---

## Example Data Flow

**User Input:**
```
bookName: "Physics 101"
author: "Dr. Smith"
subIds: "P1, P2, P3"
```

**Processed Output:**
```javascript
{
  bookName: "Physics 101",
  author: "Dr. Smith",
  publication: "",
  year: "",
  subIds: ["P1", "P2", "P3"]
}
```
