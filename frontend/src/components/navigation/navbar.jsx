import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.scss";

function Navbar() {
    const [opened, setOpened] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Trigger page-load animation when component mounts
        setLoaded(true);
    }, []);

    const toggleMenu = () => {
        if (opened) {
            setAnimating(true);
            setTimeout(() => {
                setOpened(false);
                setAnimating(false);
            }, 400);
        } else {
            setOpened(true);
        }
    };

    // Close the menu after a link is clicked
    const handleLinkClick = () => {
        if (opened) {
            setOpened(false);
        }
    };

    return (
        <nav id="navbar" className={loaded ? "fade-in" : ""}>
            <div className="navbar-header">
                <button
                    className={`navbar-burger ${opened ? "open" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    {opened ? (
                        <FaTimes className="burger-icon" />
                    ) : (
                        <FaBars className="burger-icon" />
                    )}
                </button>
            </div>

            <ul
                id="navbar-links"
                className={`${opened ? "open" : animating ? "closing" : ""}`}
            >
                <li className="navbar-link">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? "active" : "inactive"
                        }
                        onClick={handleLinkClick}
                    >
                        Home
                    </NavLink>
                </li>
                {/*
                <li className="navbar-link">
                    <NavLink
                        to="/writing"
                        className={({ isActive }) =>
                            isActive ? "active" : "inactive"
                        }
                        onClick={handleLinkClick}
                    >
                        Writing
                    </NavLink>
                </li>
                */}
                <li className="navbar-link">
                    {/*<NavLink to="/projects" className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={handleLinkClick}>
                        Projects
                    </NavLink>*/}
                    <a
                        href="https://github.com/mmrakib"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkClick}
                    >
                        Projects
                    </a>
                </li>
                <li className="navbar-link">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
                        Resume
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
