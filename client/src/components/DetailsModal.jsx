import React from "react";
import { X } from "lucide-react";

export default function DetailsModal({ data, type, onClose }) {
  if (!data) return null;

  const isStudent = type === "student";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {isStudent ? "Student Details" : "Book Details"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-3">
          {isStudent ? (
            <>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Roll Number</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.rollNo}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.department}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.phoneNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.email}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-gray-600">Book Name</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.bookName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Book ID</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.bookId}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Author</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.author}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">ISBN</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.isbn}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Copies</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.copies}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p
                  className={`text-lg font-semibold ${data.isAvailable ? "text-green-600" : "text-red-600"}`}
                >
                  {data.isAvailable ? "Available" : "Not Available"}
                </p>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
