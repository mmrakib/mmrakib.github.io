import React, { useState } from "react";
import { MantineProvider } from "@mantine/core";

import "./global.scss";

import Navbar from "./components/navigation/navbar.jsx";
import Introduction from "./components/about/introduction.jsx";
import About from "./components/about/about.jsx";

function App() {
    // Controls whether the About component should be shown
    const [showAbout, setShowAbout] = useState(false);

    // This callback is triggered when Introduction finishes
    const handleIntroductionComplete = () => {
        setShowAbout(true);
    };

    return (
        <MantineProvider>
            <Navbar />

            {/* Pass the callback to Introduction via onComplete prop */}
            <Introduction onComplete={handleIntroductionComplete} />

            {/* Conditionally render <About /> only after Introduction completes */}
            {showAbout && <About />}
        </MantineProvider>
    );
}

export default App;
