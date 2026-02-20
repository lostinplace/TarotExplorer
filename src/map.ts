import L from 'leaflet';
import { MapData } from './types';

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

  // Add zoom control top-right
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  return map;
}

export function configureMapBounds(map: L.Map, mapData: MapData) {
  const width = mapData.canvas.width;
  const height = mapData.canvas.height;
  
  const bounds: L.LatLngBoundsExpression = [[0, 0], [height, width]];
  
  // Set max bounds with a comfortable margin, otherwise Leaflet "snaps back" aggressively. 
  // We use the active map's intrinsic dimensions instead of hardcoded 4000x3000.
  map.setMaxBounds([[-1000, -1000], [height + 1000, width + 1000]]);
  
  // Optionally fit bounds, but main.ts currently drives the initial view
  // map.fitBounds(bounds);
}
