
const DepartmentCard = ({
  department,
  OnModalOpen,
  onDelete,
  onSelectedData,
}) => {
  
  const { id, name } = department;
  
  const handleEdit = () => {
    OnModalOpen(true);
    onSelectedData(department);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex justify-between items-center flex-col bg-[#0d2538ab] text-white rounded-xl p-4 m-4 gap-4 h-[10rem]">
      <div>
        <p className="font-bold">Department ID: {id}</p>
        <p>Department Name: {name}</p>
      </div>
      <div>
        <button
          className="bg-white hover:bg-grey-300 text-black font-bold py-2 px-4 rounded mr-2"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
