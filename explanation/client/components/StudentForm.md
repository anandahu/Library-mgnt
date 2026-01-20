# StudentForm.jsx - Add/Edit Student Form Component

## Purpose
A **modal form component** for registering new students or editing existing student information.

---

## Component Overview

- Modal overlay with form
- Handles student details (name, department, roll number, phone, email)
- Form validation
- Works for both create and edit operations

---

## Props Received

```javascript
export default function StudentForm({ initialData = null, onSubmit, onClose }) {
```
| Prop | Type | Purpose |
|------|------|---------|
| `initialData` | Object/null | Existing student for edit mode |
| `onSubmit` | Function | Called with form data on submit |
| `onClose` | Function | Called to close modal |

---

## State Management

```javascript
const [formData, setFormData] = useState({
  name: "",
  department: "",
  rollNo: "",
  phoneNumber: "",
  email: "",
});
```
**All required fields** matching the StudentModel schema.

---

## Edit Mode Initialization

```javascript
useEffect(() => {
  if (initialData) {
    setFormData({
      name: initialData.name || "",
      department: initialData.department || "",
      rollNo: initialData.rollNo || "",
      phoneNumber: initialData.phoneNumber || "",
      email: initialData.email || "",
    });
  }
}, [initialData]);
```
**Line Explanation:**
- Populate form when editing
- Default to empty string if field missing
- **Why?** Pre-fill form with existing data

---

## Generic Change Handler

```javascript
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```
**Why?** Single handler for all input fields using computed property name.

---

## Submit Handler

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(formData);
};
```
**Line Explanation:**
- Prevent default form submission
- Pass form data to parent handler
- **Why?** Let parent handle API call

---

## Form Fields

### Name (Required)
```jsx
<div>
  <label>Full Name</label>
  <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required
  />
</div>
```

### Department (Required)
```jsx
<div>
  <label>Department</label>
  <input
    type="text"
    name="department"
    value={formData.department}
    onChange={handleChange}
    placeholder="e.g., Computer Science"
    required
  />
</div>
```

### Roll Number (Required)
```jsx
<div>
  <label>Roll Number</label>
  <input
    type="text"
    name="rollNo"
    value={formData.rollNo}
    onChange={handleChange}
    placeholder="e.g., CS2024001"
    required
  />
</div>
```

### Phone Number (Required)
```jsx
<div>
  <label>Phone Number</label>
  <input
    type="tel"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleChange}
    placeholder="+91-9876543210"
    required
  />
</div>
```
**Note:** `type="tel"` provides phone keyboard on mobile.

### Email (Required)
```jsx
<div>
  <label>Email</label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="student@college.edu"
    required
  />
</div>
```
**Note:** `type="email"` provides email validation.

---

## Modal Structure

```jsx
<div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
    <button onClick={onClose}>
      <X size={24} />
    </button>
    <h2>{initialData ? "Edit Student" : "Add New Student"}</h2>
    <form onSubmit={handleSubmit}>
      {/* Fields */}
      <button type="submit">
        {initialData ? "Update Student" : "Add Student"}
      </button>
    </form>
  </div>
</div>
```

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `useState` | State hook |
| `useEffect` | Effect hook |
| `export default` | Default export |
| `...` | Spread operator |
| `[name]` | Computed property |
| `e.preventDefault()` | Stop default behavior |
| `required` | HTML5 validation |
| `type="email"` | Email input type |
| `type="tel"` | Phone input type |
| `placeholder` | Input hint text |

---

## Controlled Components Pattern

All inputs follow the pattern:
```jsx
<input
  name="fieldName"           // Links to formData key
  value={formData.fieldName} // React controls value
  onChange={handleChange}    // Updates state on change
/>
```

**Flow:**
1. User types "a"
2. `onChange` fires → `handleChange(e)`
3. `setFormData({...formData, name: "a"})`
4. React re-renders with new value
5. Input shows "a"

---

## Form Validation

HTML5 validation via attributes:
- `required` - Cannot be empty
- `type="email"` - Must be valid email format
- `type="tel"` - Suggests phone keyboard

**Why HTML5?** Browser handles validation, shows native error messages.

---

## Component Flow

```
CREATE MODE:
1. Form opens with empty fields
2. User enters student details
3. User clicks "Add Student"
4. handleSubmit → onSubmit(formData)
5. Parent creates student via API
6. Modal closes

EDIT MODE:
1. Form opens with initialData
2. useEffect pre-fills fields
3. User modifies fields
4. User clicks "Update Student"
5. handleSubmit → onSubmit(formData)
6. Parent updates student via API
7. Modal closes
```

---

## Example Data

**Form State:**
```javascript
{
  name: "Rahul Sharma",
  department: "Computer Science",
  rollNo: "CS2024001",
  phoneNumber: "+91-9876543210",
  email: "rahul@college.edu"
}
```

**Matches StudentModel schema exactly.**
