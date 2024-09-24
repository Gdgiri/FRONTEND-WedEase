import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer bg-body-tertiary py-3">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Contact Info */}
          <div className="col-md-4 mb-3 mb-md-0">
            <p className="mb-0">
              <a href="mailto:gdevent24@gmail.com">gdevent24@gmail.com</a>
            </p>
          </div>

          {/* Copyright Info */}
          <div className="col-md-4 mb-3 mb-md-0 d-flex justify-content-center">
            <p className="mb-0">© {year} Copyright: GD-Event Management</p>
          </div>

          {/* Social Links */}
          <div className="col-md-4 d-flex justify-content-center justify-content-md-end gap-3">
            <Link to="/" className="text-decoration-none">
            <i className="bi bi-facebook text-danger"></i>
            </Link>
            <Link to="/" className="text-decoration-none">
            <i className="bi bi-twitter-x text-danger"></i>
            </Link>
            <Link to="/" className="text-decoration-none">
            <i className="bi bi-github text-danger"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
