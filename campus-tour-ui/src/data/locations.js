export const locations = [
  {
    id: 1,
    name: "5 Kilo Campus Library",
    category: "Libraries",
    description: "The central library featuring study rooms, computer labs, and 24/7 study spaces during finals.",
    image: "/map_assets/lib_front.jpg",
    rating: 4.8,
    location: "5 Kilo",
    hours: "24 hrs",
    tags: ["Study Rooms", "Computers", "Printing"]
  },
  {
    id: 2,
    name: "Natural Science Building",
    category: "Academic",
    description: "Home to the Natural Sciences departments with state-of-the-art research laboratories.",
    image: "/map_assets/NB.jpg",
    rating: 4.6,
    location: "5 Kilo",
    hours: "6AM - 10PM",
    tags: ["Labs", "Research", "Lectures"]
  },
  {
    id: 3,
    name: "Basketball Court",
    category: "Sports",
    description: "Outdoor basketball court for students and staff recreational activities.",
    image: "/map_assets/basket_ball_court.jpg",
    rating: 4.9,
    location: "5 Kilo",
    hours: "6AM - 10PM",
    tags: ["Basketball", "Sports", "Recreation"]
  },
  {
    id: 4,
    name: "Handball Court",
    category: "Sports",
    description: "Dedicated handball court for training and recreational games.",
    image: "/map_assets/hand_ball_court.jpg",
    rating: 4.5,
    location: "5 Kilo",
    hours: "6AM - 10PM",
    tags: ["Handball", "Sports", "Training"]
  },
  {
    id: 5,
    name: "Executive Office",
    category: "Academic",
    description: "Administrative building housing executive offices and student services.",
    image: "/map_assets/E_office.jpg",
    rating: 4.7,
    location: "5 Kilo",
    hours: "8AM - 5PM",
    tags: ["Administration", "Services", "Offices"]
  },
  {
    id: 6,
    name: "Campus Gateway",
    category: "Outdoor",
    description: "Main entrance gateway to the campus, welcoming students and visitors.",
    image: "/map_assets/gateway.jpg",
    rating: 4.8,
    location: "5 Kilo",
    hours: "24 hrs",
    tags: ["Entrance", "Landmark", "Welcome"]
  },
  {
    id: 7,
    name: "Campus Garden",
    category: "Outdoor",
    description: "Beautiful green space in the heart of campus, perfect for studying and relaxation.",
    image: "/map_assets/guarden.jpg",
    rating: 4.9,
    location: "5 Kilo",
    hours: "Always Open",
    tags: ["Green Space", "Relaxation", "Nature"]
  },
  {
    id: 8,
    name: "Campus View",
    category: "Outdoor",
    description: "Scenic view of the campus grounds and surrounding areas.",
    image: "/map_assets/photo_2025-12-08_00-51-00.jpg",
    rating: 4.6,
    location: "5 Kilo",
    hours: "Always Open",
    tags: ["Scenic", "View", "Campus"]
  }
];

export const featuredLocations = locations.slice(0, 4);

export const categories = [
  { id: 'academic', name: 'Academic Buildings', count: 12, icon: 'Building2' },
  { id: 'library', name: 'Libraries', count: 4, icon: 'BookOpen' },
  { id: 'sports', name: 'Sports Facilities', count: 8, icon: 'Dumbbell' },
  { id: 'dining', name: 'Dining', count: 15, icon: 'UtensilsCrossed' },
  { id: 'housing', name: 'Housing', count: 10, icon: 'Home' },
  { id: 'health', name: 'Health Services', count: 3, icon: 'Stethoscope' },
  { id: 'parking', name: 'Parking', count: 6, icon: 'Car' },
  { id: 'outdoor', name: 'Outdoor Spaces', count: 9, icon: 'Trees' },
];
