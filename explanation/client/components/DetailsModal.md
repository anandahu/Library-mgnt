# DetailsModal.jsx - Information Display Modal

## Purpose
A **modal component** for displaying detailed information about a student or book.

---

## Component Overview

- Reusable for both students and books
- Shows all fields in clean layout
- Close button to dismiss
- Overlay click to close

---

## Props Received

```javascript
export default function DetailsModal({ data, type, onClose }) {
```
| Prop | Type | Purpose |
|------|------|---------|
| `data` | Object | Student or Book object |
| `type` | String | `"student"` or `"book"` |
| `onClose` | Function | Called to close modal |

---

## Conditional Rendering by Type

```jsx
{type === "student" ? (
  // Render student fields
) : (
  // Render book fields
)}
```
**Why?** Single component handles both types.

---

## Student Display

```jsx
{type === "student" && (
  <div className="space-y-4">
    <div>
      <label className="text-gray-500 text-sm">Full Name</label>
      <p className="text-gray-900 font-medium">{data.name}</p>
    </div>
    <div>
      <label className="text-gray-500 text-sm">Department</label>
      <p className="text-gray-900">{data.department}</p>
    </div>
    <div>
      <label className="text-gray-500 text-sm">Roll Number</label>
      <p className="text-gray-900">{data.rollNo}</p>
    </div>
    <div>
      <label className="text-gray-500 text-sm">Phone Number</label>
      <p className="text-gray-900">{data.phoneNumber}</p>
    </div>
    <div>
      <label className="text-gray-500 text-sm">Email</label>
      <p className="text-gray-900">{data.email}</p>
    </div>
  </div>
)}
```
**Pattern:** Label (gray, small) + Value (dark, medium weight)

---

## Book Display

```jsx
{type === "book" && (
  <div className="space-y-4">
    <div>
      <label>Book Name</label>
      <p>{data.bookName}</p>
    </div>
    <div>
      <label>Author</label>
      <p>{data.author}</p>
    </div>
    <div>
      <label>Publication</label>
      <p>{data.publication || "Not specified"}</p>
    </div>
    <div>
      <label>Year</label>
      <p>{data.year || "Not specified"}</p>
    </div>
    <div>
      <label>Book Copies</label>
      <div className="flex flex-wrap gap-2">
        {data.subIds && data.subIds.length > 0 ? (
          data.subIds.map((id, index) => (
            <span key={index} className="px-2 py-1 bg-blue-100 rounded">
              {id}
            </span>
          ))
        ) : (
          <span className="text-gray-500">No copies registered</span>
        )}
      </div>
    </div>
  </div>
)}
```
**Special handling for subIds:** Display as tags/pills.

---

## Modal Structure

```jsx
<div 
  className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
  onClick={onClose}  // Close on backdrop click
>
  <div 
    className="bg-white rounded-lg p-6 w-full max-w-md relative"
    onClick={(e) => e.stopPropagation()}  // Don't close on content click
  >
    <button onClick={onClose} className="absolute top-4 right-4">
      <X size={24} />
    </button>
    <h2 className="text-2xl font-bold mb-4">
      {type === "student" ? "Student Details" : "Book Details"}
    </h2>
    {/* Content */}
  </div>
</div>
```

### Key Points:

1. **Backdrop Close:**
   ```jsx
   <div onClick={onClose}>
   ```
   Click outside modal to close.

2. **Stop Propagation:**
   ```jsx
   onClick={(e) => e.stopPropagation()}
   ```
   Clicking inside modal doesn't close it.

3. **Dynamic Title:**
   ```jsx
   {type === "student" ? "Student Details" : "Book Details"}
   ```

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `export default` | Default export |
| `type` | Prop to determine content |
| `&&` | Conditional rendering |
| `? :` | Ternary operator |
| `||` | Fallback value |
| `.map()` | Array iteration |
| `e.stopPropagation()` | Stop event bubbling |
| `className` | CSS classes |

---

## Fallback Values

```jsx
<p>{data.publication || "Not specified"}</p>
```
**Why?** Some fields are optional. Show "Not specified" instead of empty.

---

## Lucide Icons Used

```javascript
import { X } from "lucide-react";
```
| Icon | Purpose |
|------|---------|
| `X` | Close button |

---

## Component Flow

```
1. Parent sets data and type props
2. Modal renders with overlay
3. Content based on type:
   - "student" → Show student fields
   - "book" → Show book fields with copy tags
4. User clicks X or backdrop → onClose()
5. Parent sets data to null → Modal unmounts
```

---

## Usage in Parent

```jsx
{viewingStudent && (
  <DetailsModal
    data={viewingStudent}
    type="student"
    onClose={() => setViewingStudent(null)}
  />
)}

{viewingBook && (
  <DetailsModal
    data={viewingBook}
    type="book"
    onClose={() => setViewingBook(null)}
  />
)}
```

---

## Visual Layout

### Student Details:
```
┌─────────────────────────────────────┐
│                              [X]    │
│  Student Details                    │
│                                     │
│  Full Name                          │
│  Rahul Sharma                       │
│                                     │
│  Department                         │
│  Computer Science                   │
│                                     │
│  Roll Number                        │
│  CS2024001                          │
│                                     │
│  Phone Number                       │
│  +91-9876543210                     │
│                                     │
│  Email                              │
│  rahul@college.edu                  │
└─────────────────────────────────────┘
```

### Book Details:
```
┌─────────────────────────────────────┐
│                              [X]    │
│  Book Details                       │
│                                     │
│  Book Name                          │
│  Introduction to Algorithms         │
│                                     │
│  Author                             │
│  Thomas H. Cormen                   │
│                                     │
│  Book Copies                        │
│  [ALGO-001] [ALGO-002] [ALGO-003]   │
└─────────────────────────────────────┘
```
