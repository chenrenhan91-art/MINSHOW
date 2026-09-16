import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { StoreProvider } from "./store";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import StaticPage from "./pages/StaticPage";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Wholesale from "./pages/Wholesale";

const basename = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter basename={basename === "/" ? undefined : basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections/:handle" element={<Collection />} />
            <Route path="/products/:handle" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pages/contact" element={<Contact />} />
            <Route path="/pages/wholesale-inquiry" element={<Wholesale />} />
            <Route path="/pages/:slug" element={<StaticPage />} />
            <Route path="/policies/privacy-policy" element={<Navigate to="/pages/privacy-policy" replace />} />
            <Route path="/policies/terms-of-service" element={<Navigate to="/pages/terms-of-service" replace />} />
            <Route path="/blogs/wood-knowledge/:handle" element={<Blog />} />
            <Route path="/blogs/wood-knowledge" element={<Blog />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
}
