import { Link, useParams } from 'react-router-dom';
import { Building2, MapPin, Clock, BookOpen, Dumbbell, UtensilsCrossed, Home, Stethoscope, Car, Trees } from 'lucide-react';
import { locations } from '../data/locations';

const iconMap = {
  'Libraries': BookOpen,
  'Academic': Building2,
  'Sports': Dumbbell,
  'Dining': UtensilsCrossed,
  'Housing': Home,
  'Health': Stethoscope,
  'Parking': Car,
  'Outdoor': Trees,
};

export default function Categories() {
  const { category } = useParams();

  // Get unique categories
  const categories = [...new Set(locations.map(loc => loc.category))];

  // If category param is provided, filter locations by category
  const filteredLocations = category
    ? locations.filter(loc => loc.category === category)
    : [];

  if (category) {
    // Show locations in the selected category
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/categories" className="text-primary-600 hover:text-primary-700 text-sm">
              ← Back to Categories
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{category} Buildings</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => {
              const Icon = iconMap[location.category] || Building2;
              return (
                <Link
                  key={location.id}
                  to={`/location/${location.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="h-8 w-8 text-primary-600 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{location.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{location.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {location.location}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Show all categories with their buildings
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Building Categories</h1>

        {categories.map((cat) => {
          const categoryLocations = locations.filter(loc => loc.category === cat);
          const Icon = iconMap[cat] || Building2;
          return (
            <div key={cat} className="mb-12">
              <div className="flex items-center mb-6">
                <Icon className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">{cat}</h2>
                <span className="ml-2 text-sm text-gray-500">({categoryLocations.length} buildings)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryLocations.map((location) => (
                  <Link
                    key={location.id}
                    to={`/location/${location.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{location.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{location.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {location.location}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
