import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";  
import Mantenedor from "./pages/Mantenedor";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/mantenedor" 
          element={
            <PrivateRoute>
              <Mantenedor />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />  
      </Routes>
    </BrowserRouter>
  );
}
