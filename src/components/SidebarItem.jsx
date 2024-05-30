import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, text, id, setId, index, to }) => {
  return (
    <li
      className={`${
        index === id ? "bg-[#0171FE]" : ""
      } p-2 px-6 rounded-xl text-sm border-[#FCFDFD]`}
      onClick={() => {
        setId(index);
      }}
    >
      <NavLink
        to={to}
        style={{ textDecoration: "none", color: "#FCFDFD" }}
        className={`flex items-center gap-2`}
      >
        {icon}
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
