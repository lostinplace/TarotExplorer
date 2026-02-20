import L from 'leaflet';

const MAP_WIDTH = 4000;
const MAP_HEIGHT = 3000;

export function createMap(containerId: string): L.Map {
  const map = L.map(containerId, {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 2,
    zoomSnap: 0.25,
    zoomDelta: 0.5,
    attributionControl: false,
    zoomControl: false,
  });

  const bounds: L.LatLngBoundsExpression = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];
  map.setMaxBounds([[-200, -200], [MAP_HEIGHT + 200, MAP_WIDTH + 200]]);
  map.fitBounds(bounds);

  // Add zoom control top-right
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Render terrain overlay
  renderTerrain(map);

  return map;
}

function renderTerrain(map: L.Map) {
  // Suit territory regions as colored rectangles
  const regions = [
    { bounds: [[0, 2200], [1200, 4000]] as L.LatLngBoundsExpression, color: '#ff8c32', name: 'Wands' },      // top-right
    { bounds: [[1200, 2200], [3000, 4000]] as L.LatLngBoundsExpression, color: '#50b4dc', name: 'Cups' },     // bottom-right
    { bounds: [[0, 0], [1200, 1800]] as L.LatLngBoundsExpression, color: '#b4c8dc', name: 'Swords' },         // top-left
    { bounds: [[1200, 0], [3000, 1800]] as L.LatLngBoundsExpression, color: '#78b450', name: 'Pentacles' },   // bottom-left
  ];

  regions.forEach(r => {
    L.rectangle(r.bounds, {
      color: 'transparent',
      fillColor: r.color,
      fillOpacity: 0.04,
      interactive: false,
    }).addTo(map);
  });

  // Fool's Road glow — a polyline through all major arcana positions
  // (will be drawn in paths.ts with the actual card positions)
}
