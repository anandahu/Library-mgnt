# BookList.jsx - Book Inventory Display Component

## Purpose
Displays all books in a **table format** with expandable rows to show individual copies (subIds).

---

## Component Overview

- Table with book information
- Expandable rows to view/manage copies
- Edit and Delete actions per book
- Delete individual copies functionality

---

## Props Received

```javascript
export default function BookList({ books, onEdit, onDelete, refreshBooks }) {
```
| Prop | Type | Purpose |
|------|------|---------|
| `books` | Array | List of book objects |
| `onEdit` | Function | Open edit form for book |
| `onDelete` | Function | Delete entire book |
| `refreshBooks` | Function | Reload books after changes |

---

## State for Expansion

```javascript
const [expandedBook, setExpandedBook] = useState(null);
```
**Explanation:**
- Tracks which book's copies are visible
- `null` = all collapsed
- `"book_id"` = that book is expanded
- **Why?** Only one book expanded at a time

---

## Toggle Function

```javascript
const toggleExpand = (id) => {
  if (expandedBook === id) setExpandedBook(null);
  else setExpandedBook(id);
};
```
**Logic:**
- If clicking same book → collapse (set null)
- If clicking different book → expand that one
- **Why?** Toggle behavior

---

## Delete Copy Function

```javascript
const handleDeleteSubId = async (bookId, subId) => {
  if (!window.confirm(`Are you sure you want to remove copy ID: ${subId}?`))
    return;

  try {
    await deleteSubId(bookId, subId);
    if (refreshBooks) {
      refreshBooks();
    }
  } catch (error) {
    console.error("Error deleting copy:", error);
    alert(error.message || "Failed to delete copy");
  }
};
```
**Line Explanation:**
- `window.confirm()` - Browser confirmation dialog
- `await deleteSubId()` - Call API function
- `refreshBooks()` - Reload data after deletion
- `try/catch` - Handle errors
- **Why?** Remove damaged/lost copies

---

## Table Structure

```jsx
<table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      <th>Book Name</th>
      <th>Author</th>
      <th>Publication</th>
      <th>Total Copies</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {books.map((book) => (
      <React.Fragment key={book._id}>
        {/* Main row */}
        {/* Expandable row */}
      </React.Fragment>
    ))}
  </tbody>
</table>
```
**Why React.Fragment?** Need to return two `<tr>` elements per book without wrapper div.

---

## Main Book Row

```jsx
<tr>
  <td>{book.bookName}</td>
  <td>{book.author}</td>
  <td>{book.publication}</td>
  <td>
    <span className="font-bold">
      {book.subIds ? book.subIds.length : 0}
    </span>
    <button onClick={() => toggleExpand(book._id)}>
      {expandedBook === book._id ? "Hide IDs" : "Show IDs"}
    </button>
  </td>
  <td>
    <button onClick={() => onEdit(book)}>
      <Edit2 size={20} />
    </button>
    <button onClick={() => onDelete(book._id)}>
      <Trash2 size={20} />
    </button>
  </td>
</tr>
```

---

## Expandable Copies Row

```jsx
{expandedBook === book._id && (
  <tr className="bg-gray-50">
    <td colSpan="5">
      <strong>Managed Copies (Sub-IDs):</strong>
      <div>
        {book.subIds && book.subIds.length > 0 ? (
          book.subIds.map((subId, index) => (
            <span key={index} className="... bg-blue-100">
              {subId}
              <button onClick={() => handleDeleteSubId(book._id, subId)}>
                <XCircle size={14} />
              </button>
            </span>
          ))
        ) : (
          <span>No specific copy IDs added.</span>
        )}
      </div>
    </td>
  </tr>
)}
```
**Line Explanation:**
- `colSpan="5"` - Span all columns
- `.map()` - Create tag for each copy
- Delete button per copy
- **Why?** Manage individual copies

---

## Copy Tags with Delete

```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100">
  {subId}
  <button
    onClick={() => handleDeleteSubId(book._id, subId)}
    title="Remove this damaged copy"
  >
    <XCircle size={14} />
  </button>
</span>
```
**Styling:**
- Blue pill/tag design
- X button to remove
- Tooltip on hover

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `useState` | State hook |
| `async/await` | Async operations |
| `try/catch` | Error handling |
| `.map()` | Array iteration |
| `window.confirm()` | Confirmation dialog |
| `colSpan` | Table column span |
| `React.Fragment` | Grouping without DOM element |
| `&&` | Conditional rendering |
| `? :` | Ternary operator |

---

## Lucide Icons Used

```javascript
import { Trash2, Edit2, ChevronDown, ChevronUp, XCircle } from "lucide-react";
```
| Icon | Purpose |
|------|---------|
| `Edit2` | Edit book |
| `Trash2` | Delete book |
| `XCircle` | Delete copy |
| `ChevronDown/Up` | (Available for expand icon) |

---

## Component Flow

```
1. Render table with all books
2. Each book shows copy count
3. Click "Show IDs" → expandedBook = book._id
4. Expandable row appears with copy tags
5. Click X on copy → confirm → API delete → refresh
6. Click "Hide IDs" → expandedBook = null → row hides
7. Edit/Delete book → calls parent handlers
```

---

## Visual Layout

```
┌──────────────────────────────────────────────────────┐
│ Book Name    │ Author │ Publication │ Copies │ Actions │
├──────────────────────────────────────────────────────┤
│ Physics 101  │ Smith  │ Oxford      │ 3 [Show]│ ✏️ 🗑️  │
├──────────────────────────────────────────────────────┤
│ ▼ Managed Copies: [P1 ✖] [P2 ✖] [P3 ✖]               │
├──────────────────────────────────────────────────────┤
│ Calculus     │ Jones  │ MIT Press   │ 2 [Show]│ ✏️ 🗑️  │
└──────────────────────────────────────────────────────┘
```
