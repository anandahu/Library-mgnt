# fineCalculator.js - Fine Calculation Utility

## Purpose
Contains **utility functions** for calculating library fines based on how long a book has been borrowed.

---

## Business Rules

| Days Borrowed | Fine Amount |
|---------------|-------------|
| 1-10 days | ₹0 (No fine) |
| 11 days | ₹1 |
| 12 days | ₹2 |
| 13 days | ₹4 |
| 14 days | ₹8 |
| 15+ days | Doubles each day (₹16, ₹32, ₹64...) |

---

## Complete Code with Explanations

### calculateFine Function

```javascript
export const calculateFine = (dateTaken, dateReturned = null) => {
```
**Line Explanation:**
- `export` - Make function importable
- `const` - Function assigned to constant
- `dateTaken` - When book was issued
- `dateReturned = null` - Optional; if not provided, uses current date
- `=>` - Arrow function syntax
- **Why?** Calculate fine based on duration

---

```javascript
  if (!dateTaken) return 0;
```
**Line Explanation:**
- Guard clause: if no date, return 0
- **Why?** Prevent errors from invalid input

---

```javascript
  const currentDate = dateReturned ? new Date(dateReturned) : new Date();
  const takeDate = new Date(dateTaken);
```
**Line Explanation:**
- `new Date()` - Create Date object
- Ternary operator: if `dateReturned` exists, use it; else use now
- **Why?** Handle both returned and still-issued books

---

```javascript
  const timeDiff = currentDate - takeDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
```
**Line Explanation:**
- Date subtraction gives milliseconds
- Convert to days: `ms / 1000 / 60 / 60 / 24`
- `Math.floor()` - Round down to whole days
- **Why?** Calculate exact days borrowed

**Math breakdown:**
```
1000 ms = 1 second
60 seconds = 1 minute
60 minutes = 1 hour
24 hours = 1 day

1000 * 60 * 60 * 24 = 86,400,000 ms per day
```

---

```javascript
  if (daysDiff <= 10) {
    return 0;
  } else if (daysDiff === 11) {
    return 1;
  } else if (daysDiff === 12) {
    return 2;
  } else if (daysDiff === 13) {
    return 4;
  } else if (daysDiff === 14) {
    return 8;
  }
```
**Line Explanation:**
- `if/else if` chain for different day ranges
- Returns fine amount in rupees
- **Why?** Apply tiered fine structure

---

```javascript
  } else {
    let fine = 8;
    for (let i = 15; i <= daysDiff; i++) {
      fine *= 2;
    }
    return fine;
  }
```
**Line Explanation:**
- `let fine = 8` - Start from day 14's fine
- `for` loop - Iterate each day beyond 14
- `fine *= 2` - Double the fine (`fine = fine * 2`)
- **Why?** Exponential growth for very late returns

**Example for 17 days:**
```
Day 14: ₹8 (starting point)
Day 15: ₹8 * 2 = ₹16
Day 16: ₹16 * 2 = ₹32
Day 17: ₹32 * 2 = ₹64
```

---

### formatFine Function

```javascript
export const formatFine = (fine) => {
  return `₹${fine}`;
};
```
**Line Explanation:**
- Template literal with rupee symbol
- **Why?** Consistent display format

---

### getDaysOverdue Function

```javascript
export const getDaysOverdue = (dateTaken, dateReturned = null) => {
  if (!dateTaken) return 0;

  const currentDate = dateReturned ? new Date(dateReturned) : new Date();
  const takeDate = new Date(dateTaken);

  const timeDiff = currentDate - takeDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff > 10 ? daysDiff - 10 : 0;
};
```
**Line Explanation:**
- Same date calculation as `calculateFine`
- Returns days PAST the 10-day grace period
- Ternary: if past 10 days, return overdue count; else 0
- **Why?** Show "X days overdue" in UI

**Examples:**
```
8 days borrowed → 0 days overdue
12 days borrowed → 2 days overdue
15 days borrowed → 5 days overdue
```

---

## Keywords Reference

| Keyword | Meaning |
|---------|---------|
| `export` | Make importable |
| `const` | Constant variable |
| `=>` | Arrow function |
| `new Date()` | Create Date object |
| `Math.floor()` | Round down |
| `if/else if` | Conditional branching |
| `for` | Loop |
| `let` | Mutable variable |
| `*=` | Multiply and assign |
| `` `₹${fine}` `` | Template literal |
| `? :` | Ternary operator |

---

## Usage in Components

```javascript
import { calculateFine, formatFine, getDaysOverdue } from '../utils/fineCalculator';

// In assignment list:
const fine = calculateFine(assignment.dateOfIssue, assignment.returnDate);
const displayFine = formatFine(fine);  // "₹64"
const overdueDays = getDaysOverdue(assignment.dateOfIssue);  // 5
```

---

## Fine Growth Visualization

```
Days:  10    11    12    13    14    15    16    17    18
Fine:  ₹0    ₹1    ₹2    ₹4    ₹8   ₹16   ₹32   ₹64  ₹128
              └──────────────────┘     └──────────────────┘
                   Linear growth             Exponential
```
