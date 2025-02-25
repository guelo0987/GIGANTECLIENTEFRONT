import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import { Link } from "react-router-dom"
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
import DetalleProducto from './Pages/DetalleProducto';
import Carrito from './Pages/Carrito';
import Contacto from './Pages/Contacto';
import ResetPassword from './Pages/ResetPassword';
import Reset2Password2 from './Pages/Reset2Password2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/recuperar-contrasena" element={<ResetPassword />} />
        <Route path="/restablecer-contrasena" element={<Reset2Password2 />} />
      </Routes>
    </Router>
  );
}

export default App;