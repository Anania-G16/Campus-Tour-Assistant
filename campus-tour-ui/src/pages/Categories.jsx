import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Coffee, Home, Car, TreePine, Dumbbell, GraduationCap, ChevronRight } from 'lucide-react';
import { locations } from '../data/locations';

const categoryButtons = [
  { id: 'Academic', name: 'Academic', icon: GraduationCap, color: 'bg-red-50 text-red-600', border: 'border-red-100' },
  { id: 'Libraries', name: 'Libraries', icon: BookOpen, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
  { id: 'Sports', name: 'Sports', icon: Dumbbell, color: 'bg-green-50 text-green-600', border: 'border-green-100' },
  { id: 'Outdoor', name: 'Outdoor', icon: TreePine, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-100' },
  { id: 'Parking', name: 'Parking', icon: Car, color: 'bg-gray-50 text-gray-600', border: 'border-gray-100' },
];

export default function Categories() {
  const [activeTab, setActiveTab] = useState('Academic');
  const filteredLocations = locations.filter(loc => loc.category === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white border-b overflow-x-auto no-scrollbar">
        <div className="flex p-4 gap-4 max-w-7xl mx-auto">
          {categoryButtons.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${
                activeTab === cat.id ? `${cat.border} ${cat.color} shadow-sm` : 'border-transparent text-gray-400'
              }`}
            >
              <cat.icon size={20} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-black text-gray-900">{activeTab}</h1>
        <p className="text-gray-500 mb-8">Found {filteredLocations.length} locations</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <Link 
              key={location.id} 
              to={`/search?q=${location.name}`}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-48 bg-gray-100">
                <img 
                  src={location.images?.[0] || location.image} 
                  alt={location.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{location.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  
                  {location.floorInfo?.depts?.slice(0, 2).map((dept, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold uppercase">
                      {dept}
                    </span>
                  )) || <span className="text-[10px] text-gray-400 uppercase font-bold">{location.tags?.[0]}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}