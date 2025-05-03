import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import SignUp from "./Component/Signup";
import Login from "./Component/Login";
import HomeDashboard from "./Component/HomeDashboard";
import Home from "./Component/Home";
import About from "./About";
import Contact from "./Contact";
import Blog from "./Blog";
import Offers from "./Offers";
import AdminLogin from "./Component/AdminLogin";
import AdminHomepage from "./Component/AdminHomepage";
import Category from "./Component/Category";
import ErrorBoundary from "./Component/ErrorBoundary";
import Productlist from "./Component/Productlist";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Basic Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/adminhome" element={<AdminHomepage />}>

  <Route
    path="category"
    element={
      <ErrorBoundary>
        <Category />
      </ErrorBoundary>
    }
  />
  <Route path="product-list" element={<Productlist/>}/>
  
  
  
</Route>


          {/* Home Dashboard with nested routes */}
          <Route path="/homedashboard" element={<HomeDashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="offers" element={<Offers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
