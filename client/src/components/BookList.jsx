import React, { useState } from "react";
import { Trash2, Edit2, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { deleteSubId } from "../api/userApi";

export default function BookList({ books, onEdit, onDelete, refreshBooks }) {
  // State to toggle visibility of sub-ids for each book
  const [expandedBook, setExpandedBook] = useState(null);

  const toggleExpand = (id) => {
    if (expandedBook === id) setExpandedBook(null);
    else setExpandedBook(id);
  };

  const handleDeleteSubId = async (bookId, subId) => {
    if (!window.confirm(`Are you sure you want to remove copy ID: ${subId}?`))
      return;

    try {
      await deleteSubId(bookId, subId);
      if (refreshBooks) {
        refreshBooks(); // Reload the list to show updated copies
      }
    } catch (error) {
      console.error("Error deleting copy:", error);
      alert(error.message || "Failed to delete copy");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Book Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Publication
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Copies
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book) => (
            <React.Fragment key={book._id}>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.bookName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.publication}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="font-bold">
                    {book.subIds ? book.subIds.length : 0}
                  </span>
                  <button
                    onClick={() => toggleExpand(book._id)}
                    className="ml-2 text-blue-600 hover:text-blue-900 text-xs underline"
                  >
                    {expandedBook === book._id ? "Hide IDs" : "Show IDs"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(book)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => onDelete(book._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
              {/* Expandable row for Sub IDs */}
              {expandedBook === book._id && (
                <tr className="bg-gray-50">
                  <td colSpan="5" className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      <strong>Managed Copies (Sub-IDs):</strong>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {book.subIds && book.subIds.length > 0 ? (
                          book.subIds.map((subId, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {subId}
                              <button
                                onClick={() =>
                                  handleDeleteSubId(book._id, subId)
                                }
                                className="ml-2 text-red-500 hover:text-red-700"
                                title="Remove this damaged copy"
                              >
                                <XCircle size={14} />
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 italic">
                            No specific copy IDs added.
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
