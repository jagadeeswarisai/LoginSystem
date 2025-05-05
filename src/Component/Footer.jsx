import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* ABOUT */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">About</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition">Contact Us</li>
            <li className="hover:text-white transition">About Us</li>
            <li className="hover:text-white transition">Careers</li>
            <li className="hover:text-white transition">Flipkart Stories</li>
            <li className="hover:text-white transition">Press</li>
            <li className="hover:text-white transition">Corporate Info</li>
          </ul>
        </div>

        {/* GROUP COMPANIES */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Group Companies</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition">Myntra</li>
            <li className="hover:text-white transition">Cleartrip</li>
            <li className="hover:text-white transition">Shopsy</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Help</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition">Payments</li>
            <li className="hover:text-white transition">Shipping</li>
            <li className="hover:text-white transition">Returns</li>
            <li className="hover:text-white transition">FAQ</li>
          </ul>
        </div>

        {/* CONSUMER POLICY */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Policy</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white transition">Returns</li>
            <li className="hover:text-white transition">Terms of Use</li>
            <li className="hover:text-white transition">Security</li>
            <li className="hover:text-white transition">Privacy</li>
            <li className="hover:text-white transition">Sitemap</li>
            <li className="hover:text-white transition">Compliance</li>
          </ul>
        </div>
      </div>

      {/* Divider and Social */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Social Icons */}
        <div className="flex gap-5 text-gray-400 text-xl mb-4 md:mb-0">
          <FaFacebookF className="hover:text-white transition" />
          <FaTwitter className="hover:text-white transition" />
          <FaYoutube className="hover:text-white transition" />
          <FaInstagram className="hover:text-white transition" />
        </div>

        {/* Links */}
        <div className="text-sm text-gray-400 text-center md:text-right">
          Become a Seller &nbsp;|&nbsp; Advertise &nbsp;|&nbsp; Gift Cards &nbsp;|&nbsp; Help Center
        </div>
      </div>
    </footer>
  );
}

export default Footer;
