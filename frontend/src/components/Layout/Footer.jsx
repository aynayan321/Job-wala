import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      
      {/* Change your name here */}
      <div>&copy; {new Date().getFullYear()} Job-Wala. All rights reserved.</div>

      <div>
        {/* Replace with YOUR links */}
        <a href="https://github.com/aynayan321" target="_blank" rel="noreferrer">
          <FaGithub />
        </a>

        <a href="#" target="_blank" rel="noreferrer">
          <SiLeetcode />
        </a>

        <a href="#" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>

        <a href="#" target="_blank" rel="noreferrer">
          <RiInstagramFill />
        </a>
      </div>

    </footer>
  );
}

export default Footer;
