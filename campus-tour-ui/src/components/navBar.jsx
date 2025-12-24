import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary-70 sticky top-0 z-50">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-white text-2xl font-bold">Campus Tour</Link>
        <div className="flex gap-6 text-white">
          <Link to="/" className="hover:text-primary-200">Home</Link>
          <Link to="/" className="hover:text-primary-200">Map</Link>
          <Link to="/" className="hover:text-primary-200">Tour</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Campus Tour</Link>
        <Menu className="h-6 w-6 text-white cursor-pointer" onClick={() => setIsOpen(true)} />
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-primary-800 px-6 py-4 space-y-2">
          <Link to="/" className="block text-white hover:text-primary-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/map" className="block text-white hover:text-primary-200" onClick={() => setIsOpen(false)}>Map</Link>
          <Link to="/tour" className="block text-white hover:text-primary-200" onClick={() => setIsOpen(false)}>Tour</Link>
          <X className="absolute top-20 right-6 h-6 w-6 text-white cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </nav>
  );
}
