import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AssignmentForm({ initialData = null, students, books, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    studentId: "",
    bookId: "",
    subId: "", // New field for the specific copy
    dateOfIssue: new Date().toISOString().split('T')[0],
    dueDate: "",
  });

  // Helper to find the currently selected book object
  const selectedBook = books.find(b => b._id === formData.bookId);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dateOfIssue: initialData.dateOfIssue ? initialData.dateOfIssue.split('T')[0] : "",
        dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset subId if the main book changes
    if (name === "bookId") {
      setFormData({ ...formData, bookId: value, subId: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Assignment" : "New Assignment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Select Student */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Student</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              required
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.rollNo})
                </option>
              ))}
            </select>
          </div>

          {/* Select Book */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book</label>
            <select
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              required
            >
              <option value="">Select a book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.bookName} by {book.author}
                </option>
              ))}
            </select>
          </div>

          {/* Select Specific Copy (Sub-ID) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Copy ID</label>
            <select
              name="subId"
              value={formData.subId}
              onChange={handleChange}
              disabled={!formData.bookId} // Disable if no book is selected
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 disabled:bg-gray-100"
              required
            >
              <option value="">Select a copy</option>
              {selectedBook?.subIds && selectedBook.subIds.length > 0 ? (
                selectedBook.subIds.map((id, index) => (
                  <option key={index} value={id}>{id}</option>
                ))
              ) : (
                <option value="" disabled>No copies available</option>
              )}
            </select>
            {!formData.bookId && <p className="text-xs text-gray-500 mt-1">Please select a book first.</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Issue Date</label>
              <input
                type="date"
                name="dateOfIssue"
                value={formData.dateOfIssue}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {initialData ? "Update Assignment" : "Issue Book"}
          </button>
        </form>
      </div>
    </div>
  );
}