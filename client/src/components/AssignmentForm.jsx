import React, { useState, useEffect } from "react";
import { X, Save, Eye } from "lucide-react";
import DetailsModal from "./DetailsModal";

const AssignmentForm = ({
  onClose,
  onSave,
  initialData = null,
  students = [],
  books = [],
}) => {
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "",
    department: "",
    rollNo: "",
    phoneNumber: "",
    bookName: "",
    bookId: "",
    dateTaken: new Date().toISOString().split("T")[0],
  });

  const [student, setStudent] = useState(null);
  const [studentMongoId, setStudentMongoId] = useState("");
  const [book, setBook] = useState(null);
  const [bookMongoId, setBookMongoId] = useState("");
  const [viewDetailsModal, setViewDetailsModal] = useState(null);

  useEffect(() => {
    if (initialData) {
      // Format date to YYYY-MM-DD for input
      const formattedDate = new Date(initialData.dateTaken)
        .toISOString()
        .split("T")[0];
      setFormData({
        ...initialData,
        dateTaken: formattedDate,
      });
      // Find and set the selected student
      const student = students.find(
        (s) =>
          s.name === initialData.studentName && s.rollNo === initialData.rollNo,
      );
      if (student) {
        setStudentMongoId(student._id);
        setStudent(student);
      }
      // Find and set the selected book
      const book = books.find((b) => b.bookId === initialData.bookId);
      if (book) {
        setBookMongoId(book._id);
        setBook(book);
      }
    }
  }, [initialData, students, books]);

  const handleStudentChange = (e) => {
    const studentMongoId = e.target.value;
    const student = students.find((s) => s._id === studentMongoId);

    if (student) {
      setFormData((prev) => ({
        ...prev,
        studentName: student.name,
        department: student.department,
        rollNo: student.rollNo,
        phoneNumber: student.phoneNumber,
      }));
      setStudentMongoId(studentMongoId);
      setStudent(student);
    }
  };

  const handleBookChange = (e) => {
    const selectedBookId = e.target.value;
    const book = books.find((b) => b._id === selectedBookId);

    if (book) {
      setFormData((prev) => ({
        ...prev,
        bookId: book.bookId,
        bookName: book.bookName,
      }));
      setBookMongoId(selectedBookId);
      setBook(book);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow w-full max-w-2xl overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              {initialData ? "Edit Assignment" : "Issue New Book"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Student Details
                </h3>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Student *
                  </label>
                  <div className="flex gap-2">
                    <select
                      required
                      className="flex-1 bg-white border border-gray-200 text-gray-900 px-3 py-2 outline-none rounded-none placeholder-gray-400"
                      onChange={handleStudentChange}
                      value={studentMongoId}
                    >
                      <option value="">Choose a student...</option>
                      {students.map((student) => (
                        <option key={student._id} value={student._id}>
                          {student.name} ({student.rollNo})
                        </option>
                      ))}
                    </select>
                    {student && (
                      <button
                        type="button"
                        onClick={() =>
                          setViewDetailsModal({
                            type: "student",
                            data: student,
                          })
                        }
                        className="px-3 py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button>
                    )}
                  </div>
                </div>

            
              </div>

              {/* Book Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Book Details
                </h3>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Book *
                  </label>
                  <div className="flex gap-2">
                    <select
                      required
                      className="flex-1 bg-white border border-gray-200 text-gray-900 px-3 py-2 outline-none rounded-none placeholder-gray-400"
                      onChange={handleBookChange}
                      value={bookMongoId}
                    >
                      <option value="">Choose a book...</option>
                      {books.map((book) => (
                        <option key={book._id} value={book._id}>
                          {book.bookName} ({book.bookId})
                        </option>
                      ))}
                    </select>
                    {book && (
                      <button
                        type="button"
                        onClick={() =>
                          setViewDetailsModal({
                            type: "book",
                            data: book,
                          })
                        }
                        className="px-3 py-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={20} />
                      </button>
                    )}
                  </div>
                </div>

                {/* book details hidden; view with Details button */}

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Taken
                  </label>
                  <input
                    type="date"
                    name="dateTaken"
                    required
                    className="w-full bg-white border border-gray-200 text-gray-900 px-3 py-2 outline-none rounded-none placeholder-gray-400"
                    value={formData.dateTaken}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Save size={18} />
                {initialData ? "Update Assignment" : "Issue Book"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {viewDetailsModal && (
        <DetailsModal
          data={viewDetailsModal.data}
          type={viewDetailsModal.type}
          onClose={() => setViewDetailsModal(null)}
        />
      )}
    </>
  );
};

export default AssignmentForm;
