import React, { useState, useContext } from "react";
import { HiMenu } from "react-icons/hi";
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "./provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut Successful");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="relative">
      <nav
        className="flex justify-between items-center bg-transparent backdrop-blur-md px-4 md:px-6"
        style={{ paddingTop: "6px", paddingBottom: "6px" }}
      >
        <div className="flex items-center gap-1">
          <div
            className="text-3xl md:hidden cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <IoCloseOutline /> : <HiMenu />}
          </div>

          <img src="/logo.png" className="size-10" alt="Evenzy Logo" />
          <p className="font-semibold text-xl hidden md:block">Evenzy</p>
        </div>

        <div className="hidden md:flex">
          <ul className="flex gap-4 items-center">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/events">Explore Events</NavLink>
            </li>
            <li>
              <NavLink to="/events-calendar">Calendar</NavLink>
            </li>
            <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li>
          </ul>
        </div>

        {user ? (
          <div className="flex gap-3">
            <div>
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="size-9 rounded-full border-2 border-orange-600 cursor-pointer"
                  title={user.displayName || "No name"}
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                />

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-lg z-50 text-sm">
                    <NavLink
                      to="/create-event"
                      className="block px-4 py-2 hover:bg-orange-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Create Event
                    </NavLink>
                    <NavLink
                      to="/manage-events"
                      className="block px-4 py-2 hover:bg-orange-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Manage Events
                    </NavLink>
                    <NavLink
                      to="/joined-events"
                      className="block px-4 py-2 hover:bg-orange-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Joined Events
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={handleLogOut}
              className="flex cursor-pointer items-center gap-1"
            >
              <IoLogOutOutline className="text-3xl md:text-xl" />
              <p className="hidden md:block">Logout</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => navigate("/login")}
            className="flex cursor-pointer items-center gap-1"
          >
            <IoLogInOutline className="text-3xl md:text-xl" />
            <p className="hidden md:block">Login</p>
          </div>
        )}
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md z-50 py-4 px-6 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                className="block py-2 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className="block py-2 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events-calendar"
                className="block py-2 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calendar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="block py-2 hover:text-orange-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
