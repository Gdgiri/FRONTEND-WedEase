import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="footer footer-expand-lg bg-body-tertiary d-flex gap-5 ">
        <div className=" p-2 mt-2">
          <p>
            <a href="mailto:gdevent24@gmail.com">gdevent24@gmail.com</a>
          </p>
        </div>
        <div className="mx-auto p-2 mt-2">
          <p>© {year} Copyright:GD-Event Management</p>
        </div>

        <div className="p-2 d-flex gap-2 mt-2">
          <div>
            <Link to="/">facebook</Link>
          </div>
          <div>
            {" "}
            <Link to="/">twitter</Link>
          </div>
          <div>
            {" "}
            <Link to="/">github</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
