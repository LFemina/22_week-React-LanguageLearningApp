import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

function NavBar () {
    const location = useLocation();

    return (
        <div className="navbar">
            <Link 
                to="/"
                className={location.pathname === "/" ? "active-link" : ""}
            >
                Главная
            </Link>

            <Link
                to="/game" className={location.pathname === "/game" ? "active-link" : ""}
            >
                Карточки для изучения слов
            </Link>
        </div>
    );
};

export default NavBar;