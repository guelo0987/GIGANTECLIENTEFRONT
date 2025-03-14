import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Lazy loading de componentes
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const DetalleProducto = lazy(() => import('./Pages/DetalleProducto'));
const Contacto = lazy(() => import('./Pages/Contacto'));
const CatalogPage = lazy(() => import('./Pages/CatalogPage'));
const Vacantes = lazy(() => import('./Pages/Vacantes'));
const NosotrosPage = lazy(() => import('./Pages/NosotrosPage'));
const RegisterPage = lazy(() => import('./Pages/RegisterPage'));
const LoginPage = lazy(() => import('./Pages/LoginPage'));
const Carrito = lazy(() => import('./Pages/Carrito'));
const ResetPassword = lazy(() => import('./Pages/ResetPassword'));
const Reset2Password2 = lazy(() => import('./Pages/Reset2Password2'));

// Componente de carga
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen bg-[#fbfbfb]">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#CB6406]"></div>
  </div>
);

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/producto/:codigo" element={<DetalleProducto />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/categoria/:category" element={<CatalogPage />} />
            <Route path="/categoria/:category/:subcategory" element={<CatalogPage />} />
            <Route path="/vacantes" element={<Vacantes />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset2-password2" element={<Reset2Password2 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;