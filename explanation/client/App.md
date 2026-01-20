# App.jsx - Main Application Component

## Purpose
The **root component** of the React application. Contains all state management, API handlers, and renders the entire UI.

---

## Component Overview

This is the largest file in the client, handling:
- Tab navigation (Assignments, Students, Books)
- State for all data (assignments, students, books)
- CRUD handlers for all entities
- Modal visibility and editing state
- Loading state management

---

## Imports Breakdown

### React Hooks
```javascript
import { useState, useEffect } from "react";
```
| Hook | Purpose |
|------|---------|
| `useState` | Manage component state |
| `useEffect` | Side effects (API calls on mount) |

### Lucide Icons
```javascript
import { BookOpen, Users, Book, Plus } from "lucide-react";
```
| Icon | Used For |
|------|----------|
| `BookOpen` | Logo in header |
| `Users` | Students tab |
| `Book` | Books tab |
| `Plus` | Add buttons |

### Components
```javascript
import AssignmentList from "./components/AssignmentList";
import AssignmentForm from "./components/AssignmentForm";
// ... other component imports
```

### API Functions
```javascript
import {
  read, create, update, returned, remove,           // Assignments
  readStudents, createStudent, updateStudent, ...   // Students
  readBooks, createBook, updateBook, ...            // Books
} from "./api/userApi";
```

---

## State Management

### Data State
```javascript
const [assignments, setAssignments] = useState([]);
const [students, setStudents] = useState([]);
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);
```

### UI State
```javascript
const [activeTab, setActiveTab] = useState("assignments");

// Form visibility
const [showAssignmentForm, setShowAssignmentForm] = useState(false);
const [showStudentForm, setShowStudentForm] = useState(false);
const [showBookForm, setShowBookForm] = useState(false);

// Editing state
const [editingAssignment, setEditingAssignment] = useState(null);
const [editingStudent, setEditingStudent] = useState(null);
const [editingBook, setEditingBook] = useState(null);

// View details
const [viewingStudent, setViewingStudent] = useState(null);
const [viewingBook, setViewingBook] = useState(null);
```

---

## Initial Data Loading

```javascript
const loadAllData = async () => {
  setLoading(true);
  try {
    const [assignmentData, studentData, bookData] = await Promise.all([
      read(),
      readStudents(),
      readBooks(),
    ]);
    setAssignments(assignmentData);
    setStudents(studentData);
    setBooks(bookData);
  } catch (error) {
    console.error("Error loading data:", error);
  }
  setLoading(false);
};

useEffect(() => {
  loadAllData();
}, []);
```

**Key Concepts:**
- `Promise.all()` - Run multiple API calls in parallel
- Array destructuring - Extract results
- `[]` dependency - Run once on mount
- **Why?** Load all data when app starts

---

## Assignment Handlers

### Create/Update
```javascript
const handleCreateOrUpdateAssignment = async (formData) => {
  try {
    if (editingAssignment) {
      await update(editingAssignment._id, formData);
      setShowAssignmentForm(false);
      setEditingAssignment(null);
    } else {
      await create(formData);
      setShowAssignmentForm(false);
    }
    const items = await read();
    setAssignments(items);
  } catch (error) {
    console.error("Error creating/updating assignment", error);
    alert(error.message || "Failed to save assignment");
  }
};
```
**Logic:** Check if editing, then update or create accordingly.

### Return Book
```javascript
const handleReturnBook = async (id) => {
  try {
    await returned(id);
    const items = await read();
    setAssignments(items);
  } catch (error) {
    alert(error.message || "Failed to return book");
  }
};
```

### Delete
```javascript
const handleDeleteAssignment = async (id) => {
  if (!window.confirm("Are you sure?")) return;
  try {
    await remove(id);
    const items = await read();
    setAssignments(items);
  } catch (error) {
    alert(error.message || "Failed to delete assignment");
  }
};
```

---

## Form Open/Close Helpers

```javascript
const openEditAssignmentForm = (assignment) => {
  setEditingAssignment(assignment);
  setShowAssignmentForm(true);
};

const closeAssignmentForm = () => {
  setShowAssignmentForm(false);
  setEditingAssignment(null);
};
```
**Pattern:** Open sets editing + shows form, Close clears both.

---

## Tab Navigation

```javascript
const tabs = [
  { id: "assignments", label: "Assignments", icon: BookOpen },
  { id: "students", label: "Students", icon: Users },
  { id: "books", label: "Books", icon: Book },
];

{tabs.map((tab) => (
  <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className={`... ${activeTab === tab.id ? "active-styles" : "inactive-styles"}`}
  >
    <tab.icon size={18} />
    {tab.label}
  </button>
))}
```

---

## Conditional Tab Content

```javascript
{activeTab === "assignments" && (
  <AssignmentList
    assignments={assignments}
    onReturn={handleReturnBook}
    onDelete={handleDeleteAssignment}
    onEdit={openEditAssignmentForm}
  />
)}

{activeTab === "students" && (
  <StudentList ... />
)}

{activeTab === "books" && (
  <BookList ... />
)}
```

---

## Modal Rendering

```javascript
{showAssignmentForm && (
  <AssignmentForm
    onClose={closeAssignmentForm}
    onSubmit={handleCreateOrUpdateAssignment}
    initialData={editingAssignment}
    students={students}
    books={books}
    assignments={assignments}
  />
)}
```
**Pattern:** Only render modal when state is true.

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `useState` | React state hook |
| `useEffect` | React effect hook |
| `async/await` | Async operations |
| `Promise.all()` | Parallel promises |
| `try/catch` | Error handling |
| `&&` | Conditional rendering |
| `? :` | Ternary operator |
| `.map()` | Array iteration |
| `window.confirm()` | Confirmation dialog |
| `alert()` | Show message |
| `setX(null)` | Clear state |

---

## Component Hierarchy

```
App.jsx
├── Header
│   ├── Logo
│   ├── Tab buttons
│   └── Add button (context-sensitive)
├── Main Content
│   ├── AssignmentList
│   ├── StudentList
│   └── BookList
└── Modals (conditional)
    ├── AssignmentForm
    ├── StudentForm
    ├── BookForm
    └── DetailsModal
```

---

## Data Flow

```
1. App mounts
2. useEffect → loadAllData()
3. API calls → set state
4. Components receive data as props
5. User actions → handler functions
6. Handlers call API → update state
7. React re-renders with new data
```

---

## State Lifting Pattern

App.jsx is the "single source of truth":
- All data lives here
- Child components receive via props
- Child actions call parent handlers
- Parent updates state
- React propagates changes down

**Why?** Centralized state management without Redux.
