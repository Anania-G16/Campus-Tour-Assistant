import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Map', path: '/search' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Campus', path: '/about' },
  ];

  const categoryLinks = [
    { name: 'Academic Buildings', path: '/search?category=Academic' },
    { name: 'Libraries & Study', path: '/search?category=Libraries' },
    { name: 'Sports Facilities', path: '/search?category=Sports' },
    { name: 'Outdoor Spaces', path: '/search?category=Outdoor' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-900/20">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">CampusTour</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Precision navigation for the 5 Kilo campus. Helping students find labs, lecture halls, and facilities with ease.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2.5 bg-slate-800 rounded-xl hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Platform</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Categories</h3>
            <ul className="space-y-3 text-sm">
              {categoryLinks.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.path}
                    className="text-slate-400 hover:text-primary-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all"></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-snug">
                  5 Kilo Campus, AAiT<br/>Addis Ababa, Ethiopia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <a href="mailto:info@campustour.edu" className="text-slate-400 hover:text-primary-400 transition-colors">
                  info@campustour.edu
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <span className="text-slate-400">+251 900 000 000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px]">
            <p className="text-slate-500">
              © {currentYear} CampusTour. Designed for 5 Kilo Students.
            </p>
            <div className="flex space-x-8">
              <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}