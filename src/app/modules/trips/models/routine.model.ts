export interface RoutineModel {
    id: number;
    name?: string; // Keeping the existing field, but making it optional
    description?: string; // Keeping the existing field, but making it optional
    distance: number;
    isPrivate: boolean;
    isReversed: boolean | null;
    places: string[];
    origin: GeoPoint;
    destination: GeoPoint;
    path: GeoLineString;
    state: string;
    currency: string;
    reason: string;
    updated: string;
    driverId: number;
    hasReturn: boolean;
    days: { days: number[] };
    countryId: number;
    costPerHead: number;
    maxPassengers: number;
    originAddress: string;
    destinationAddress: string;
    journeyType: string;
    totalRevenue: number;
    commissionRate: number;
    carId: number;
    departureTime: string;
    returnTime: string;
    createdOn: string | null;
    originLat: number;
    originLng: number;
    destinationLat: number;
    destinationLng: number;
}

interface GeoPoint {
    type: 'Point';
    coordinates: [number, number];
}

interface GeoLineString {
    type: 'LineString';
    coordinates: [number, number][];
}