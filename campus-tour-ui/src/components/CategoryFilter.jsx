
import { locations } from "../data/locations"

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const categories = ["All", ...new Set(locations.map(loc => loc.category))];

  return (
    <div className="mb-4 p-3 bg-white rounded-xl shadow-sm border overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              px-3 py-1 text-sm rounded-full transition-colors duration-150 ease-in-out
              ${selectedCategory === category
                ? 'bg-blue-600 text-white font-semibold'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}