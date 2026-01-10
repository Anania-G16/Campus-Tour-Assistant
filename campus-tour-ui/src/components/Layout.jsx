import { useState } from 'react';
import Navbar from './navBar';
import Footer from './Footer';

export default function Layout({ children, isAuthenticated, setIsAuthenticated, userRole }) {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col min-h-screen">
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          userRole={userRole}
        />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
