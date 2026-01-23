import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Car,
  TreePine,
  Dumbbell,
  GraduationCap,
  MapPin,
  ArrowUpRight,
  LayoutGrid
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { storeContext } from '../context/storeContext';
import { motion, AnimatePresence } from 'framer-motion';

const categoryButtons = [
  { id: 'All', name: 'All', icon: LayoutGrid, accent: '#646cff' },
  { id: 'Academic', name: 'Academic', icon: GraduationCap, accent: '#ef4444' },
  { id: 'Libraries', name: 'Libraries', icon: BookOpen, accent: '#3b82f6' },
  { id: 'Sports', name: 'Sports', icon: Dumbbell, accent: '#22c55e' },
  { id: 'Outdoor', name: 'Outdoor', icon: TreePine, accent: '#10b981' },
  { id: 'Parking', name: 'Parking', icon: Car, accent: '#64748b' },
];

export default function Categories() {
  const { getBuildings, locations } = useContext(storeContext);
  const url = "http://localhost:3000";

  useEffect(() => {
    getBuildings();
  }, []);

  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('All');

  const filteredLocations = activeTab === 'All' 
    ? locations 
    : locations.filter(loc => loc.category === activeTab);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
      
      {/* --- TOP NAV --- */}
      <div className={`sticky top-0 z-30 backdrop-blur-md border-b transition-all ${
        darkMode ? 'bg-slate-950/50 border-white/5' : 'bg-white/70 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
            {categoryButtons.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all duration-300 whitespace-nowrap group ${
                    isActive 
                      ? (darkMode ? 'text-white' : 'text-slate-900') 
                      : (darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabPill"
                      className={`absolute inset-0 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-slate-100'}`}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <cat.icon size={16} className="relative z-10" style={{ color: isActive ? cat.accent : 'inherit' }} />
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-wider">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-20 py-12">
        {/* --- CLEAN HEADER --- */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeTab}
          >
            <h1 className={`text-5xl font-black tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeTab}
            </h1>
            <p className={`text-sm font-medium mt-3 opacity-50 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Showing {filteredLocations.length} results in this sector
            </p>
          </motion.div>
        </header>

        {/* --- THREE COLUMN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          <AnimatePresence mode='popLayout'>
            {filteredLocations.map((location) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={location.id}
              >
                <Link
                  to={`/search?q=${location.name}`}
                  className="group block relative h-full"
                >
                  {/* Slim, elegant image container */}
                  <div className="relative h-48 overflow-hidden rounded-2xl mb-5 shadow-sm">
                    <img
                      src={`${url}/uploads/buildings/${location.images}`}
                      alt={location.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Tiny Action Indicator */}
                    <div className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all ${darkMode ? 'bg-black/20' : 'bg-black/10'}`}>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* Minimal Content */}
                  <div className="px-1">
                    <h3 className={`text-lg font-bold tracking-tight mb-2 group-hover:text-[#646cff] transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {location.name}
                    </h3>

                    <div className="flex items-center gap-3">
                      {location.floorInfo?.depts?.slice(0, 1).map((dept, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${
                            darkMode ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          <MapPin size={12} className="text-[#646cff]" />
                          {dept}
                        </div>
                      ))}
                      {/* Only show category tag if on "All" tab */}
                      {activeTab === 'All' && (
                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${darkMode ? 'bg-white/5 text-slate-600' : 'bg-slate-100 text-slate-400'}`}>
                          {location.category}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}