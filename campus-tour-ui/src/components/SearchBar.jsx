import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X } from 'lucide-react';

export default function SearchBar({ 
  placeholder = "Search buildings, facilities, services...",
  size = "default",
  onSearch,
  initialValue = ""
}) {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const suggestions = [
    { text: 'Main Library', icon: MapPin },
    { text: 'Science Building', icon: MapPin },
    { text: 'Student Center', icon: MapPin },
    { text: 'Sports Complex', icon: MapPin },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setIsFocused(false);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    default: 'py-3 px-5 text-base',
    large: 'py-4 px-6 text-lg',
  };

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 transition-all duration-200 ${
          isFocused 
            ? 'border-primary-500 shadow-primary-100 dark:shadow-primary-900/20' 
            : 'border-transparent'
        }`}>
          <Search className={`absolute left-4 text-gray-400 ${size === 'large' ? 'h-6 w-6' : 'h-5 w-5'}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder={placeholder}
            className={`w-full bg-transparent outline-none pl-12 pr-12 ${sizeClasses[size]} text-gray-900 dark:text-white placeholder-gray-400`}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-14 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
          <button
            type="submit"
            className={`absolute right-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 ${
              size === 'large' ? 'p-3' : 'p-2'
            }`}
          >
            <Search className={size === 'large' ? 'h-5 w-5' : 'h-4 w-4'} />
          </button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isFocused && query.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Popular Searches
            </span>
          </div>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <suggestion.icon className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">{suggestion.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
