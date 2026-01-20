import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BookForm({ initialData = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    bookName: "",
    bookId: "",
    author: "",
    isbn: "",
    copies: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bookName.trim()) newErrors.bookName = "Book name is required";
    if (!formData.bookId.trim()) newErrors.bookId = "Book ID is required";
    if (!formData.author.trim()) newErrors.author = "Author name is required";
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!formData.copies || formData.copies < 1)
      newErrors.copies = "Number of copies must be at least 1";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error.message || "Failed to save book");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? "Edit Book" : "Add New Book"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book Name *
            </label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bookName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Book name"
            />
            {errors.bookName && (
              <p className="text-red-500 text-sm mt-1">{errors.bookName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Book ID *
            </label>
            <input
              type="text"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.bookId ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Unique book ID"
            />
            {errors.bookId && (
              <p className="text-red-500 text-sm mt-1">{errors.bookId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN *
            </label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.isbn ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="ISBN"
            />
            {errors.isbn && (
              <p className="text-red-500 text-sm mt-1">{errors.isbn}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Copies *
            </label>
            <input
              type="number"
              name="copies"
              value={formData.copies}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.copies ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0"
              min="1"
            />
            {errors.copies && (
              <p className="text-red-500 text-sm mt-1">{errors.copies}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
