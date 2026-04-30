import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://job-wala-oj9k.onrender.com/api/v1/user/logout"
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logged out.");
    } finally {
      setUser({});
      setIsAuthorized(false);
      navigateTo("/login");
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">

        {/* 🔥 LOGO CHANGED */}
        <div className="logo">
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            Job-Wala
          </h2>
        </div>

        <ul className={!show ? "menu" : "show-menu menu"}>

          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>

          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>

          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANTS"
                : "MY APPLICATIONS"}
            </Link>
          </li>

          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST JOB
                </Link>
              </li>

              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  MY JOBS
                </Link>
              </li>
            </>
          )}

          {/* 🔥 Better button style */}
          <li>
            <button
              onClick={handleLogout}
              style={{
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              LOGOUT
            </button>
          </li>

        </ul>

        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
