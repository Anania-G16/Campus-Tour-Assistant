import { useState, useEffect, useMemo, useRef } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet'; 
import { CAMPUS_INFO, locations as BUILDINGS } from "../data/locations";
import BuildingDetailsPanel from "./BuildingDetailsPanel";

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

export default function CampusMapContainer({ searchQuery, selectedCategory,onBuildingSelect }) {
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
            (err) => {
                setLocationStatus("Using Default Location (Gate)");
            },
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
                b.tags?.some(tag => tag.toLowerCase().includes(q)) ||
                b.floorInfo?.depts?.some(dept => dept.toLowerCase().includes(q))
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
                walking: { 
                    distance: `${Math.round(meters)} m`, 
                    duration: `${Math.ceil(meters / 80)} min` 
                },
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <section className="lg:col-span-2 bg-white rounded-xl shadow-lg border overflow-hidden relative">
                <div className= "pl-1 mt-5 border-b flex items-center justify-between bg-white z-[1000] relative">
                    <div className="font-medium">Campus Navigator</div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-gray-500">{locationStatus}</span>
                        <button 
                            onClick={handleRecenter}
                            className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded text-xs font-bold hover:bg-indigo-100 transition"
                        >
                            📍 My Location
                        </button>
                    </div>
                </div>

                <div id="map-leaflet-container" style={{ height: "550px" }}>
                    <LeafletMap
                        center={[userLoc.lat, userLoc.lng]}
                        zoom={18}
                        scrollWheelZoom={true}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <MapHandler bounds={CAMPUS_INFO?.bounds} mapRef={mapRef} onMapClick={() => {}} />
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <Marker position={[userLoc.lat, userLoc.lng]} icon={createIcon('red')}>
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
                </div>
            </section>

            <aside className="bg-white rounded-xl shadow-lg border overflow-y-auto" style={{ maxHeight: "600px" }}>
                <BuildingDetailsPanel building={selectedBuilding} />
            </aside>
        </div>
    );
}