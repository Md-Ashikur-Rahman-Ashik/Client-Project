import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10 pb-6">
      <div className="ccc grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-red-500 text-2xl font-semibold mb-2">Evenzy</h2>
          <p className="text-gray-400">
            Discover and create amazing events effortlessly.
          </p>
        </div>

        <div>
          <h3 className="text-white text-xl font-semibold mb-3">
            Useful Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/terms" className="hover:text-red-500 transition">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-red-500 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://facebook.com/evenzy"
              target="_blank"
              className="text-red-500 hover:text-white transition text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/evenzy"
              target="_blank"
              className="text-red-500 hover:text-white transition text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/evenzy"
              target="_blank"
              className="text-red-500 hover:text-white transition text-2xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © 2025 Evenzy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
