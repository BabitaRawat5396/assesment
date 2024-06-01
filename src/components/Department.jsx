import { useState, useEffect } from "react";
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
  const { loading, departments } = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllDepartments(token));
    }
  }, []);

  const handleSave = async (data) => {
    dispatch(updateDepartment(data, token));
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleDelete = async (departmentId) => {
    if (token) {
      dispatch(deleteDepartment(departmentId, token));
    }
  };

  const handleCreate = async (name) => {
    dispatch(createDepartment(name, token));
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
