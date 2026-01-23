import Navbar from './navBar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext'; // Import useTheme

export default function Layout({ children, isAuthenticated, setIsAuthenticated, userRole }) {
  const { darkMode } = useTheme();

  return (
    // This div now controls the "base" color for every page
    <div className={`min-h-screen relative transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      
      
      {/* Content wrapper must be relative and z-10 */}
      <div className="flex flex-col min-h-screen relative z-10">
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