import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  // This component is marked as "(conditional, for web)" in the input.
  // The actual conditional rendering logic would be handled by the parent component or layout system.
  // For now, we assume it's rendered on web.
  // Add `hidden md:block` or similar classes if it should hide on mobile by default.

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 text-sm text-gray-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">App Name</h5>
            <p>Your go-to app for delicious food, delivered fast.</p>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Quick Links</h5>
            <ul className="space-y-1">
              <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Legal</h5>
            <ul className="space-y-1">
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t border-gray-200 pt-8">
          <p>&copy; {currentYear} YourCompanyName. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;