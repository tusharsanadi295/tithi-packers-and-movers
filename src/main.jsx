import React, { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./tailwind-output.css";
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"; 
import App from "./App";

createRoot(document.getElementById("root")).render(
   <BrowserRouter>
    <App />
  </BrowserRouter>
);
