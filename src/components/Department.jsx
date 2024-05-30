import React, { useState, useEffect } from "react";
import DepartmentCard from "./DepartmentCard";
import { FaPlus } from "react-icons/fa";
import {
  createDepartment,
  deleteDepartment,
  fetchAllDepartments,
  updateDepartment,
} from "../services/operations/departmentAPI";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import DepartmentFormModal from "./FormModal";

const Department = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      fetchDepartments(token);
    }
  }, []);

  const fetchDepartments = async (token) => {
    setLoading(true);
    const data = await fetchAllDepartments(token);
    console.log(data);
    setDepartments(data);
    setLoading(false);
  };

  const handleSave = async (data) => {
    dispatch(updateDepartment(data, token));
    setIsModalOpen(false);
    // Refresh the departments list
    await fetchDepartments(token);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleDelete = async (departmentId) => {
    if (token) {
      dispatch(deleteDepartment(departmentId, token));
      await fetchDepartments(token);
    }
  };

  const handleCreate = async (name) => {
    dispatch(createDepartment(name, token));
    await fetchDepartments(token);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-3">
          {departments &&
            departments.map((department, index) => (
              <DepartmentCard
                key={index}
                department={department}
                OnModalOpen={setIsModalOpen}
                onDelete={handleDelete}
                onSelectedData={setSelectedDepartment}
              />
            ))}
          <div className="flex justify-center items-center bg-[#0d2538ab] text-white rounded-xl p-4 m-4 gap-4 h-[10rem]">
            <FaPlus
              onClick={() => {
                setSelectedDepartment(null);
                setIsModalOpen(true);
              }}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <DepartmentFormModal
          onSave={handleSave}
          onClose={handleClose}
          department={selectedDepartment}
          handleCreate={handleCreate}
        />
      )}
    </div>
  );
};

export default Department;
