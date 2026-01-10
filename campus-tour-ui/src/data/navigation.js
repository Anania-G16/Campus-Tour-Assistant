
export const nodes = {
  N0: { lat: 9.040958369128797, lng: 38.762185034274964 }, // GATE
  N1:  { lat:9.041048745989755, lng:38.76251879747687 }, // Second Gate sidewalk entry (top-left)
  N2:  { lat: 9.041106789358665, lng: 38.76278600213408 }, // Top horizontal path – after gate
  N33: {lat:9.04120991140877,lng:38.7630102314715},//Bck of library corner
  N34:{lat:9.04115934382348,lng:38.76302247640356},//below N33
  N3:  { lat: 9.041268484709747, lng: 38.76327258824193 }, // Samsung entrance  
  N30: {lat:9.041277060776267, lng:38.763310797672176}, // Samsung front intersection
  N29: {lat:9.040907628373404, lng:38.763396904208236}, // below Samsung front intersection
  N4:  { lat: 9.041376540973161, lng: 38.76375888288203 }, // Top-right corner (Building Eight side)
  N5:  { lat: 9.041354243206456, lng: 38.763666832891545 }, // Vertical drop from N4 (right column)
  N6:  { lat: 9.040985592873483, lng:38.76373998932064}, // Intersection near New Building (NB)
  N7:  { lat:9.040942169198615, lng: 38.76354791642234 }, // Horizontal connector toward center (upper)
  N8:  { lat: 9.040869271548232, lng: 38.76325035093714}, // Main Library
  N9:  { lat: 9.040805486092381, lng: 38.76298507938185 }, // Vertical drop from N8 (center spine)

  N10: { lat: 9.040781905082806, lng: 38.76284805949341 }, // Central intersection near Campus Garden
  N11: { lat: 9.040735974171422, lng: 38.76285512174038 }, // Building one Entrance
  N31: {lat:9.040674926482275, lng:38.76258668371871},// Building one Entrance
  N32: {lat:9.040261699720247, lng:38.76267251441041},// Building two Entrance
  N12: { lat: 9.040337416057437, lng: 38.76293345208689 }, // Building two Above
  N13: { lat: 9.040324171604874, lng: 38.76293680484813 }, // // Building two Entrance

  N14: { lat: 9.040451626568077, lng: 38.763499059757 }, // Central vertical (between garden & lower paths)
  N15: { lat: 9.040669442469031, lng: 38.76343012935628 }, // Building Four entrance
  N16: { lat: 9.040271856392108, lng: 38.76353341455857 }, // Below N14
  N17: { lat: 9.040149388206762, lng: 38.76355821016643 }, // Building Five entrance

  N18: { lat: 9.03993085456315, lng: 38.763606489928414 }, // Horizontal near Outdoor Study Area
  N19: { lat:9.039780665500984, lng: 38.763046866004366 }, // Building six entrance
  N20: { lat: 9.040152172775034, lng: 38.76297914022637 }, // Building three entrance

  N21: { lat:9.039602125251657, lng: 38.76282540032569 }, // Bottom horizontal (above parking)
  N22: { lat: 9.039726597518246, lng: 38.76341280343701 }, // parking
  N23: { lat: 9.03979775308307, lng: 38.763984946797244 }, // Bottom-center near Main Parking
  N24: { lat: 9.03978222430801, lng: 38.76416918640766 }, // Restroom entrance

  N25: { lat: 9.0411469920911, lng: 38.76370865440913 }, // NB entrance
  N26: { lat: 9.040434691971996, lng: 38.76385783854391 }, // basket court
  N27: { lat: 9.04004673351578, lng: 38.76394033456708 }, // Football court
  N28: { lat: 9.039753112284687, lng: 38.7627932138163 }, // Main Gate sidewalk exit (bottom-left)
};

export const EDGES = {
  N0:  ["N1"],
  N1:  ["N2", "N31"],
  N2:  ["N1", "N34", "N10"],
  N3:  ["N33", "N30"],
  N4:  ["N5"],

  N5:  ["N4", "N30", "N25"],
  N6:  ["N26", "N7", "N25"],
  N7:  ["N6", "N29"],
  N8:  ["N29", "N9"],

  N9:  ["N8", "N10"],
  N10: ["N9", "N2", "N11"],
  N11: ["N12", "N10"],
  N12: ["N11", "N13"],

  N13: ["N20", "N12", "N14"],
  N14: ["N15", "N16", "N13"],
  N15: ["N14", "N29"],
  N16: ["N14", "N17", "N20"],

  N17: ["N16", "N18"],
  N18: ["N17", "N19"],
  N19: ["N18", "N20"],

  N20: ["N13", "N16", "N19",],
  N21: ["N22", "N28"],
  N22: ["N21", "N23"],
  N23: ["N22", "N24", "N27"],

  N24: ["N23"],
  N25: ["N5", "N6"],
  N26: ["N6", "N27"],
  N27: ["N26", "N23"],
  N28: ["N21", "N1"],
  N31: ["N1", "N32"],
  N32: ["N31", "N28"],
  N33: ["N3", "N34"],
  N34: ["N33", "N2"],
};
