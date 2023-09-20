interface Location {
  lat: number;
  lng: number;
}

interface Geometry {
  location: Location;
}

interface Result {
  geometry: Geometry;
}

export default interface GeocodeResponse {
  results: Result[];
}
