import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Clock, BookOpen, Dumbbell, UtensilsCrossed, Home, Stethoscope, Car, Trees } from 'lucide-react';

import { useContext, useEffect } from 'react';
import { storeContext } from '../context/storeContext';

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

export default function BuildingDetails() {

  const {getBuildings,locations,url}=useContext(storeContext)
 
   useEffect(()=>{
     getBuildings()
   },[])
  const { id } = useParams();
  const location = locations.find(loc => loc.id === parseInt(id));

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Building Not Found</h1>
          <Link to="/search" className="text-primary-600 hover:text-primary-700">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[location.category] || Building2;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-4">
            Building Details
          </h1>
          <Link 
            to="/search" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to map
          </Link>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <div className="lg:w-2/3">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={`${url}/uploads/buildings/${location.images}`}
                alt={location.name}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Details Card */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {/* Icon and Title */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary-700 dark:text-primary-400">
                    {location.name}
                  </h2>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Location: </span>
                    <span className="text-gray-600 dark:text-gray-400">{location.location || location.distance || 'Campus'}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">Open hours: </span>
                    <span className="text-gray-600 dark:text-gray-400">{location.hours}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {location.description}
                </p>
              </div>

              {/* Tags */}
              {location.tags && location.tags.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {location.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
