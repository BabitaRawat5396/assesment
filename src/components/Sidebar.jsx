import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { sidebarList } from "../data/sidebarList";
import * as Icons from "react-icons/ri";

const Sidebar = () => {
  const [id, setId] = useState(0);

  return (
    <ul className="bg-[#011627] text-[#FCFDFD] rounded-tr-2xl rounded-br-2xl h-full pt-20 px-4 pb-6  fixed w-[25%]">
      {sidebarList.map((item, index) => {
        const Icon = Icons[item.icon];
        return (
          <SidebarItem
            key={index}
            icon={Icon && <Icon />}
            text={item.text}
            id={id}
            setId={setId}
            index={index}
            to={item.to}
          />
        );
      })}
    </ul>
  );
};

export default Sidebar;
