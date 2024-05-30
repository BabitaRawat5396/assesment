import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment } from "../services/operations/departmentAPI";

const DepartmentFormModal = ({ onSave, onClose, department, handleCreate }) => {
  const [name, setName] = useState(department ? department.name : "");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (department) {
      onSave({ id: department.id, name });
    } else {
      handleCreate(name);
    }

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">
          {department ? "Edit Department" : "Add Department"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Department Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {department ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentFormModal;
