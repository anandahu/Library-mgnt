import React from "react";
import { Trash2, Edit2, Eye } from "lucide-react";

export default function BookList({
  books,
  onEdit,
  onDelete,
  onViewDetails,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading books...</div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No books added yet. Add a new book to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Book Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Book ID
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Author
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              ISBN
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Copies
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-800">
                {book.bookName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{book.bookId}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{book.author}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{book.isbn}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{book.copies}</td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onViewDetails(book)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(book)}
                    className="text-green-600 hover:text-green-800 p-1"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(book._id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
