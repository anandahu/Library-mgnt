import React, { useState, useEffect } from "react";
import { Plus, BookOpen, Users, Book } from "lucide-react";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import DetailsModal from "./components/DetailsModal";
import {
  read,
  create,
  update,
  returned,
  remove,
  readStudents,
  createStudent,
  updateStudent,
  removeStudent,
  readBooks,
  createBook,
  updateBook,
  removeBook,
} from "./api/userApi";

function App() {
  // Tab state
  const [activeTab, setActiveTab] = useState("assignments");

  // Assignment states
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [assignments, setAssignments] = useState([]);

  // Student states
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [viewingStudent, setViewingStudent] = useState(null);

  // Book states
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [viewingBook, setViewingBook] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Initial data load
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [assignmentsData, studentsData, booksData] = await Promise.all([
        read().catch(() => []),
        readStudents().catch(() => []),
        readBooks().catch(() => []),
      ]);
      setAssignments(assignmentsData);
      setStudents(studentsData);
      setBooks(booksData);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== ASSIGNMENT HANDLERS =====
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

  const handleReturnBook = async (id) => {
    try {
      await returned(id);
      const items = await read();
      setAssignments(items);
    } catch (error) {
      console.error("Error returning book", error);
      alert(error.message || "Failed to mark returned");
    }
  };

  const handleDeleteAssignment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?"))
      return;
    try {
      await remove(id);
      const items = await read();
      setAssignments(items);
    } catch (error) {
      console.error("Error deleting assignment", error);
      alert(error.message || "Failed to delete assignment");
    }
  };

  const openEditAssignmentForm = (assignment) => {
    setEditingAssignment(assignment);
    setShowAssignmentForm(true);
  };

  const closeAssignmentForm = () => {
    setShowAssignmentForm(false);
    setEditingAssignment(null);
  };

  // ===== STUDENT HANDLERS =====
  const handleCreateOrUpdateStudent = async (formData) => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);
        setShowStudentForm(false);
        setEditingStudent(null);
      } else {
        await createStudent(formData);
        setShowStudentForm(false);
      }
      const items = await readStudents();
      setStudents(items);
    } catch (error) {
      console.error("Error saving student", error);
      alert(error.message || "Failed to save student");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      await removeStudent(id);
      const items = await readStudents();
      setStudents(items);
    } catch (error) {
      console.error("Error deleting student", error);
      alert(error.message || "Failed to delete student");
    }
  };

  const openEditStudentForm = (student) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  const closeStudentForm = () => {
    setShowStudentForm(false);
    setEditingStudent(null);
  };

  // ===== BOOK HANDLERS =====
  const handleCreateOrUpdateBook = async (formData) => {
    try {
      if (editingBook) {
        await updateBook(editingBook._id, formData);
        setShowBookForm(false);
        setEditingBook(null);
      } else {
        await createBook(formData);
        setShowBookForm(false);
      }
      const items = await readBooks();
      setBooks(items);
    } catch (error) {
      console.error("Error saving book", error);
      alert(error.message || "Failed to save book");
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await removeBook(id);
      const items = await readBooks();
      setBooks(items);
    } catch (error) {
      console.error("Error deleting book", error);
      alert(error.message || "Failed to delete book");
    }
  };

  const openEditBookForm = (book) => {
    setEditingBook(book);
    setShowBookForm(true);
  };

  const closeBookForm = () => {
    setShowBookForm(false);
    setEditingBook(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-200">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex justify-between items-center mb-2">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 p-2.5 rounded-xl shadow-sm">
                <BookOpen size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">LibraryMNGT</h1>
                <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                  Library Management System
                </p>
              </div>
            </div>

            {activeTab === "assignments" && (
              <button
                onClick={() => setShowAssignmentForm(true)}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-all font-semibold"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Issue Book</span>
              </button>
            )}

            {activeTab === "students" && (
              <button
                onClick={() => setShowStudentForm(true)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all font-semibold"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add Student</span>
              </button>
            )}

            {activeTab === "books" && (
              <button
                onClick={() => setShowBookForm(true)}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-all font-semibold"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add Book</span>
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-0 border-t border-gray-200">
            <button
              onClick={() => setActiveTab("assignments")}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === "assignments"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                Assignments
              </div>
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === "students"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Users size={18} />
                Students
              </div>
            </button>
            <button
              onClick={() => setActiveTab("books")}
              className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === "books"
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Book size={18} />
                Books
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <>
            {/* Assignments Tab */}
            {activeTab === "assignments" && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Book Assignments</h2>
                  <p className="text-gray-500">
                    Manage book issuance and returns with automated fine
                    calculation
                  </p>
                </div>
                <AssignmentList
                  assignments={assignments}
                  onReturn={handleReturnBook}
                  onDelete={handleDeleteAssignment}
                  onEdit={openEditAssignmentForm}
                />
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Students</h2>
                  <p className="text-gray-500">
                    Manage student information and details
                  </p>
                </div>
                <StudentList
                  students={students}
                  isLoading={false}
                  onEdit={openEditStudentForm}
                  onDelete={handleDeleteStudent}
                  onViewDetails={setViewingStudent}
                />
              </div>
            )}

            {/* Books Tab */}
            {activeTab === "books" && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">Books</h2>
                  <p className="text-gray-500">
                    Manage books in your library inventory
                  </p>
                </div>
                <BookList
                  books={books}
                  isLoading={false}
                  onEdit={openEditBookForm}
                  onDelete={handleDeleteBook}
                  onViewDetails={setViewingBook}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {showAssignmentForm && (
        <AssignmentForm
          onClose={closeAssignmentForm}
          onSave={handleCreateOrUpdateAssignment}
          initialData={editingAssignment}
          students={students}
          books={books}
        />
      )}

      {showStudentForm && (
        <StudentForm
          initialData={editingStudent}
          onSubmit={handleCreateOrUpdateStudent}
          onClose={closeStudentForm}
        />
      )}

      {showBookForm && (
        <BookForm
          initialData={editingBook}
          onSubmit={handleCreateOrUpdateBook}
          onClose={closeBookForm}
        />
      )}

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
    </div>
  );
}

export default App;
