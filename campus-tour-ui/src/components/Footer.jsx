import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Campus', path: '/search' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
  ];

  const categories = [
    { name: 'Academic Buildings', path: '/search?category=academic' },
    { name: 'Libraries', path: '/search?category=library' },
    { name: 'Sports Facilities', path: '/search?category=sports' },
    { name: 'Dining', path: '/search?category=dining' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CampusTour</span>
            </Link>
            <p className="text-sm text-gray-400">
              Your ultimate guide to exploring and navigating the campus. Discover buildings, facilities, and services with ease.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">CTBE, Campus 5 Kilo</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400" />
                <a href="mailto:info@campustour.edu" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@campustour.edu
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-primary-400 transition-colors">
                  +251-90-000-000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {currentYear} CampusTour. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
