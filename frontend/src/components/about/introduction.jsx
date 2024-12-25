import React, { useState, useEffect } from "react";
import "./introduction.scss";

function Introduction({ onComplete }) {
    // Three words with font classes
    const words = [
        { text: "Hi,", fontClass: "roboto" },
        { text: "I'm", fontClass: "roboto" },
        { text: "Mayaz.", fontClass: "yellowtail" }
    ];

    // Track which word index is currently revealed
    const [visibleIndex, setVisibleIndex] = useState(-1);

    useEffect(() => {
        // Reveal one word at a time every 800ms
        const interval = setInterval(() => {
            setVisibleIndex((prev) => {
                if (prev < words.length - 1) {
                    return prev + 1;
                } else {
                    // All words have been revealed, clear interval
                    clearInterval(interval);

                    // Delay a bit if you want the last word to fully fade in
                    // Then call onComplete() to signal that Introduction is done
                    setTimeout(() => {
                        onComplete?.(); 
                    }, 100);

                    return prev;
                }
            });
        }, 500);

        // Cleanup if component unmounts
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
