import React, { useState, useEffect } from "react";
import "./about.scss";
import Socials from "./socials.jsx"; // Adjust if in the same folder

function About() {
    // Step 1: fade in the paragraph
    const [visible, setVisible] = useState(false);
    // Step 2: once paragraph is fully visible, show the socials
    const [showSocials, setShowSocials] = useState(false);

    useEffect(() => {
        // Start the paragraph fade-in almost immediately
        const timerParagraph = setTimeout(() => {
            setVisible(true);
        }, 50);

        return () => clearTimeout(timerParagraph);
    }, []);

    useEffect(() => {
        // Once the paragraph is visible, wait ~1s 
        // (matching the .about-text transition in about.scss)
        if (visible) {
            const timerSocials = setTimeout(() => {
                setShowSocials(true);
            }, 1000);  // matches the fade duration in CSS
            return () => clearTimeout(timerSocials);
        }
    }, [visible]);

    return (
        <div className="about-container">
            <p className={`about-text ${visible ? "show" : ""}`}>
                I'm a computer scientist from Sydney, Australia.
                I have a passion for quantitative finance, econometrics, machine learning and AI.
                I also write about philosophy and science from time to time. This website is a portfolio for my work.
            </p>

            {/* Render Socials AFTER paragraph fade-in completes */}
            {showSocials && <Socials />}
        </div>
    );
}

export default About;
