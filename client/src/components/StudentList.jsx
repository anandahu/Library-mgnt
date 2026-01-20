import React from "react";
import { Trash2, Edit2, Eye } from "lucide-react";

export default function StudentList({
  students,
  onEdit,
  onDelete,
  onViewDetails,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading students...</div>
      </div>
    );
  }

  if (!students || students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No students added yet. Add a new student to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Roll No
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Department
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-800">
                {student.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {student.rollNo}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {student.department}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {student.phoneNumber}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {student.email}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onViewDetails(student)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(student)}
                    className="text-green-600 hover:text-green-800 p-1"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(student._id)}
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
