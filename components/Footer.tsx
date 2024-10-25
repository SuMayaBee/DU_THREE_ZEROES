"use client";

import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <p className="text-gray-400 mb-4">
              We help you plan and organize the perfect trip, ensuring you create unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/destinations" className="text-gray-400 hover:text-white transition">Destinations</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400 hover:text-white transition">Support Center</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
