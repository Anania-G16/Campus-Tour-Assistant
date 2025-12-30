import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Mic, MapPin } from 'lucide-react';
import { locations } from '../data/locations';

const categoryFilters = [
  { id: 'all', name: 'Departments', checked: true },
  { id: 'cafeterias', name: 'Cafeterias', checked: false },
  { id: 'dorms', name: 'Dorms', checked: false },
  { id: 'libraries', name: 'Libraries', checked: false },
  { id: 'sports', name: 'Sports Facilities', checked: false },
  { id: 'parking', name: 'Parking', checked: false },
  { id: 'accessibility', name: 'Accessibility', checked: false },
];

// Marker colors for different categories
const markerColors = {
  'Libraries': 'bg-blue-500',
  'Academic': 'bg-red-500',
  'Sports': 'bg-green-500',
  'Outdoor': 'bg-orange-500',
  'Dining': 'bg-yellow-500',
  'default': 'bg-red-500'
};

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['all']);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Filter locations based on search
  const filteredLocations = locations.filter((location) => {
    if (!searchQuery) return true;
    return location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleFilterChange = (filterId) => {
    if (filterId === 'all') {
      setSelectedFilters(['all']);
    } else {
      const newFilters = selectedFilters.filter(f => f !== 'all');
      if (newFilters.includes(filterId)) {
        setSelectedFilters(newFilters.filter(f => f !== filterId));
      } else {
        setSelectedFilters([...newFilters, filterId]);
      }
    }
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(selectedLocation?.id === location.id ? null : location);
  };

  const getMarkerColor = (category) => {
    return markerColors[category] || markerColors.default;
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col relative overflow-hidden">
      {/* Top Search Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center bg-white rounded-lg shadow-lg px-4 py-3">
            <SearchIcon className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for buildings, offices..."
              className="flex-1 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Mic className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <div className="absolute left-4 top-20 z-20">
        <div className="bg-white rounded-lg shadow-lg p-4 w-48">
          <h3 className="font-semibold text-gray-700 mb-3">FILTER BY</h3>
          <div className="space-y-2">
            {categoryFilters.map((filter) => (
              <label key={filter.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter.id)}
                  onChange={() => handleFilterChange(filter.id)}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{filter.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Map Background - Green styled map */}
        <div 
          className="w-full h-full"
          style={{
            backgroundColor: '#c8d5b9',
            backgroundImage: `
              linear-gradient(rgba(200, 213, 185, 0.8), rgba(200, 213, 185, 0.8)),
              url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Simulated map roads */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,30 Q30,35 50,25 T100,30" stroke="#f5f5dc" strokeWidth="0.5" fill="none" />
            <path d="M20,0 Q25,30 30,50 T25,100" stroke="#f5f5dc" strokeWidth="0.5" fill="none" />
            <path d="M60,0 Q55,40 70,60 T65,100" stroke="#f5f5dc" strokeWidth="0.5" fill="none" />
            <path d="M0,70 Q40,65 60,75 T100,70" stroke="#f5f5dc" strokeWidth="0.5" fill="none" />
          </svg>

          {/* Map Markers with Labels */}
          {filteredLocations.map((location, index) => {
            const positions = [
              { left: '55%', top: '15%' },
              { left: '75%', top: '25%' },
              { left: '60%', top: '35%' },
              { left: '50%', top: '50%' },
              { left: '25%', top: '55%' },
              { left: '80%', top: '55%' },
              { left: '25%', top: '75%' },
              { left: '75%', top: '80%' },
            ];
            const pos = positions[index % positions.length];
            
            return (
              <div
                key={location.id}
                className="absolute transform -translate-x-1/2 cursor-pointer group"
                style={{ left: pos.left, top: pos.top }}
                onClick={() => handleMarkerClick(location)}
              >
                {/* Marker */}
                <div className={`relative ${selectedLocation?.id === location.id ? 'z-50' : 'z-10'}`}>
                  <div className={`w-8 h-8 ${getMarkerColor(location.category)} rounded-full flex items-center justify-center shadow-lg transform transition-transform ${selectedLocation?.id === location.id ? 'scale-125' : 'hover:scale-110'}`}>
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  {/* Label */}
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-700 whitespace-nowrap">
                    {location.name.length > 15 ? location.name.substring(0, 15) + '...' : location.name}
                  </span>
                </div>

                {/* Popup Card */}
                {selectedLocation?.id === location.id && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden z-50">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900">{location.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {location.description}
                      </p>
                      <Link
                        to={`/location/${location.id}`}
                        className="mt-3 block w-full py-2 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
