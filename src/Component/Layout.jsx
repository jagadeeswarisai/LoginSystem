import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <Outlet /> {/* This will show nested route content like HomeDashboard or Product */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
