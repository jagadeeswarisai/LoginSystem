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
import Layout from "./Component/Layout"; // ✅ Import Layout
import CategoryPage from "./CategoryPage";
import PhoneDetailPage from "./PhoneDetailPage";
import LaptopDetailPage from "./LaptopDetailPage";
import TabletDetailPage from "./TabletDetailPage";
import EarbutsDetailPage from "./EarbutsDetailPage";




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
        <Route path="/homedashboard" element={<Layout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="category/:categoryName" element={<PhoneDetailPage/>}/>
          <Route path="category/:categoryName" element={<LaptopDetailPage/>}/>
          <Route path="category/:categoryName" element={<TabletDetailPage/>}/>
          <Route path="category/:categoryName" element={<EarbutsDetailPage/>}/>
         

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
