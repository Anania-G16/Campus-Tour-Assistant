import { useState, useEffect, useMemo, useRef } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet'; 
import { X } from 'lucide-react';
import { CAMPUS_INFO, locations as BUILDINGS } from "../data/locations";
import BuildingDetailsPanel from "./BuildingDetailsPanel";

const GATE_LOCATION = { lat: 9.04093889954351, lng: 38.76219059547216 }; 
const calculatePathDistance = (path) => {
    if (!path || path.length < 2) return null;
    let totalMeters = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const point1 = L.latLng(path[i][0], path[i][1]);
        const point2 = L.latLng(path[i+1][0], path[i+1][1]);
        totalMeters += point1.distanceTo(point2);
    }
    return totalMeters;
};

const createIcon = (color) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<svg height="30" width="30" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="${color}" stroke="#fff" stroke-width="5"/>
                <circle cx="50" cy="50" r="15" fill="#fff"/>
               </svg>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });
};

const getMarkerColor = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("outdoor") || cat.includes("space") || cat.includes("leisure")) return 'green';
    if (cat.includes("service") || cat.includes("entry") || cat.includes("parking")) return 'orange';
    if (cat.includes("academic") || cat.includes("venue") || cat.includes("libraries")) return 'blue';
    return 'red';
};

function MapHandler({ bounds, mapRef, onMapClick }) {
    const map = useMap();
    mapRef.current = map; 

    useEffect(() => {
        if (!bounds) return;
        
        map.setMaxBounds([
            [bounds.south, bounds.west],
            [bounds.north, bounds.east]
        ]);

        const campusCenter = [
            (bounds.north + bounds.south) / 2, 
            (bounds.east + bounds.west) / 2
        ];
        
        map.flyTo(campusCenter, 18, {
            animate: true,
            duration: 1.5 
        });

        map.on('click', (e) => onMapClick(e.latlng));
        return () => map.off('click'); 
    }, [map, bounds, onMapClick]);

    return null;
}

export default function CampusMapContainer({ searchQuery, selectedCategory, onBuildingSelect }) {
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [userLoc, setUserLoc] = useState({ lat: 9.04093889954351, lng: 38.76219059547216 });
    const [locationStatus, setLocationStatus] = useState("Initializing GPS...");
    const [routeLayer, setRouteLayer] = useState(null);
    const mapRef = useRef();

    useEffect(() => {
        if (onBuildingSelect) {
            handleBuildingClick(onBuildingSelect);
        }
    }, [onBuildingSelect]);

    useEffect(() => {
        if (!navigator.geolocation) {
            setLocationStatus("Geolocation not supported");
            return;
        }
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setLocationStatus("Live GPS Active ✅");
            },
            () => setLocationStatus("Using Default Location (Gate)"),
            { enableHighAccuracy: true }
        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const filteredBuildings = useMemo(() => {
        let list = BUILDINGS;
        if (selectedCategory !== "All") {
            list = list.filter(b => b.category === selectedCategory);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(b => 
                b.name.toLowerCase().includes(q) || 
                b.category.toLowerCase().includes(q) ||
                b.tags?.some(tag => tag.toLowerCase().includes(q))
            );
        }
        return list;
    }, [searchQuery, selectedCategory]);

    const handleBuildingClick = (building) => {
        if (routeLayer) {
            mapRef.current.removeLayer(routeLayer);
            setRouteLayer(null);
        }
        setSelectedBuilding({ ...building, loading: true });

        if (building.manualPath && building.manualPath.length > 0) {
            const fullPath = [[userLoc.lat, userLoc.lng], ...building.manualPath];
            const line = L.polyline(fullPath, {
                color: '#0070f3',
                weight: 5,
                opacity: 0.8,
                dashArray: '10, 5', 
                lineJoin: 'round'
            }).addTo(mapRef.current);
            setRouteLayer(line);
            mapRef.current.fitBounds(line.getBounds(), { padding: [50, 50], maxZoom: 18 });
            const meters = calculatePathDistance(fullPath);
            setSelectedBuilding({
                ...building,
                walking: { distance: `${Math.round(meters)} m`, duration: `${Math.ceil(meters / 80)} min` },
                loading: false,
            });
        } else {
            mapRef.current.flyTo([building.lat, building.lng], 18);
            setSelectedBuilding({ ...building, walking: null, loading: false });
        }
    };

    const handleRecenter = () => {
        if (mapRef.current) mapRef.current.flyTo([userLoc.lat, userLoc.lng], 18);
    };

    return (
        <div className="w-full h-full relative flex flex-col lg:flex-row">
            {/* Map Area */}
            <div className="flex-grow h-full w-full relative">
                <LeafletMap
                    center={[userLoc.lat, userLoc.lng]}
                    zoom={18}
                    zoomControl={false}
                    style={{ height: "100%", width: "100%" }}
                >
                    <MapHandler bounds={CAMPUS_INFO?.bounds} mapRef={mapRef} onMapClick={() => {}} />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                   <Marker 
                    position={[userLoc.lat, userLoc.lng]} 
                    icon={L.divIcon({
                        className: 'user-location-icon',
                        html: `
                        <div style="position: relative;">
                            <div style="background-color: #4285F4; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>
                            <div style="position: absolute; top: -5px; left: -5px; width: 25px; height: 25px; background-color: rgba(66, 133, 244, 0.3); border-radius: 50%; animation: pulse 2s infinite;"></div>
                        </div>
                        `,
                        iconSize: [25, 25],
                        iconAnchor: [12, 12],
                    })}
                    >
                    <Popup>You are here</Popup>
                    </Marker>

                    {filteredBuildings.map(b => (
                        <Marker
                            key={b.id}
                            position={[b.lat, b.lng]}
                            icon={createIcon(getMarkerColor(b.category))}
                            eventHandlers={{ click: () => handleBuildingClick(b) }}
                        >
                            <Popup>{b.name}</Popup>
                        </Marker>
                    ))}
                </LeafletMap>

                {/* Floating GPS Status & Recenter */}
                <div className="absolute bottom-6 left-6 z-[500] flex flex-col items-start gap-2">
                    <span className="bg-white/90 backdrop-blur text-[10px] px-2 py-1 rounded shadow-sm font-mono">{locationStatus}</span>
                    <button 
                        onClick={handleRecenter}
                        className="bg-white p-3 rounded-full shadow-xl border hover:bg-gray-50 active:scale-95 transition-all"
                    >
                        📍 <span className="text-xs font-bold ml-1 hidden sm:inline">Recenter</span>
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Sheet / Desktop Sidebar */}
            {selectedBuilding && (
                <aside className="fixed bottom-0 left-0 right-0 z-[1000] bg-white 
                                   rounded-t-3xl shadow-[0_-10px_25px_rgba(0,0,0,0.1)] 
                                   lg:relative lg:w-96 lg:h-full lg:rounded-none lg:border-l">
                    
                    {/* Close Button & Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <div className="w-12 h-1 bg-gray-200 rounded-full lg:hidden absolute top-2 left-1/2 -translate-x-1/2" />
                        <h3 className="font-bold text-gray-800">Building Details</h3>
                        <button 
                            onClick={() => setSelectedBuilding(null)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6 text-gray-500" />
                        </button>
                    </div>

                    <div className="max-h-[50vh] lg:max-h-[calc(100vh-120px)] overflow-y-auto">
                        <BuildingDetailsPanel building={selectedBuilding} />
                    </div>
                </aside>
            )}
        </div>
    );
}