import React, { useState } from "react";

import Introduction from "../about/introduction.jsx";
import About from "../about/about.jsx";

function HomePage() {
    const [showAbout, setShowAbout] = useState(false);

    const handleIntroductionComplete = () => {
        setShowAbout(true);
    };

    return (
        <>
            <Introduction onComplete={handleIntroductionComplete} />
            {showAbout && <About />}
        </>
    );
}

export default HomePage;
