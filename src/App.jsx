import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import SignUp from "./Component/Signup";
import Login from "./Component/Login";
import HomeDashboard from "./Component/HomeDashboard";
import AdminLogin from "./Component/AdminLogin";
import AdminHomepage from "./Component/AdminHomepage";
import Category from "./Component/Category";
import ErrorBoundary from "./Component/ErrorBoundary";
import Productlist from "./Component/Productlist";
import Product from "./Product";
import Layout from "./Component/Layout"; // ✅ Import Layout
import ProductDetail from "./Component/ProductDeatil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Routes with nested structure */}
        <Route path="/adminhome" element={<AdminHomepage />}>
          <Route
            path="category"
            element={
              <ErrorBoundary>
                <Category />
              </ErrorBoundary>
            }
          />
          <Route path="product-list" element={<Productlist />} />
        </Route>

        {/* User Layout Routes */}
        <Route path="/homedashboard" element={<Layout/>}>
          <Route index element={<HomeDashboard />} />
          <Route path="products" element={<Product />} />
          <Route path="productdetail" element={<ProductDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
