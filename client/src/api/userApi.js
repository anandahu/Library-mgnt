// API helpers for CRUD operations
const ASSIGNMENTS_BASE = "/api/v1/assignments";
const STUDENTS_BASE = "/api/v1/students";
const BOOKS_BASE = "/api/v1/books";

async function safe(url, options = {}) {
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type");
  let data;
  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = { message: (await res.text()) || "Unknown error" };
  }

  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

// ===== ASSIGNMENTS API =====
export async function read() {
  const data = await safe(ASSIGNMENTS_BASE);
  // Expecting { status: 'success', data: { assignments: [...] } }
  if (data && data.status === "success") return data.data.assignments;
  if (Array.isArray(data)) return data;
  return [];
}

export async function create(payload) {
  return safe(ASSIGNMENTS_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function update(id, payload) {
  return safe(`${ASSIGNMENTS_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function returned(id) {
  return safe(`${ASSIGNMENTS_BASE}/${id}/return`, { method: "PUT" });
}

export async function remove(id) {
  // Some delete endpoints don't return JSON, but safe handles text fallback
  return safe(`${ASSIGNMENTS_BASE}/${id}`, { method: "DELETE" });
}

// ===== STUDENTS API =====
export async function readStudents() {
  const data = await safe(STUDENTS_BASE);
  if (data && data.status === "success") return data.data.students;
  if (Array.isArray(data)) return data;
  return [];
}

export async function createStudent(payload) {
  return safe(STUDENTS_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateStudent(id, payload) {
  return safe(`${STUDENTS_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function removeStudent(id) {
  return safe(`${STUDENTS_BASE}/${id}`, { method: "DELETE" });
}

export async function getStudent(id) {
  return safe(`${STUDENTS_BASE}/${id}`);
}

// ===== BOOKS API =====
export async function readBooks() {
  const data = await safe(BOOKS_BASE);
  if (data && data.status === "success") return data.data.books;
  if (Array.isArray(data)) return data;
  return [];
}

export async function createBook(payload) {
  return safe(BOOKS_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateBook(id, payload) {
  return safe(`${BOOKS_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function removeBook(id) {
  return safe(`${BOOKS_BASE}/${id}`, { method: "DELETE" });
}

export async function getBook(id) {
  return safe(`${BOOKS_BASE}/${id}`);
}

export default {
  // Assignments
  read,
  create,
  update,
  returned,
  remove,
  // Students
  readStudents,
  createStudent,
  updateStudent,
  removeStudent,
  getStudent,
  // Books
  readBooks,
  createBook,
  updateBook,
  removeBook,
  getBook,
  safe,
};
