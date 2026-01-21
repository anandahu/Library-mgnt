import React from "react";
import {
  Book,
  CheckCircle,
  Clock,
  Edit2,
  Trash2,
  AlertCircle,
} from "lucide-react";
import {
  calculateFine,
  formatFine,
  getDaysOverdue,
} from "../utils/fineCalculator";

const AssignmentList = ({ assignments, onReturn, onEdit, onDelete }) => {
  if (assignments.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
        <Book size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-900">
          No books currently issued
        </h3>
        <p className="text-gray-500 mt-2">
          Start by issuing a book to a student.
        </p>
      </div>
    );
  }

  // Calculate total fine for all overdue books
  const totalFine = assignments.reduce((sum, assignment) => {
    if (!assignment.returnDate) {
      return sum + calculateFine(assignment.dateOfIssue);
    }
    return sum;
  }, 0);

  const hasOverdueBooks = assignments.some(
    (assignment) =>
      !assignment.returnDate && getDaysOverdue(assignment.dateOfIssue) > 0,
  );

  return (
    <>
      {hasOverdueBooks && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle
            className="text-red-600 flex-shrink-0 mt-0.5"
            size={20}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Outstanding Fines</h3>
            <p className="text-red-700 text-sm mt-1">
              Total Fine:{" "}
              <span className="font-bold text-lg">{formatFine(totalFine)}</span>
            </p>
            <p className="text-red-600 text-xs mt-2">
              Some books have been issued for more than 10 days and fines are
              applicable.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => {
          const isReturned = !!assignment.returnDate;
          const fine = calculateFine(
            assignment.dateOfIssue,
            assignment.returnDate,
          );

          const daysDiff = Math.floor(
            (new Date(assignment.returnDate || new Date()) -
              new Date(assignment.dateOfIssue)) /
            (1000 * 60 * 60 * 24),
          );

          // Access populated data safely
          const studentName = assignment.studentId?.name || "Unknown Student";
          const department = assignment.studentId?.department || "N/A";
          const rollNo = assignment.studentId?.rollNo || "N/A";
          const bookName = assignment.bookId?.bookName || "Unknown Book";
          const bookDisplayId = assignment.subId || "N/A";

          return (
            <div
              key={assignment._id}
              className={`group relative bg-white rounded-xl p-6 border ${fine > 0 ? "border-red-200 bg-red-50" : "border-gray-200"
                } transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${isReturned ? "opacity-80" : ""
                }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`p-3 rounded-lg ${fine > 0 ? "bg-red-100" : "bg-gray-50"}`}
                >
                  <Book
                    className={
                      fine > 0
                        ? "text-red-600"
                        : isReturned
                          ? "text-gray-400"
                          : "text-emerald-500"
                    }
                    size={24}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Edit Assignment"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(assignment._id)}
                    className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Assignment"
                  >
                    <Trash2 size={16} />
                  </button>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${isReturned
                      ? "bg-gray-100 text-gray-600"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}
                  >
                    {isReturned ? (
                      <>
                        <CheckCircle size={12} /> Returned
                      </>
                    ) : (
                      <>
                        <Clock size={12} /> Issued
                      </>
                    )}
                  </span>
                </div>
              </div>

              {fine > 0 && (
                <div className="mb-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-xs text-red-600 font-semibold">FINE DUE</p>
                  <p className="text-lg font-bold text-red-700">
                    {formatFine(fine)}
                  </p>
                  {/* days overdue hidden per user preference */}
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {bookName}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Copy ID: {bookDisplayId}
              </p>

              <div className="space-y-2 border-t border-gray-100 pt-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Student</span>
                  <span className="text-gray-900 font-medium text-right line-clamp-1">
                    {studentName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dept/Roll</span>
                  <span className="text-gray-900 text-right">
                    {department} • {rollNo}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Issued On</span>
                  <span className="text-gray-900 text-right">
                    {new Date(assignment.dateOfIssue).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Days Out</span>
                  <span
                    className={`text-right font-medium ${daysDiff > 10 ? "text-red-600" : "text-gray-900"}`}
                  >
                    {daysDiff} day{daysDiff !== 1 ? "s" : ""}
                  </span>
                </div>
                {isReturned && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Returned On</span>
                    <span className="text-emerald-600 text-right">
                      {new Date(
                        assignment.returnDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {!isReturned && (
                <button
                  onClick={() => onReturn(assignment._id)}
                  className={`w-full mt-2 py-2.5 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${fine > 0
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                >
                  Mark as Returned
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AssignmentList;
