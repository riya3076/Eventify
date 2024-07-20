/**
 * Author: Keyur Pradipbhai Khant
 * Banner ID: B00935171
 */
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../Container";
import { logo } from "../../assets/home";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/userSlice";

interface NavLinkData {
  name: string;
  to: string;
  requireAuth?: boolean;
}

const navLinks: NavLinkData[] = [
  { name: "Home", to: "/" },
  { name: "Events", to: "/events" },
  { name: "Tickets", to: "/mytickets", requireAuth: true },
  { name: "Dashboard", to: "/dashboard", requireAuth: true },
  { name: "Calendar", to: "/calendar", requireAuth: true },
  { name: "Wishlist", to: "/wishlist", requireAuth: true },
  { name: "FAQs", to: "/faqs" },
  { name: "Contact Us", to: "/contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef: any = useRef(null);

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('id');
    navigate('/');
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <nav className="py-2 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-4 items-center">
            <Link to="/">
              <img className="h-[40px] w-[140px]" src={logo} alt="Workflow" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  (!link.requireAuth || user) && (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      className={({ isActive }) =>
                        `hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-button-primary text-white' : 'text-gray-700'}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )
                ))}
              </div>
            </div>
          </div>

          {user ? (
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsDropdownOpen(prevIsDropdownOpen => !prevIsDropdownOpen)}
                className="bg-button-primary hover:bg-button-primary-hover text-white px-4 py-1 rounded-md text-sm"
              >
                {user.firstName + ' ' + user.lastName}
              </button>
              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-2 py-2 w-48 bg-gray-100 rounded-md shadow-xl z-20">
                  <Link to="/profile" onClick={handleProfileClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Profile</Link>
                  <Link onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200" to={""}>Logout</Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="hidden md:block bg-button-primary hover:bg-button-primary-hover text-white px-4 py-1 rounded-md text-sm"
            >
              Log In / Signup
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="md:hidden bg-gray-800 p-2 px-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50 transition-all" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
              {navLinks.map((link) => (
                (!link.requireAuth || user) && (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className={({ isActive }) =>
                      `hover:bg-button-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-button-primary text-white' : 'text-gray-700'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              ))}
              {user ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(prevIsDropdownOpen => !prevIsDropdownOpen)}
                    className="bg-button-primary text-white flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium"
                  >
                    {user.firstName + ' ' + user.lastName}
                    <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
                  </button>
                  {isDropdownOpen && (
                    <div ref={dropdownRef} className="bg-gray-100 rounded-md">
                      <Link
                        to="/profile" onClick={handleProfileClick}
                        className="block text-md hover:bg-gray-200 px-3 py-2"
                      >
                        Profile
                      </Link>
                      <Link
                        onClick={handleSignOut}
                        to=""
                        className="block text-md hover:bg-gray-200 px-3 py-2"
                      >
                        Logout
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="bg-button-primary text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Log In / Signup
                </Link>
              )}
            </div>
          </div>
        )}

      </Container>
    </nav >
  );
};

export default Navbar;
