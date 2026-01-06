import React from 'react';

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const LocationIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LayersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>);

export default function BuildingDetailsPanel({ building }) {
  if (!building) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50">
        <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center mb-4">
          <LocationIcon />
        </div>
        <h3 className="text-gray-900 font-bold text-lg">No Building Selected</h3>
        <p className="text-gray-500 text-sm mt-2">Pick a destination on the map to see route info and building specifics.</p>
      </div>
    );
  }

 
  const images = Array.isArray(building.images) ? building.images : [];
    
  const floor = building.floorInfo;
  const displayItems = floor?.depts || building.tags || [];

  return (
    <div className="h-full flex flex-col bg-white">
      <br/>
      {/* Header */}
      <div className="p-6 border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex justify-between items-start">
          <span className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
            {escapeHtml(building.category)}
          </span>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded border border-yellow-100 shadow-sm">
            <span className="text-yellow-600 text-xs font-bold">⭐ {building.rating || "4.5"}</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">
          {escapeHtml(building.name)}
        </h2>

        <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-sm">
          <ClockIcon />
          <span className="font-medium">{building.hours || "Open 24 Hours"}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        
        {/* Navigation Stats */}
        {building.walking && (
          <section>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <LocationIcon />
                  <span className="text-blue-800 text-[10px] font-bold uppercase">Distance</span>
                </div>
                <span className="text-xl font-black text-blue-900">{building.walking.distance}</span>
              </div>
              <div className="bg-green-50 border border-green-100 p-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <ClockIcon />
                  <span className="text-green-800 text-[10px] font-bold uppercase">Travel Time</span>
                </div>
                <span className="text-xl font-black text-green-900">{building.walking.duration}</span>
              </div>
            </div>
          </section>
        )}

        {/* Building Structure */}
        <section className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <LayersIcon />
            <h3 className="font-bold text-gray-800">Building Details</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-medium">Floors</span>
              <span className="font-bold text-gray-900">{floor?.floors ?? "N/A"}</span>
            </div>
            {floor?.rooms > 0 && (
              <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
                <span className="text-gray-500 font-medium">Approx. Rooms</span>
                <span className="font-bold text-gray-900">{floor.rooms}</span>
              </div>
            )}
            <div className="pt-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">Departments & Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {displayItems.length > 0 ? (
                  displayItems.map((item, i) => (
                    <span key={i} className="bg-white border border-gray-200 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium shadow-sm">
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400 italic">No specific tags available</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">About</h3>
          <p className="text-gray-700 leading-relaxed text-sm antialiased">
            {escapeHtml(building.description)}
          </p>
        </section>

        {/* Gallery */}
        {images.length > 0 && (
          <section className="pb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Gallery</h3>
            <div className="grid grid-cols-1 gap-4">
              {images.map((url, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.01]">
                  <img
                    src={url}
                    alt={`${building.name} view ${index + 1}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found' }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}