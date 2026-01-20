import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function BookForm({ initialData = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    publication: "",
    year: "",
    subIds: "" // Handle as string input first
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        subIds: initialData.subIds ? initialData.subIds.join(", ") : ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert comma separated string to array and trim whitespace
    const processedData = {
      ...formData,
      subIds: formData.subIds.split(",").map(id => id.trim()).filter(id => id !== "")
    };
    onSubmit(processedData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Book" : "Add New Book"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Name</label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Publication</label>
            <input
              type="text"
              name="publication"
              value={formData.publication}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            />
          </div>
          
          {/* New Input for Sub IDs */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Copies IDs (Comma separated)
            </label>
            <input
              type="text"
              name="subIds"
              value={formData.subIds}
              onChange={handleChange}
              placeholder="e.g., A101, A102, A103"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            />
            <p className="text-xs text-gray-500 mt-1">Enter unique IDs for each copy of the book.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {initialData ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}