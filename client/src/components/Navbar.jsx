import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeUser } from "../utils/userSlics";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logout from "../services/logout";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((store) => store.user);
  const handleLogout = async () => {
    try {
      await logout();
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <>
      <header>
        <nav className="flex justify-between items-center text-white py-5 text-2xl">
          <Link to="/">
            <h1>Task Manager</h1>
          </Link>
          <span className="flex items-center gap-4">
            <p>Wellcome {store?.name}!</p>
            <button onClick={handleLogout} className="bg-[#BDE037] p-3 rounded-lg">Logout</button>
          </span>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
