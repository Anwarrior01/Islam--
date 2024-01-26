import { Link } from "@mui/material";
import React, { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaBookQuran } from "react-icons/fa6";
import { PiBooksFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import DarkMode from "./DarkMode/DarkMode";

export default function NavBar() {
  const menus = [
    { name: "Salaat Times", link: "/", icon: MdOutlineAccessTimeFilled },
    { name: "Holy Quran", link: "/", icon: FaBookQuran },
    { name: "Hadeeth", link: "/", icon: PiBooksFill },
    { name: "Lectures", link: "/", icon: GiTeacher },
  ];
  const [open, setOpen] = useState(false);
  return (
    <section className="flex gap-6 navbarz" style={{position:"fixed"}}>
    
      <div
        className={`bg-[--navbar-bg] navbarz min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-[--navbar-color] px-4 `}
      >
        <div className="py-3 flex justify-end">
        
          <HiMenuAlt2
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative  ">
          {menus?.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              style={{ textDecoration: "none" }}
              className="group flex items-center text-sm gap-3.5 font-medium p-2  hover:bg-[--navbar-color]  "
            >
              <div>
                {React.createElement(menu.icon, {
                  size: "20",
                  className: "no-underline text-[--select-label] text-2xl group-hover:text-[--navbar-bg] ",
                })}
              </div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`group-hover:text-[--navbar-bg] group-hover:duration-100 no-underline text-[--navbar-color] text-2xl whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden "
                } `}
              >
                {menu.name}
              </h2>
              {/* <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden
                group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2> */}
            </Link>
          ))} <div className="flex justify-center"><DarkMode  className={"test"}/></div>
        </div>
      </div>
    </section>
  );
}
