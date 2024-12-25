import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./global.scss";

import Navbar from "./components/navigation/navbar.jsx";
import HomePage from "./components/pages/homepage.jsx";
import ProjectsPage from "./components/pages/projectspage.jsx";
import WritingPage from "./components/pages/writingpage.jsx";

function App() {
    return (
        <Router> {/* Move Router to wrap MantineProvider and Navbar */}
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/writing" element={<WritingPage />} />
            </Routes>
        </Router>
    );
}

export default App;
