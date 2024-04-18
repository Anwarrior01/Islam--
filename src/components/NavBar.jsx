import { Avatar, Link } from "@mui/material";
import React, { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaBookQuran } from "react-icons/fa6";
import { PiBooksFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FiLogOut } from 'react-icons/fi'; 
import DarkMode from "./DarkMode/DarkMode";
import logoLight from "../pics/logo-light.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { logoutUser, setLoading } from "../features/userSlice";
import { signOut } from "firebase/auth";

export default function NavBar() {
  const user = useSelector((state) => state.data.user.user)
  const isLoading = useSelector((state) => state.data.user.isLoading);

  const dispatch = useDispatch()
  const menus = [
    { name: "Salaat Times", link: "#salaat", icon: MdOutlineAccessTimeFilled },
    { name: "Holy Quran", link: "#quran", icon: FaBookQuran },
    { name: "Hadeeth", link: "#hadeeth", icon: PiBooksFill },
    { name: "Tafseer", link: "#tafseer", icon: GiTeacher },
  ];
  const [open, setOpen] = useState(false);
  const handleLogOut = () =>{
    dispatch(logoutUser());
    signOut(auth)
   dispatch(setLoading(false));
  }
  return (
    <section className="flex gap-6 navbarz" style={{ position: "fixed" }}>
      <div
        className={`bg-[--navbar-bg] navbarz min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-[--navbar-color] px-4 flex flex-col justify-between`}
      >
        <div>
          <div className="py-3 flex justify-between order-2">
            <HiMenuAlt2
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <FiLogOut
                size={26}
                className="cursor-pointer order-1"
                onClick={handleLogOut}
              />
            )}
          </div>
          <div className="mt-4 flex flex-col gap-4 relative  ">
            {menus?.map((menu, i) => (
              <a
                href={menu.link}
                key={i}
                style={{ textDecoration: "none" }}
                className="group flex items-center text-sm gap-3.5 font-medium p-2  hover:bg-[--navbar-color]  "
              >
                <div>
                  {React.createElement(menu.icon, {
                    size: "20",
                    className:
                      "no-underline text-[--select-label] text-2xl group-hover:text-[--navbar-bg] ",
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
              </a>
            ))}
          </div>
        </div>
        <div className="logo">
          <div className="flex justify-center py-20">
            <DarkMode className={"test"} />
          </div>
          <div className="flex flex-col justify-around items-center gap-2">
            <Avatar>{user.username[0]}</Avatar>
            <span>{user.username}</span>
          </div>
        
          <img src={logoLight} width={"110rem"} className="my-8 mx-auto" />
        </div>
      </div>
    </section>
  );
}
