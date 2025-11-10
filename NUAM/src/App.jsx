import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";  
import Mantenedor from "./pages/Mantenedor";  

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/mantenedor" element={<Mantenedor />} />
        <Route path="*" element={<Navigate to="/login" replace />} />  
      </Routes>
    </BrowserRouter>
  );
}
