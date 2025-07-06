import { Route, Routes } from "react-router-dom";

// Ana Sayfa importları
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import CategoryProductsPage from "./pages/CategoryProductsPage"; 
// Admin Paneli importları
import UserPage from "./pages/admin/UserPage";
import CategoryPage from "./pages/admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/admin/Categories/CreateCategoryPage";

import ProductPage from "./pages/admin/Products/ProductPage";
import CreateProductPage from "./pages/admin/Products/CreateProductPage";
import UpdateProductPage from "./pages/admin/Products/UpdateProductPage";

import CouponPage from "./pages/admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/admin/Coupons/UpdateCouponPage";

// CSS import
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Ana Sayfalar */}
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/category/:id" element={<CategoryProductsPage />} />

      {/* Admin Sayfaları */}
      <Route path="/admin/users" element={<UserPage />} />
      <Route path="/admin/categories" element={<CategoryPage />} />
      <Route path="/admin/categories/create" element={<CreateCategoryPage />} />
      <Route path="/admin/categories/update/:id" element={<UpdateCategoryPage />} />
      <Route path="/admin/products" element={<ProductPage />} />
      <Route path="/admin/products/create" element={<CreateProductPage />} />
      <Route path="/admin/products/update/:id" element={<UpdateProductPage />} />
      <Route path="/admin/coupons" element={<CouponPage />} />
      <Route path="/admin/coupons/create" element={<CreateCouponPage />} />
      <Route path="/admin/coupons/update/:id" element={<UpdateCouponPage />} />
    </Routes>
  );
}

export default App;
