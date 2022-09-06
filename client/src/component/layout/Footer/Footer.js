import React from 'react';
import "./Footer.css";
import logo from "../../../images/logo2.png";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer className="bgcolor2 py-3">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-lg-around justify-content-center">
                        <Link className="footer_logo_link" to="/">  <img src={logo} className="logo_footer" /> </Link>
                        <p className="footer_p mb-0 mt-lg-0 mt-4 text-md-left text-center">Desigend and Developed by Kenil Chovatiya &nbsp; <span className="">@2022 copyrights </span></p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;