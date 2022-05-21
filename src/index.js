import App1 from "./pages/App1";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";

export default function Dis() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/fv" element={<App1 />} /> 
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Dis />);
