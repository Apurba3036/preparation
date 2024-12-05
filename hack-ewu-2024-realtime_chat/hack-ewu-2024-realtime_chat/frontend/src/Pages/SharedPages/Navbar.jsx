import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";

import { useContext } from "react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {})
          .catch((error) => console.log(error));
        Swal.fire({
          title: "Log Out!",
          text: "Log Out Successfully",
          icon: "success",
        });
      }
    });
  };

  const isAdmin = true;

  const navitems = (
    <>
      <li>
        <Link className="font-bold text-black md:text-white" to="/">
          Home
        </Link>
      </li>
  
      <li>
        <Link className="font-bold text-black md:text-white" to="/listing/new">
          Create new list
        </Link>
      </li>
      <li>
        <Link className="font-bold text-black md:text-white" to="/listing">
          All Listings
        </Link>
      </li>
      <li>
        <Link className="font-bold text-black md:text-white" to="/heat">
          Heat MAP
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar mx-auto z-10 bg-slate-900 md:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-black mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navitems}
          </ul>
        </div>
        <Link to="/" className="w-10 rounded-full">
          <img
            alt="pic"
            src="https://play-lh.googleusercontent.com/T4lbDfq91wNFLbTB_YaCafqJN1ucdBocu0BeEKSU1Gbn9Kkq9B-4AwMDiZRIMOOuawI"></img>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navitems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-bottom dropdown-end z-10 dropdown-hover">
            <div tabIndex={0} className="m-1 text-center">
              <div className="flex flex-col items-center justify-center">
                <img
                  className="w-10 h-10 rounded-full"
                  alt="User profile"
                  src={""}
                />
                <p className="mt-2 font-thin text-sm text-white">
                  User Profile
                </p>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box text-black w-64 p-4 shadow-lg"
            >
              <li className="mb-4 flex items-center gap-4">
                <img
                  className="w-20 h-16  rounded-full"
                  alt="User profile"
                  src={""}
                />
                <div className="flex flex-col">
                  <p className="font-bold ">{user.name || "User Name"}</p>
                  <p className="text-bold text-gray-600">
                    {user.email || "user@example.com"}
                  </p>
                </div>
              </li>
              <li className="mb-3">
                <Link
                  className="font-bold text-orange-500 hover:text-blue-700"
                  to="/#"
                >
                  Your Profile
                </Link>
              </li>
              {isAdmin ? (
                <li className="mb-3">
                  <Link
                    className="font-bold text-orange-500 hover:text-blue-700"
                    to="/#"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <> </>
              )}
              <li>
                <Link
                  onClick={handleLogout}
                  className="btn btn-outline btn-warning w-full"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-outline btn-warning">
            Login
          </Link>
        )}

        {/* {
                 user? <><Link onClick={handleLogout} className="btn btn-outline btn-warning">Log Out</Link></>: <Link to="/login" className="btn btn-outline btn-warning">Login</Link>
               } */}
      </div>
    </div>
  );
};

export default Navbar;
