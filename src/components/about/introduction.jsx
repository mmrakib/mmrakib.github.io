import React, { useState, useEffect } from "react";

import "./introduction.scss";

function Introduction({ onComplete }) {
    const words = [
        { text: "Hi,", fontClass: "roboto" },
        { text: "I'm", fontClass: "roboto" },
        { text: "Mayaz.", fontClass: "yellowtail" }
    ];

    const [visibleIndex, setVisibleIndex] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleIndex((prev) => {
                if (prev < words.length - 1) {
                    return prev + 1;
                } else {
                    clearInterval(interval);

                    setTimeout(() => {
                        onComplete?.(); 
                    }, 100);

                    return prev;
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, [words.length, onComplete]);

    return (
        <div className="outer-center-container">
            <div className="text-container">
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={`word ${word.fontClass} ${
                            index <= visibleIndex ? "show" : ""
                        }`}
                    >
                        {word.text}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Introduction;
