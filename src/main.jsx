import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

// LOL
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
