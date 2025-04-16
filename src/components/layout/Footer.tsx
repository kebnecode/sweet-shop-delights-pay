
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and about */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-quicksand font-bold text-sweet-darkPurple">Sweet Shop Delights</h2>
            <p className="mt-3 text-gray-600 font-poppins text-sm">
              Delicious treats made with love, delivered to your doorstep.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-sweet-purple">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sweet-purple">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sweet-purple">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase font-poppins">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase font-poppins">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/category/cakes" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  Cakes
                </Link>
              </li>
              <li>
                <Link to="/category/cupcakes" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  Cupcakes
                </Link>
              </li>
              <li>
                <Link to="/category/cookies" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/category/pastries" className="text-gray-600 hover:text-sweet-purple text-sm font-poppins">
                  Pastries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase font-poppins">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="text-gray-600 text-sm font-poppins">
                123 Bakery Street
              </li>
              <li className="text-gray-600 text-sm font-poppins">
                Sweetville, CA 90210
              </li>
              <li className="text-gray-600 text-sm font-poppins">
                contact@sweetshopdelights.com
              </li>
              <li className="text-gray-600 text-sm font-poppins">
                (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-500 font-poppins">
            We accept: Credit/Debit cards, PayStack, Bank transfers
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-4">
          <p className="text-center text-xs text-gray-500 font-poppins">
            &copy; {new Date().getFullYear()} Sweet Shop Delights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
