import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from './Pages/RegisterPage';
import { Link } from "react-router-dom"
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/LoginPage';
import DetalleProducto from './Pages/DetalleProducto';
import Carrito from './Pages/Carrito';
import Contacto from './Pages/Contacto';
import ResetPassword from './Pages/ResetPassword';
import Reset2Password2 from './Pages/Reset2Password2';
import CatalogPage from './Pages/CatalogPage';
import ProductDetail from './Pages/DetalleProducto';
import Vacantes from './Pages/Vacantes';
import { Toaster } from 'react-hot-toast';
import NosotrosPage from './Pages/NosotrosPage';


function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/producto/:codigo" element={<DetalleProducto />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/categoria/:category" element={<CatalogPage />} />
          <Route path="/categoria/:category/:subcategory" element={<CatalogPage />} />
          <Route path="/vacantes" element={<Vacantes />} />
          <Route path="/nosotros" element= {<NosotrosPage/>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;