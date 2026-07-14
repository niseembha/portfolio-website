import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DeepWorkScoreboard from "./DeepWorkScoreboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DeepWorkScoreboard />
  </StrictMode>,
);
