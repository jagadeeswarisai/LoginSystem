import React from "react";

function Contact() {
  return (
    <div>
      {/* Fixed Header aligned to the right of the sidebar */}
      <header className="fixed top-0 left-64 right-0 bg-white shadow-md p-4 z-50">
        <h1 className="text-xl font-bold text-gray-800">Contact</h1>
      </header>

      {/* Page content, pushed down to avoid overlap with header */}
      <main className="ml-64 pt-20 p-6">
        <div>
            <h1>This is My Contact Page</h1>
        </div>
      </main>
    </div>
  );
}

export default Contact;
