import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  MapPinIcon,
  ClockIcon,
  UserCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="w-6 h-6" />, path: "/dashboard" },
    { name: "Report", icon: <CubeIcon className="w-6 h-6" />, path: "/report" },
    // { name: "Categories", icon: <TagIcon className="w-6 h-6" />, path: "/categories" },
    // { name: "Locations", icon: <MapPinIcon className="w-6 h-6" />, path: "/locations" },
    // { name: "History", icon: <ClockIcon className="w-6 h-6" />, path: "/history" },
    // { name: "Assignee", icon: <UserCircleIcon className="w-6 h-6" />, path: "/assignee" },
  ];

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white text-gray-800 shadow-lg border border-gray-200"
      >
        {mobileOpen ? (
          <ChevronDoubleLeftIcon className="w-6 h-6" />
        ) : (
          <ChevronDoubleRightIcon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 h-screen transition-all duration-300 ease-in-out flex flex-col justify-between
        ${collapsed ? "w-20" : "w-72"} 
        ${mobileOpen ? "left-0" : "-left-full md:left-0"}
        bg-white border-r border-gray-200 shadow-sm`}
      >
        {/* Top section */}
        <div>
          {/* Logo/Header */}
          <div className={`flex items-center justify-between h-20 ${collapsed ? "px-3" : "px-6"}`}>
            {!collapsed ? (
              <span className="text-gray-900 font-bold text-2xl">LOGO</span>
            ) : (
              <span className="text-gray-900 font-bold text-xl mx-auto"></span>
            )}
            <button
              onClick={toggleSidebar}
              className="hidden md:block text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100"
            >
              {collapsed ? (
                <ChevronDoubleRightIcon className="w-6 h-6" />
              ) : (
                <ChevronDoubleLeftIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="px-2 py-4 space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? "justify-center px-3 py-3" : "px-5 py-3"
                  } rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <span className={`${!collapsed ? "mr-4" : ""}`}>{item.icon}</span>
                {!collapsed && <span className="text-lg font-medium">{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="px-4 py-4">
          <button
            className={`flex items-center w-full justify-center ${
              collapsed ? "py-3" : "py-3 px-4"
            } text-lg text-gray-700 hover:text-white bg-gray-100 hover:bg-red-500 font-semibold rounded-lg transition-all`}
          >
            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            {!collapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
