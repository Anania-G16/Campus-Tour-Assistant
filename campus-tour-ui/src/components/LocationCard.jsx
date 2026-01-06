import { MapPin, Clock, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LocationCard({ location }) {
  const {
    id,
    name,
    category,
    description,
    image,
    rating,
    distance,
    location: locationName,
    hours,
    tags = []
  } = location;

  return (
    <Link to={`/location/${id}`} className="block">
      <div className="card overflow-visible group">
        { 
        }
        <div className="relative h-48 overflow-hidden">
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
              {category}
            </span>
          </div>
          {rating && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{rating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {name}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>

          {/* Meta info */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {(locationName || distance) && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{locationName || distance}</span>
              </div>
            )}
            {hours && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{hours}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* View more */}
          <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium pt-2">
            <span>View Details</span>
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
