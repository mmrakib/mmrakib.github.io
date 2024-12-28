import React, { useState, useEffect } from "react";
import {
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaGithub,
    FaEnvelope
} from "react-icons/fa";

import "./socials.scss";

function Socials() {
    const icons = [
        {
            link: "https://instagram.com/mayazrakib",
            Icon: FaInstagram
        },
        {
            link: "https://youtube.com/@mayazrakib",
            Icon: FaYoutube
        },
        {
            link: "https://twitter.com/mayazrakib1",
            Icon: FaTwitter
        },
        {
            link: "https://github.com/mmrakib",
            Icon: FaGithub
        },
        {
            link: "mailto:mayaz@rakib.com.au",
            Icon: FaEnvelope
        }
    ];

    const [visibleIndex, setVisibleIndex] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleIndex((prev) => {
                if (prev < icons.length - 1) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 100);

        return () => clearInterval(interval);
    }, [icons.length]);

    return (
        <div className="socials-container">
            <ul className="socials-list">
                {icons.map((item, index) => (
                    <li
                        key={index}
                        className={`socials-item ${
                            index <= visibleIndex ? "show" : ""
                        }`}
                    >
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <item.Icon />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Socials;
