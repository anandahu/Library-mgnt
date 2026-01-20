# AssignmentForm.jsx - Book Issue Form Component

## Purpose
A **modal form component** for issuing books to students. Handles both creating new assignments and editing existing ones.

---

## React Concepts Used

| Concept | Purpose |
|---------|---------|
| `useState` | Manage form data |
| `useEffect` | Initialize form when editing |
| Props | Receive data from parent |
| Controlled inputs | React controls form values |
| Conditional rendering | Show/hide elements |

---

## Component Structure Explained

### Props Received

```javascript
export default function AssignmentForm({ 
  initialData = null,   // Existing assignment (for edit mode)
  students,             // Array of all students
  books,                // Array of all books
  assignments = [],     // All assignments (to check availability)
  onSubmit,             // Function to call on form submit
  onClose               // Function to close modal
}) {
```
**Line Explanation:**
- `export default` - Main export of file
- `function AssignmentForm` - Functional component
- `{ }` - Destructure props object
- `= null`, `= []` - Default values if not provided
- **Why?** Component receives data from parent (App.jsx)

---

### State Management

```javascript
const [formData, setFormData] = useState({
  studentId: "",
  bookId: "",
  subId: "",
  dateOfIssue: new Date().toISOString().split('T')[0],
  dueDate: "",
});
```
**Line Explanation:**
- `useState()` - React hook for state
- Initial object with form fields
- `new Date().toISOString().split('T')[0]` - Today's date in YYYY-MM-DD format
- **Why?** Track all form input values

**Date formatting:**
```
new Date() → "2024-01-15T10:30:00.000Z"
.toISOString() → "2024-01-15T10:30:00.000Z"
.split('T')[0] → "2024-01-15"
```

---

### Derived State

```javascript
const selectedBook = books.find(b => b._id === formData.bookId);
```
**Line Explanation:**
- `books.find()` - Find matching book object
- `b => b._id === formData.bookId` - Arrow function comparison
- **Why?** Need full book object to show its subIds (copies)

---

### Effect Hook for Edit Mode

```javascript
useEffect(() => {
  if (initialData) {
    setFormData({
      ...initialData,
      studentId: initialData.studentId?._id || initialData.studentId || "",
      bookId: initialData.bookId?._id || initialData.bookId || "",
      subId: initialData.subId || "",
      dateOfIssue: initialData.dateOfIssue ? initialData.dateOfIssue.split('T')[0] : "",
      dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ""
    });
  }
}, [initialData]);
```
**Line Explanation:**
- `useEffect()` - Runs after render
- `[initialData]` - Dependency array (only runs when initialData changes)
- `?.` - Optional chaining (safe access)
- `||` - Fallback value
- **Why?** Pre-fill form when editing existing assignment

**Optional chaining example:**
```javascript
initialData.studentId?._id
// If studentId is populated object: returns _id
// If studentId is just ID string: returns undefined
// If studentId is null: returns undefined (no error!)
```

---

### Copy Availability Check

```javascript
const isCopyIssued = (bookId, subId) => {
  if (initialData && initialData._id) {
    return assignments.some(a => 
      a._id !== initialData._id &&
      a.bookId?._id === bookId && 
      a.subId === subId && 
      a.status === "Issued"
    );
  }

  return assignments.some(a => 
    a.bookId?._id === bookId && 
    a.subId === subId && 
    a.status === "Issued"
  );
};
```
**Line Explanation:**
- `assignments.some()` - Returns true if ANY item matches
- First check: When editing, exclude current assignment from check
- Second check: For new assignments
- **Why?** Show which book copies are already issued

---

### Form Change Handler

```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === "bookId") {
    const book = books.find(b => b._id === value);
    let newSubId = "";
    
    if (book && (!book.subIds || book.subIds.length === 0)) {
       newSubId = book._id;
    }
    
    setFormData({ ...formData, bookId: value, subId: newSubId });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
```
**Line Explanation:**
- `e.target` - The input element that triggered event
- `{ name, value }` - Destructure name and value attributes
- Spread operator `...formData` - Copy existing state
- `[name]: value` - Computed property name
- **Why?** Handle all form inputs with single function

**Special book selection logic:**
- When book changes, reset subId
- If book has no copies, auto-select book ID as default

---

### Form Submit Handler

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(formData);
};
```
**Line Explanation:**
- `e.preventDefault()` - Stop default form submission (page reload)
- `onSubmit(formData)` - Call parent's handler with data
- **Why?** Handle form submission in React way

---

### JSX Rendering

```jsx
return (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
```
**Line Explanation:**
- Modal overlay covering entire screen
- `fixed inset-0` - Position fixed, all edges at 0
- `z-50` - High z-index (above other content)
- `bg-black bg-opacity-50` - Semi-transparent black
- `flex items-center justify-center` - Center content
- **Why?** Create modal backdrop

---

### Conditional Book Copy Dropdown

```jsx
{selectedBook && (
  <div>
    <select name="subId" ...>
      {selectedBook.subIds && selectedBook.subIds.length > 0 ? (
        selectedBook.subIds.map((id, index) => {
          const isTaken = isCopyIssued(selectedBook._id, id);
          return (
            <option key={index} value={id} disabled={isTaken}>
              {id} {isTaken ? "(Issued)" : "(Available)"}
            </option>
          );
        })
      ) : (
        // Fallback for no copies
      )}
    </select>
  </div>
)}
```
**Line Explanation:**
- `{selectedBook && (...)}` - Only render if book selected
- `.map()` - Transform array to JSX elements
- `key={index}` - React's list item identifier
- `disabled={isTaken}` - Disable if copy already issued
- **Why?** Dynamic dropdown based on selected book

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `useState` | React state hook |
| `useEffect` | React effect hook |
| `export default` | Default export |
| `props` | Component properties |
| `=>` | Arrow function |
| `?.` | Optional chaining |
| `...` | Spread operator |
| `[name]` | Computed property |
| `&&` | Logical AND / conditional render |
| `? :` | Ternary operator |
| `.map()` | Array transformation |
| `.find()` | Find array element |
| `.some()` | Check if any match |
| `className` | CSS class in JSX |
| `onChange` | Input change event |
| `onSubmit` | Form submit event |
| `e.preventDefault()` | Stop default behavior |

---

## Component Flow

```
1. User opens form (showAssignmentForm = true in App.jsx)
2. Component renders with empty form OR pre-filled data
3. User selects Student → formData.studentId updates
4. User selects Book → formData.bookId updates, subId resets
5. Dropdown shows available copies
6. User selects Copy → formData.subId updates
7. User sets dates
8. User clicks "Confirm Issue"
9. handleSubmit() calls onSubmit(formData)
10. App.jsx creates assignment via API
11. Modal closes
```
